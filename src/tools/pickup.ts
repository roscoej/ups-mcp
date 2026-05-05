import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UPSHttpClient } from '../client/index.js';
import { formatToolResponse } from './builders.js';
import { API_VERSIONS, PICKUP, UNITS } from './constants.js';

export function addPickupTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'schedule_pickup',
		{
			title: 'Schedule Pickup',
			description:
				'Schedule a UPS package pickup at a specific address and time. Provide the pickup date, time window, address, and package details. Returns a confirmation number to reference or cancel the pickup.',
			inputSchema: {
				pickupDate: z.string().describe('Pickup date in YYYYMMDD format'),
				readyTime: z.string().describe('Earliest pickup time in HHmm format (e.g. "0900")'),
				closeTime: z.string().describe('Latest pickup time in HHmm format (e.g. "1700")'),
				name: z.string().describe('Contact name at pickup location'),
				phone: z.string().describe('Contact phone number'),
				addressLine1: z.string().describe('Pickup street address'),
				addressLine2: z.string().optional().describe('Address line 2'),
				city: z.string().describe('City'),
				stateProvinceCode: z.string().describe('State/province code'),
				postalCode: z.string().describe('ZIP/postal code'),
				countryCode: z.string().length(2).default('US').describe('Country code'),
				packageCount: z.number().int().positive().describe('Number of packages'),
				totalWeight: z.number().positive().describe('Total weight in lbs'),
				serviceCode: z
					.string()
					.default(PICKUP.SERVICE_ON_CALL_AIR)
					.describe('Pickup service code (003=On Call Air, 001=Daily)'),
				specialInstructions: z.string().optional().describe('Special instructions for driver'),
			},
		},
		async (params) => {
			const accountNumber = client.getAccountNumber();

			const pickupRequest = {
				PickupCreationRequest: {
					RatePickupIndicator: PICKUP.RATE_INDICATOR_YES,
					Shipper: {
						Account: {
							AccountNumber: accountNumber ?? '',
							AccountCountryCode: params.countryCode,
						},
					},
					PickupDateInfo: {
						CloseTime: params.closeTime,
						ReadyTime: params.readyTime,
						PickupDate: params.pickupDate,
					},
					PickupAddress: {
						CompanyName: params.name,
						ContactName: params.name,
						AddressLine: [params.addressLine1, params.addressLine2].filter(Boolean),
						City: params.city,
						StateProvince: params.stateProvinceCode,
						PostalCode: params.postalCode,
						CountryCode: params.countryCode,
						Phone: { Number: params.phone },
					},
					AlternateAddressIndicator: PICKUP.ALTERNATE_ADDRESS_YES,
					PickupPiece: [
						{
							ServiceCode: params.serviceCode,
							Quantity: String(params.packageCount),
							DestinationCountryCode: params.countryCode,
							ContainerCode: PICKUP.CONTAINER_PACKAGE,
						},
					],
					TotalWeight: {
						Weight: String(params.totalWeight),
						UnitOfMeasurement: UNITS.WEIGHT_LBS,
					},
					OverweightIndicator: PICKUP.OVERWEIGHT_NO,
					PaymentMethod: PICKUP.PAYMENT_ACCOUNT,
					SpecialInstruction: params.specialInstructions ?? '',
				},
			};

			const response = await client.post<unknown>(
				`/api/pickupcreation/${API_VERSIONS.PICKUP}/pickup`,
				pickupRequest,
			);

			return formatToolResponse(response);
		},
	);

	server.registerTool(
		'cancel_pickup',
		{
			title: 'Cancel Pickup',
			description: 'Cancel a previously scheduled UPS pickup by confirmation number.',
			inputSchema: {
				confirmationNumber: z.string().describe('Pickup confirmation number from schedule_pickup'),
			},
		},
		async ({ confirmationNumber }) => {
			const response = await client.delete<unknown>(
				`/api/pickupcreation/${API_VERSIONS.PICKUP}/pickup/${confirmationNumber}`,
			);

			return formatToolResponse(response);
		},
	);
}
