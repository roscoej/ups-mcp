import type { UPSServiceCode } from './shipping.js';

// ─── Rating Parameters ───────────────────────────────────────────────────────

/**
 * Minimal address for rating (only needs location identifiers).
 */
export interface RatingAddress {
	readonly city: string;
	readonly stateProvinceCode: string;
	readonly postalCode: string;
	readonly countryCode: string;
	readonly residentialIndicator?: boolean;
}

/**
 * Package information for rating.
 */
export interface RatePackage {
	readonly weight: number;
	readonly weightUnit?: 'LBS' | 'KGS';
	readonly dimensions?: {
		readonly length: number;
		readonly width: number;
		readonly height: number;
		readonly unit?: 'IN' | 'CM';
	};
	readonly packaging?: string;
	readonly additionalHandling?: boolean;
	readonly largePackage?: boolean;
}

/**
 * Parameters for getting shipping rates.
 */
export interface RateParams {
	readonly service?: UPSServiceCode;
	readonly shipFrom: RatingAddress;
	readonly shipTo: RatingAddress;
	readonly packages: readonly RatePackage[];
	readonly saturdayDelivery?: boolean;
	readonly returnService?: boolean;
}

// ─── Rating Response Types ───────────────────────────────────────────────────

/**
 * Full rating API response.
 */
export interface RateResponse {
	readonly RateResponse: {
		readonly Response: ResponseStatus;
		readonly RatedShipment: readonly RatedShipment[];
	};
}

/**
 * API response status section.
 */
export interface ResponseStatus {
	readonly ResponseStatus: {
		readonly Code: string;
		readonly Description: string;
	};
	readonly Alert?: readonly ResponseAlert[];
	readonly TransactionReference?: {
		readonly CustomerContext: string;
	};
}

/**
 * A warning or informational alert from the API.
 */
export interface ResponseAlert {
	readonly Code: string;
	readonly Description: string;
}

/**
 * A single rated service option.
 */
export interface RatedShipment {
	readonly Service: {
		readonly Code: string;
		readonly Description?: string;
	};
	readonly RatedShipmentAlert?: readonly ResponseAlert[];
	readonly BillingWeight: {
		readonly UnitOfMeasurement: { readonly Code: string; readonly Description?: string };
		readonly Weight: string;
	};
	readonly TransportationCharges: ChargeAmount;
	readonly ServiceOptionsCharges: ChargeAmount;
	readonly TotalCharges: ChargeAmount;
	readonly NegotiatedRateCharges?: {
		readonly TotalCharge: ChargeAmount;
	};
	readonly GuaranteedDelivery?: {
		readonly BusinessDaysInTransit: string;
		readonly DeliveryByTime?: string;
	};
	readonly RatedPackage?: readonly RatedPackage[];
	readonly TimeInTransit?: {
		readonly ServiceSummary?: {
			readonly EstimatedArrival?: {
				readonly Arrival?: { readonly Date: string; readonly Time?: string };
				readonly BusinessDaysInTransit?: string;
			};
		};
	};
}

/**
 * A monetary charge amount.
 */
export interface ChargeAmount {
	readonly CurrencyCode: string;
	readonly MonetaryValue: string;
}

/**
 * Per-package rating detail.
 */
export interface RatedPackage {
	readonly TransportationCharges: ChargeAmount;
	readonly ServiceOptionsCharges: ChargeAmount;
	readonly TotalCharges: ChargeAmount;
	readonly Weight: string;
	readonly BillingWeight: {
		readonly UnitOfMeasurement: { readonly Code: string };
		readonly Weight: string;
	};
}

// ─── Simplified Types ────────────────────────────────────────────────────────

/**
 * Simplified rate option (flattened for consumer use).
 */
export interface RateOption {
	readonly service: string;
	readonly serviceCode: string;
	readonly totalCharges: string;
	readonly negotiatedCharges?: string;
	readonly currency: string;
	readonly billingWeight: string;
	readonly transitDays?: string;
	readonly deliveryByTime?: string;
	readonly guaranteedDelivery: boolean;
}

/**
 * Simplified rating result.
 */
export interface RateResult {
	readonly rates: readonly RateOption[];
	readonly alerts?: readonly string[];
}

// ─── Time in Transit ─────────────────────────────────────────────────────────

/**
 * Time in Transit request parameters.
 */
export interface TimeInTransitParams {
	readonly shipFrom: { readonly postalCode: string; readonly countryCode: string };
	readonly shipTo: { readonly postalCode: string; readonly countryCode: string };
	readonly weight: number;
	readonly shipDate?: string;
	readonly packages?: number;
}

/**
 * Time in Transit service estimate.
 */
export interface TransitTimeEstimate {
	readonly serviceCode: string;
	readonly serviceName: string;
	readonly businessDaysInTransit: number;
	readonly estimatedArrivalDate: string;
	readonly estimatedArrivalTime?: string;
	readonly guaranteed: boolean;
}

/**
 * Time in Transit result.
 */
export interface TimeInTransitResult {
	readonly estimates: readonly TransitTimeEstimate[];
}
