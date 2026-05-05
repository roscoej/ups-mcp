import type { PICKUP_SERVICE_CODES } from '../tools/constants.js';

// ─── Types ───────────────────────────────────────────────────────────────────

export type PickupServiceCode = (typeof PICKUP_SERVICE_CODES)[keyof typeof PICKUP_SERVICE_CODES];

// ─── Parameters ──────────────────────────────────────────────────────────────

/**
 * Parameters for scheduling a package pickup.
 */
export interface SchedulePickupParams {
	readonly pickupDate: string;
	readonly readyTime: string;
	readonly closeTime: string;
	readonly address: PickupAddress;
	readonly packages: readonly PickupPackage[];
	readonly totalWeight: number;
	readonly weightUnit?: 'LBS' | 'KGS';
	readonly serviceCode?: PickupServiceCode;
	readonly overweightIndicator?: boolean;
	readonly paymentMethod?: 'account' | 'tracking';
	readonly specialInstructions?: string;
	readonly referenceNumber?: string;
}

/**
 * Pickup location address.
 */
export interface PickupAddress {
	readonly companyName: string;
	readonly contactName: string;
	readonly phone: string;
	readonly addressLine1: string;
	readonly addressLine2?: string;
	readonly addressLine3?: string;
	readonly city: string;
	readonly stateProvinceCode: string;
	readonly postalCode: string;
	readonly countryCode: string;
	readonly residentialIndicator?: boolean;
	readonly pickupPoint?: string;
	readonly floor?: string;
	readonly room?: string;
}

/**
 * Package details for pickup request.
 */
export interface PickupPackage {
	readonly serviceCode: string;
	readonly quantity: number;
	readonly destinationCountryCode: string;
	readonly containerCode?: '01' | '02' | '04';
}

// ─── Response Types ──────────────────────────────────────────────────────────

/**
 * Full pickup creation response.
 */
export interface PickupCreationResponse {
	readonly PickupCreationResponse: {
		readonly Response: {
			readonly ResponseStatus: { readonly Code: string; readonly Description: string };
		};
		readonly PRN: string;
		readonly RateStatus?: {
			readonly Code: string;
			readonly Description: string;
		};
		readonly RateResult?: {
			readonly Disclaimer?: string;
			readonly RateType: string;
			readonly CurrencyCode: string;
			readonly ChargeDetail?: readonly PickupChargeDetail[];
			readonly TaxCharges?: readonly PickupTaxCharge[];
			readonly GrandTotalOfAllCharge?: string;
		};
	};
}

/**
 * Pickup charge breakdown.
 */
export interface PickupChargeDetail {
	readonly ChargeCode: string;
	readonly ChargeDescription: string;
	readonly ChargeAmount: string;
	readonly TaxAmount?: string;
}

/**
 * Tax charge on a pickup.
 */
export interface PickupTaxCharge {
	readonly Type: string;
	readonly MonetaryValue: string;
}

// ─── Simplified Types ────────────────────────────────────────────────────────

/**
 * Simplified pickup scheduling result.
 */
export interface PickupResult {
	readonly confirmationNumber: string;
	readonly pickupDate: string;
	readonly readyTime: string;
	readonly closeTime: string;
	readonly rateStatus?: string;
	readonly totalCharge?: string;
	readonly currency?: string;
}

/**
 * Parameters for cancelling a pickup.
 */
export interface CancelPickupParams {
	readonly confirmationNumber: string;
}

/**
 * Cancel pickup response.
 */
export interface CancelPickupResult {
	readonly status: string;
}
