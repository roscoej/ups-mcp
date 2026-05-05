import { writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { encode as encodePngData } from 'fast-png';
import { GifReader } from 'omggif';
import { PDFDocument } from 'pdf-lib';
import { z } from 'zod';

import type { UPSHttpClient } from '../client/index.js';
import { API_VERSIONS } from './constants.js';

const POINTS_PER_INCH = 72;
const PAGE_WIDTH = 8.5 * POINTS_PER_INCH;
const PAGE_HEIGHT = 11 * POINTS_PER_INCH;

const LABEL_1UP_WIDTH_IN = 4;
const LABEL_2UP_WIDTH_IN = 7.5;
const LABEL_2UP_GAP_IN = 0.4;

const LABEL_IMAGE_FORMAT = 'GIF';

interface LabelRecoveryResponse {
	LabelRecoveryResponse?: {
		LabelResults?:
			| { LabelImage?: { GraphicImage?: string } }
			| Array<{ LabelImage?: { GraphicImage?: string } }>;
	};
}

function extractGraphicImage(response: LabelRecoveryResponse): string | null {
	const results = response?.LabelRecoveryResponse?.LabelResults;
	if (!results) return null;

	if (Array.isArray(results)) {
		return results[0]?.LabelImage?.GraphicImage ?? null;
	}
	return results.LabelImage?.GraphicImage ?? null;
}

function decodeGif(buffer: Buffer): { width: number; height: number; pixels: Uint8Array } {
	const reader = new GifReader(buffer);
	const width = reader.width;
	const height = reader.height;
	const pixels = new Uint8Array(width * height * 4);
	reader.decodeAndBlitFrameRGBA(0, pixels);
	return { width, height, pixels };
}

function rotate180(
	pixels: Uint8Array,
	width: number,
	height: number,
): { pixels: Uint8Array; width: number; height: number } {
	const out = new Uint8Array(pixels.length);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const srcIdx = (y * width + x) * 4;
			const dstIdx = ((height - 1 - y) * width + (width - 1 - x)) * 4;
			out[dstIdx] = pixels[srcIdx]!;
			out[dstIdx + 1] = pixels[srcIdx + 1]!;
			out[dstIdx + 2] = pixels[srcIdx + 2]!;
			out[dstIdx + 3] = pixels[srcIdx + 3]!;
		}
	}
	return { pixels: out, width, height };
}

function encodePng(pixels: Uint8Array, width: number, height: number): Uint8Array {
	return Buffer.from(encodePngData({ width, height, data: pixels, channels: 4, depth: 8 }));
}

function resolveOutputPath(outputPath: string): string {
	if (outputPath.startsWith('~/')) {
		return resolve(homedir(), outputPath.slice(2));
	}
	return resolve(outputPath);
}

function textResponse(text: string) {
	return { content: [{ type: 'text' as const, text }] };
}

export function addLabelTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'generate_label_pdf',
		{
			title: 'Generate Label PDF',
			description:
				'Recover UPS shipping labels and generate a printable PDF. Supports 1-up (single label centered) or 2-up (two labels side by side on one page). Labels are automatically oriented for 8.5x11 paper.',
			inputSchema: {
				trackingNumbers: z
					.array(z.string())
					.min(1)
					.max(2)
					.describe('Tracking numbers to include (1-2)'),
				layout: z
					.enum(['1up', '2up'])
					.optional()
					.describe(
						'Layout: 1up = single label centered, 2up = two labels tiled. Auto-detected from count if omitted.',
					),
				outputPath: z
					.string()
					.default('~/ups-labels.pdf')
					.describe('File path to save the PDF (supports ~ for home directory)'),
			},
		},
		async ({ trackingNumbers, layout, outputPath }) => {
			const effectiveLayout = layout ?? (trackingNumbers.length === 1 ? '1up' : '2up');
			const filePath = resolveOutputPath(outputPath);

			const labelImages: Buffer[] = [];

			for (const tracking of trackingNumbers) {
				const response = await client.post<LabelRecoveryResponse>(
					`/api/labels/${API_VERSIONS.LABEL_RECOVERY}/recovery`,
					{
						LabelRecoveryRequest: {
							LabelSpecification: { LabelImageFormat: { Code: LABEL_IMAGE_FORMAT } },
							TrackingNumber: tracking,
						},
					},
				);

				const base64 = extractGraphicImage(response);
				if (!base64) {
					return textResponse(`Failed to recover label for tracking number ${tracking}`);
				}

				labelImages.push(Buffer.from(base64, 'base64'));
			}

			const pdfDoc = await PDFDocument.create();
			const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

			if (effectiveLayout === '1up') {
				const gif = decodeGif(labelImages[0]!);
				const png = encodePng(gif.pixels, gif.width, gif.height);
				const img = await pdfDoc.embedPng(png);

				const labelW = LABEL_1UP_WIDTH_IN * POINTS_PER_INCH;
				const labelH = labelW * (gif.height / gif.width);
				const x = (PAGE_WIDTH - labelW) / 2;
				const y = (PAGE_HEIGHT - labelH) / 2;

				page.drawImage(img, { x, y, width: labelW, height: labelH });
			} else {
				const gap = LABEL_2UP_GAP_IN * POINTS_PER_INCH;

				for (let i = 0; i < labelImages.length; i++) {
					const gif = decodeGif(labelImages[i]!);
					const rotated = rotate180(gif.pixels, gif.width, gif.height);
					const png = encodePng(rotated.pixels, rotated.width, rotated.height);
					const img = await pdfDoc.embedPng(png);

					const drawW = LABEL_2UP_WIDTH_IN * POINTS_PER_INCH;
					const drawH = drawW * (gif.height / gif.width);
					const totalH = 2 * drawH + gap;
					const marginY = (PAGE_HEIGHT - totalH) / 2;

					const x = (PAGE_WIDTH - drawW) / 2;
					const y = PAGE_HEIGHT - marginY - drawH - i * (drawH + gap);

					page.drawImage(img, { x, y, width: drawW, height: drawH });
				}
			}

			const pdfBytes = await pdfDoc.save();
			await writeFile(filePath, pdfBytes);

			const count = trackingNumbers.length;
			return textResponse(
				`Label PDF saved to ${filePath} (${effectiveLayout} layout, ${count} label${count > 1 ? 's' : ''})`,
			);
		},
	);
}
