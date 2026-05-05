import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UPSHttpClient } from '../client/index.js';
import { formatToolResponse } from './builders.js';
import { ADDRESS_VALIDATION_OPTIONS, API_VERSIONS } from './constants.js';

export function addAddressTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'validate_address',
		{
			title: 'Validate Address',
			description:
				'Validate a US or Puerto Rico address using UPS Address Validation. Returns whether the address is valid, classification (residential/commercial), and suggested corrections if ambiguous.',
			inputSchema: {
				addressLine1: z.string().describe('Street address (e.g. "123 Main St")'),
				addressLine2: z.string().optional().describe('Apartment, suite, unit (e.g. "Apt 4B")'),
				city: z.string().describe('City or town name'),
				stateProvinceCode: z.string().length(2).describe('Two-letter state code (e.g. "GA")'),
				postalCode: z.string().describe('5-digit ZIP code'),
				countryCode: z.string().length(2).default('US').describe('Country code (US or PR)'),
			},
		},
		async ({ addressLine1, addressLine2, city, stateProvinceCode, postalCode, countryCode }) => {
			const body = {
				XAVRequest: {
					AddressKeyFormat: {
						AddressLine: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
						PoliticalDivision2: city,
						PoliticalDivision1: stateProvinceCode,
						PostcodePrimaryLow: postalCode,
						CountryCode: countryCode,
					},
				},
			};

			const response = await client.post<unknown>(
				`/api/addressvalidation/${API_VERSIONS.ADDRESS_VALIDATION}/${ADDRESS_VALIDATION_OPTIONS.ADDRESS_VALIDATION_AND_CLASSIFICATION}`,
				body,
			);

			return formatToolResponse(response);
		},
	);
}
