import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UPSHttpClient } from '../client/index.js';
import { formatToolResponse } from './builders.js';
import { API_VERSIONS } from './constants.js';

export function addTrackingTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'track_package',
		{
			title: 'Track Package',
			description:
				'Track a UPS package by tracking number. Returns current status, delivery estimate, and full activity history. Optionally includes signature details, milestones, and proof of delivery.',
			inputSchema: {
				trackingNumber: z.string().min(7).max(34).describe('UPS tracking number (7-34 characters)'),
				locale: z.string().default('en_US').describe('Locale for response (e.g. en_US, ja_JP)'),
				returnSignature: z
					.boolean()
					.default(false)
					.describe('Include signature requirement details'),
				returnMilestones: z
					.boolean()
					.default(false)
					.describe('Include detailed movement milestones'),
				returnPOD: z.boolean().default(false).describe('Include proof of delivery information'),
			},
		},
		async ({ trackingNumber, locale, returnSignature, returnMilestones, returnPOD }) => {
			const params: Record<string, string> = { locale };
			if (returnSignature) params.returnSignature = 'true';
			if (returnMilestones) params.returnMilestones = 'true';
			if (returnPOD) params.returnPOD = 'true';

			const response = await client.get<unknown>(
				`/api/track/${API_VERSIONS.TRACKING}/details/${trackingNumber}`,
				params,
			);

			return formatToolResponse(response);
		},
	);
}
