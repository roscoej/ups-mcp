import { UNITS } from './constants.js';
import type { FullAddress } from './schemas.js';

/**
 * Builds a UPS API address object from a FullAddress input.
 * Shared across Shipper, ShipTo, and ShipFrom payloads.
 */
export function buildUPSAddress(address: FullAddress) {
	return {
		Name: address.name,
		AttentionName: address.attentionName ?? address.name,
		Phone: { Number: address.phone ?? '' },
		Address: {
			AddressLine: [address.addressLine1, address.addressLine2, address.addressLine3].filter(
				Boolean,
			),
			City: address.city,
			StateProvinceCode: address.stateProvinceCode,
			PostalCode: address.postalCode,
			CountryCode: address.countryCode,
		},
	};
}

/**
 * Builds a UPS API package dimensions object.
 */
export function buildDimensions(length: number, width?: number, height?: number) {
	return {
		UnitOfMeasurement: { Code: UNITS.DIMENSION_INCHES, Description: 'Inches' },
		Length: String(length),
		Width: String(width ?? length),
		Height: String(height ?? length),
	};
}

/**
 * Builds a UPS API package weight object.
 */
export function buildWeight(weight: number) {
	return {
		UnitOfMeasurement: { Code: UNITS.WEIGHT_LBS, Description: 'Pounds' },
		Weight: String(weight),
	};
}

/**
 * Wraps a raw API response as MCP tool output (JSON text content).
 */
export function formatToolResponse(response: unknown) {
	return {
		content: [{ type: 'text' as const, text: JSON.stringify(response, null, 2) }],
	};
}
