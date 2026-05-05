import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { UPSHttpClient } from '../client/index.js';
import { buildDimensions, buildUPSAddress, buildWeight, formatToolResponse } from './builders.js';
import {
	API_VERSIONS,
	CHARGE_TYPES,
	LABEL_STOCK,
	REFERENCE_TYPES,
	SHIPMENT_LIMITS,
	SHIPMENT_REQUEST_OPTIONS,
} from './constants.js';
import { fullAddressSchema, shippingPackageSchema } from './schemas.js';

export function addShippingTools(server: McpServer, client: UPSHttpClient): void {
	server.registerTool(
		'create_shipment',
		{
			title: 'Create Shipment',
			description:
				'Create a UPS shipment and generate a shipping label. Supports all UPS domestic and international services. Returns tracking number, charges, and label image (base64-encoded GIF by default). Common service codes: 03=Ground, 02=2nd Day Air, 01=Next Day Air, 13=Next Day Air Saver, 12=3 Day Select, 07=Express (intl), 11=Standard (intl).',
			inputSchema: {
				service: z
					.string()
					.default('03')
					.describe('UPS service code (e.g. "03" for Ground, "01" for Next Day Air)'),
				shipFrom: fullAddressSchema.describe('Origin/sender address'),
				shipTo: fullAddressSchema.describe('Destination/recipient address'),
				packages: z
					.array(shippingPackageSchema)
					.min(1)
					.max(SHIPMENT_LIMITS.MAX_PACKAGES)
					.describe('Array of packages (1-200)'),
				description: z.string().optional().describe('Shipment description'),
				referenceNumber: z.string().optional().describe('Your reference number for this shipment'),
				labelFormat: z
					.enum(['GIF', 'EPL', 'ZPL', 'SPL', 'STARPL'])
					.default('GIF')
					.describe('Label image format'),
			},
		},
		async ({ service, shipFrom, shipTo, packages, description, referenceNumber, labelFormat }) => {
			const accountNumber = client.getAccountNumber();
			const shipFromAddress = buildUPSAddress(shipFrom);
			const shipToAddress = buildUPSAddress(shipTo);

			const shipmentRequest = {
				ShipmentRequest: {
					Request: {
						SubVersion: API_VERSIONS.SHIPPING,
						RequestOption: SHIPMENT_REQUEST_OPTIONS.NON_VALIDATE,
						TransactionReference: { CustomerContext: referenceNumber ?? '' },
					},
					Shipment: {
						Description: description ?? '',
						Shipper: { ...shipFromAddress, ShipperNumber: accountNumber ?? '' },
						ShipTo: shipToAddress,
						ShipFrom: shipFromAddress,
						PaymentInformation: {
							ShipmentCharge: [
								{
									Type: CHARGE_TYPES.TRANSPORTATION,
									BillShipper: { AccountNumber: accountNumber ?? '' },
								},
							],
						},
						Service: { Code: service, Description: '' },
						Package: packages.map((pkg) => ({
							PackagingType: { Code: pkg.packaging, Description: '' },
							Dimensions: pkg.length
								? buildDimensions(pkg.length, pkg.width, pkg.height)
								: undefined,
							PackageWeight: buildWeight(pkg.weight),
							Description: pkg.description ?? '',
							...(pkg.insuredValue
								? {
										PackageServiceOptions: {
											DeclaredValue: {
												CurrencyCode: 'USD',
												MonetaryValue: String(pkg.insuredValue),
											},
										},
									}
								: {}),
						})),
						...(referenceNumber
							? {
									ReferenceNumber: {
										Code: REFERENCE_TYPES.PURCHASE_ORDER,
										Value: referenceNumber,
									},
								}
							: {}),
					},
					LabelSpecification: {
						LabelImageFormat: { Code: labelFormat, Description: '' },
						LabelStockSize: { Height: LABEL_STOCK.HEIGHT, Width: LABEL_STOCK.WIDTH },
					},
				},
			};

			const response = await client.post<unknown>(
				`/api/shipments/${API_VERSIONS.SHIPPING}/ship`,
				shipmentRequest,
			);

			return formatToolResponse(response);
		},
	);

	server.registerTool(
		'void_shipment',
		{
			title: 'Void Shipment',
			description:
				'Cancel a shipment and void its label. Use when a shipment has been created but not yet picked up or tendered to UPS. The tracking number becomes invalid after voiding.',
			inputSchema: {
				shipmentIdentificationNumber: z
					.string()
					.describe('The shipment identification number returned from create_shipment'),
			},
		},
		async ({ shipmentIdentificationNumber }) => {
			const response = await client.delete<unknown>(
				`/api/shipments/${API_VERSIONS.SHIPPING}/void/cancel/${shipmentIdentificationNumber}`,
			);

			return formatToolResponse(response);
		},
	);
}
