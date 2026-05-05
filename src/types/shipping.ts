import type {
	CHARGE_TYPES,
	DELIVERY_CONFIRMATION,
	DOMESTIC_SERVICES,
	FREIGHT_PACKAGING_TYPES,
	INTERNATIONAL_SERVICES,
	LABEL_FORMATS,
	MAIL_INNOVATIONS_SERVICES,
	PACKAGING_TYPES,
	PAYMENT_METHODS,
	REFERENCE_TYPES,
	REGIONAL_SERVICES,
	RETURN_SERVICE_CODES,
	SERVICE_CODES,
} from '../tools/constants.js';

// ─── Service Codes ───────────────────────────────────────────────────────────

export type DomesticServiceCode = (typeof DOMESTIC_SERVICES)[keyof typeof DOMESTIC_SERVICES];
export type InternationalServiceCode =
	(typeof INTERNATIONAL_SERVICES)[keyof typeof INTERNATIONAL_SERVICES];
export type RegionalServiceCode = (typeof REGIONAL_SERVICES)[keyof typeof REGIONAL_SERVICES];
export type MailInnovationsServiceCode =
	(typeof MAIL_INNOVATIONS_SERVICES)[keyof typeof MAIL_INNOVATIONS_SERVICES];
export type UPSServiceCode = (typeof SERVICE_CODES)[keyof typeof SERVICE_CODES];

// ─── Packaging ───────────────────────────────────────────────────────────────

export type UPSPackagingCode = (typeof PACKAGING_TYPES)[keyof typeof PACKAGING_TYPES];
export type FreightPackagingCode =
	(typeof FREIGHT_PACKAGING_TYPES)[keyof typeof FREIGHT_PACKAGING_TYPES];

// ─── Label Formats ───────────────────────────────────────────────────────────

export type LabelFormat = (typeof LABEL_FORMATS)[keyof typeof LABEL_FORMATS];

// ─── Payment ─────────────────────────────────────────────────────────────────

export type ChargeType = (typeof CHARGE_TYPES)[keyof typeof CHARGE_TYPES];
export type PaymentMethodCode = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
export type ReferenceType = (typeof REFERENCE_TYPES)[keyof typeof REFERENCE_TYPES];
export type ReturnServiceCode = (typeof RETURN_SERVICE_CODES)[keyof typeof RETURN_SERVICE_CODES];

// ─── Delivery Confirmation ───────────────────────────────────────────────────

export type DeliveryConfirmationType =
	(typeof DELIVERY_CONFIRMATION)[keyof typeof DELIVERY_CONFIRMATION];

// ─── Address ─────────────────────────────────────────────────────────────────

/**
 * A physical address for UPS operations.
 */
export interface UPSAddress {
	readonly name: string;
	readonly attentionName?: string;
	readonly companyName?: string;
	readonly phone?: string;
	readonly faxNumber?: string;
	readonly taxIdentificationNumber?: string;
	readonly addressLine1: string;
	readonly addressLine2?: string;
	readonly addressLine3?: string;
	readonly city: string;
	readonly stateProvinceCode: string;
	readonly postalCode: string;
	readonly countryCode: string;
	readonly residentialIndicator?: boolean;
}

// ─── Package ─────────────────────────────────────────────────────────────────

/**
 * Package dimensions.
 */
export interface PackageDimensions {
	readonly length: number;
	readonly width: number;
	readonly height: number;
	readonly unitOfMeasurement?: 'IN' | 'CM';
}

/**
 * Package weight.
 */
export interface PackageWeight {
	readonly weight: number;
	readonly unitOfMeasurement?: 'LBS' | 'KGS' | 'OZS';
}

/**
 * Declared value for insurance.
 */
export interface DeclaredValue {
	readonly currencyCode: string;
	readonly monetaryValue: string;
}

/**
 * Delivery confirmation options for a package.
 */
export interface PackageDeliveryConfirmation {
	readonly dcisType: DeliveryConfirmationType;
}

/**
 * COD (Collect on Delivery) options.
 */
