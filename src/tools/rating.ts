import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UPSHttpClient } from '../client/index.js';
import { buildDimensions, buildWeight, formatToolResponse } from './builders.js';
import { API_VERSIONS, RATING_DEFAULTS, UNITS } from './constants.js';
import { ratingAddressSchema, ratingPackageSchema } from './schemas.js';

export function addRatingTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'get_rates',
		{
			title: 'Get Shipping Rates',
			description:
				'Get shipping rates for a package between two addresses. Returns available service options with prices, transit times, and delivery guarantees. Omit the service code to get rates for ALL available services (shop rates). Common codes: 03=Ground, 02=2nd Day Air, 01=Next Day Air, 12=3 Day Select.',
			inputSchema: {
				service: z
					.string()
					.optional()
					.describe('Specific service code, or omit for all available rates'),
				shipFrom: ratingAddressSchema.describe('Origin address (city/state/zip required)'),
				shipTo: ratingAddressSchema.describe('Destination address (city/state/zip required)'),
				packages: z.array(ratingPackageSchema).min(1).describe('Packages to rate'),
			},
		},
		async ({ service, shipFrom, shipTo, packages }) => {
			const requestOption = service
				? RATING_DEFAULTS.REQUEST_OPTION_RATE
				: RATING_DEFAULTS.REQUEST_OPTION_SHOP;
			const accountNumber = client.getAccountNumber();

			const buildRatingAddress = (addr: typeof shipFrom) => ({
				City: addr.city,
				StateProvinceCode: addr.stateProvinceCode,
				PostalCode: addr.postalCode,
				CountryCode: addr.countryCode,
			});

			const rateRequest = {
				RateRequest: {
					Request: { RequestOption: requestOption, SubVersion: API_VERSIONS.RATING },
					Shipment: {
						Shipper: {
							ShipperNumber: accountNumber ?? '',
							Address: buildRatingAddress(shipFrom),
						},
						ShipTo: { Address: buildRatingAddress(shipTo) },
						ShipFrom: { Address: buildRatingAddress(shipFrom) },
						...(service ? { Service: { Code: service, Description: '' } } : {}),
						Package: packages.map((pkg) => ({
							PackagingType: { Code: pkg.packaging, Description: '' },
							...(pkg.length
								? { Dimensions: buildDimensions(pkg.length, pkg.width, pkg.height) }
								: {}),
							PackageWeight: buildWeight(pkg.weight),
						})),
					},
				},
			};

			const response = await client.post<unknown>(
				`/api/rating/${API_VERSIONS.RATING}/Rate`,
				rateRequest,
			);

			return formatToolResponse(response);
		},
	);

	server.registerTool(
		'get_time_in_transit',
		{
			title: 'Get Time in Transit',
			description:
				'Get estimated delivery dates and transit times between two locations. Returns the expected delivery date and time for each available UPS service.',
			inputSchema: {
				shipFrom: z.object({
					postalCode: z.string().describe('Origin ZIP/postal code'),
					countryCode: z.string().length(2).default('US').describe('Origin country code'),
				}),
				shipTo: z.object({
					postalCode: z.string().describe('Destination ZIP/postal code'),
					countryCode: z.string().length(2).default('US').describe('Destination country code'),
				}),
				weight: z.number().positive().describe('Total shipment weight in lbs'),
				shipDate: z
					.string()
					.optional()
					.describe('Ship date in YYYY-MM-DD format (defaults to today)'),
			},
		},
		async ({ shipFrom, shipTo, weight, shipDate }) => {
			const todayRaw = new Date().toISOString().split('T')[0] ?? '';
			const formattedDate = shipDate ? shipDate.replace(/-/g, '') : todayRaw.replace(/-/g, '');

			const body = {
				originCountryCode: shipFrom.countryCode,
				originPostalCode: shipFrom.postalCode,
				destinationCountryCode: shipTo.countryCode,
				destinationPostalCode: shipTo.postalCode,
				weight: String(weight),
				weightUnitOfMeasure: UNITS.WEIGHT_LBS,
				shipDate: formattedDate,
				shipTime: RATING_DEFAULTS.SHIP_TIME,
				numberOfPackages: RATING_DEFAULTS.PACKAGE_COUNT,
			};

			const response = await client.post<unknown>(
				`/api/deliverytimeintransit/${API_VERSIONS.TIME_IN_TRANSIT}/estimateddelivery`,
				body,
			);

			return formatToolResponse(response);
		},
	);
}
