import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UPSHttpClient } from '../client/index.js';
import { formatToolResponse } from './builders.js';
import { API_VERSIONS, LOCATION_TYPES, LOCATOR_DEFAULTS, UNITS } from './constants.js';

export function addLocatorTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'find_locations',
		{
			title: 'Find UPS Locations',
			description:
				'Find nearby UPS locations, Access Points, and drop-off points. Search by address or postal code. Returns locations with services available, hours of operation, and distance from the search point.',
			inputSchema: {
				postalCode: z.string().describe('ZIP/postal code to search near'),
				countryCode: z.string().length(2).default('US').describe('Country code'),
				city: z.string().optional().describe('City name (optional, refines search)'),
				stateProvinceCode: z.string().optional().describe('State code (optional)'),
				type: z
					.enum(['all', 'dropoff', 'pickup', 'store'])
					.default('all')
					.describe('Location type filter'),
				radius: z
					.number()
					.default(LOCATOR_DEFAULTS.RADIUS_MILES)
					.describe('Search radius in miles'),
				maxResults: z
					.number()
					.int()
					.min(1)
					.max(LOCATOR_DEFAULTS.MAX_RESULTS_LIMIT)
					.default(LOCATOR_DEFAULTS.MAX_RESULTS)
					.describe('Maximum number of results'),
			},
		},
		async ({ postalCode, countryCode, city, stateProvinceCode, type, radius, maxResults }) => {
			const locationTypeCode = LOCATION_TYPES[type] ?? LOCATION_TYPES.all;

			const body = {
				LocatorRequest: {
					Request: {
						RequestAction: LOCATOR_DEFAULTS.REQUEST_ACTION,
						RequestOption: LOCATOR_DEFAULTS.REQUEST_OPTION,
					},
					OriginAddress: {
						AddressKeyFormat: {
							...(city ? { PoliticalDivision2: city } : {}),
							...(stateProvinceCode ? { PoliticalDivision1: stateProvinceCode } : {}),
							PostcodePrimaryLow: postalCode,
							CountryCode: countryCode,
						},
					},
					Translate: { Locale: 'en_US' },
					UnitOfMeasurement: { Code: UNITS.DISTANCE_MILES },
					LocationSearchCriteria: {
						SearchOption: { OptionType: { Code: locationTypeCode } },
						MaximumListSize: String(maxResults),
						SearchRadius: String(radius),
					},
				},
			};

			const response = await client.post<unknown>(
				`/api/locations/${API_VERSIONS.LOCATOR}/search/availabilities/${LOCATION_TYPES.all}`,
				body,
			);

			return formatToolResponse(response);
		},
	);
}