export interface CODOptions {
	readonly codFundsCode: '0' | '8';
	readonly codAmount: DeclaredValue;
}

/**
 * Package service options.
 */
export interface PackageServiceOptions {
	readonly deliveryConfirmation?: PackageDeliveryConfirmation;
	readonly declaredValue?: DeclaredValue;
	readonly cod?: CODOptions;
	readonly additionalHandlingIndicator?: boolean;
	readonly hazmat?: HazmatInfo;
}

/**
 * Hazardous materials information.
 */
export interface HazmatInfo {
	readonly regulationSet: 'ADR' | 'CFR' | 'IATA' | 'TDG';
	readonly idNumber: string;
	readonly packagingGroupType: string;
	readonly quantity: string;
	readonly uom: string;
	readonly properShippingName: string;
	readonly technicalName?: string;
	readonly transportationMode: 'Highway' | 'Ground' | 'Air' | 'Ocean';
	readonly emergencyContact: string;
	readonly emergencyPhone: string;
	readonly classDescription?: string;
	readonly commodityRegulatedLevelCode?: 'EQ' | 'FR' | 'LQ' | 'LR';
}

/**
 * A single package within a shipment.
 */
export interface ShipmentPackage {
	readonly packaging?: UPSPackagingCode;
	readonly dimensions?: PackageDimensions;
	readonly weight: PackageWeight;
	readonly description?: string;
	readonly referenceNumber?: string;
	readonly referenceNumber2?: string;
	readonly serviceOptions?: PackageServiceOptions;
	readonly largePackageIndicator?: boolean;
	readonly additionalHandlingIndicator?: boolean;
}

// ─── Shipment ────────────────────────────────────────────────────────────────

/**
 * Payment information for a shipment.
 */
export interface PaymentInformation {
	readonly type: ChargeType;
	readonly billShipper?: { readonly accountNumber: string };
	readonly billReceiver?: {
		readonly accountNumber: string;
		readonly postalCode?: string;
	};
	readonly billThirdParty?: {
		readonly accountNumber: string;
		readonly postalCode: string;
		readonly countryCode: string;
	};
}

/**
 * Shipment-level service options.
 */
export interface ShipmentServiceOptions {
	readonly saturdayDelivery?: boolean;
	readonly saturdayPickup?: boolean;
	readonly directDeliveryOnly?: boolean;
	readonly carbonNeutral?: boolean;
	readonly returnService?: {
		readonly code: ReturnServiceCode;
	};
	readonly notifications?: readonly NotificationRequest[];
}

/**
 * Notification request configuration.
 */
export interface NotificationRequest {
	readonly code: string;
	readonly email: string;
	readonly undeliverableEmail?: string;
}

/**
 * Parameters for creating a shipment.
 */
export interface CreateShipmentParams {
	readonly service: UPSServiceCode;
	readonly shipFrom: UPSAddress;
	readonly shipTo: UPSAddress;
	readonly packages: readonly ShipmentPackage[];
	readonly description?: string;
	readonly referenceNumber?: string;
	readonly labelFormat?: LabelFormat;
	readonly returnService?: ReturnServiceCode;
	readonly paymentInformation?: PaymentInformation;
	readonly shipmentServiceOptions?: ShipmentServiceOptions;
	readonly documentsOnly?: boolean;
}

/**
 * Successful shipment creation response.
 */
export interface ShipmentResult {
	readonly trackingNumber: string;
	readonly shipmentIdentificationNumber: string;
	readonly labelImage?: string;
	readonly labelFormat?: LabelFormat;
	readonly totalCharges: {
		readonly currency: string;
		readonly amount: string;
	};
	readonly billingWeight: {
		readonly unit: string;
		readonly weight: string;
	};
	readonly packages: readonly PackageResult[];
}

/**
 * Per-package result from shipment creation.
 */
export interface PackageResult {
	readonly trackingNumber: string;
	readonly labelImage?: string;
	readonly serviceOptionsCharges?: string;
}

/**
 * Void/cancel shipment response.
 */
export interface VoidShipmentResult {
	readonly status: string;
	readonly statusCode: string;
}
