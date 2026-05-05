// ─── API Versions ────────────────────────────────────────────────────────────

export const API_VERSIONS = {
	SHIPPING: 'v2409',
	RATING: 'v2403',
	TRACKING: 'v1',
	ADDRESS_VALIDATION: 'v2',
	TIME_IN_TRANSIT: 'v1',
	PICKUP: 'v1',
	LOCATOR: 'v2',
	LABEL_RECOVERY: 'v2409',
} as const;

// ─── Service Codes ───────────────────────────────────────────────────────────

/**
 * UPS domestic service codes (US origin).
 */
export const DOMESTIC_SERVICES = {
	NEXT_DAY_AIR_EARLY: '14',
	NEXT_DAY_AIR: '01',
	NEXT_DAY_AIR_SAVER: '13',
	SECOND_DAY_AIR_AM: '59',
	SECOND_DAY_AIR: '02',
	THREE_DAY_SELECT: '12',
	GROUND: '03',
	SURE_POST_LESS_THAN_1LB: '92',
	SURE_POST_1LB_OR_GREATER: '93',
	SURE_POST_BPM: '94',
	SURE_POST_MEDIA: '95',
} as const;

/**
 * UPS international service codes.
 */
export const INTERNATIONAL_SERVICES = {
	STANDARD: '11',
	WORLDWIDE_EXPRESS: '07',
	WORLDWIDE_EXPRESS_PLUS: '54',
	WORLDWIDE_EXPEDITED: '08',
	WORLDWIDE_SAVER: '65',
	WORLDWIDE_EXPRESS_FREIGHT: '96',
	WORLDWIDE_EXPRESS_FREIGHT_MIDDAY: '71',
	WORLDWIDE_ECONOMY_DDP: '72',
	WORLDWIDE_ECONOMY_DDU: '73',
	ACCESS_POINT_ECONOMY: '70',
} as const;

/**
 * UPS region-specific service codes (EU, Poland, etc.).
 */
export const REGIONAL_SERVICES = {
	TODAY_STANDARD: '82',
	TODAY_DEDICATED_COURIER: '83',
	TODAY_INTERCITY: '84',
	TODAY_EXPRESS: '85',
	TODAY_EXPRESS_SAVER: '86',
	EXPRESS_12_00: '74',
} as const;

/**
 * UPS Mail Innovations service codes.
 */
export const MAIL_INNOVATIONS_SERVICES = {
	FIRST_CLASS_MAIL: 'M2',
	PRIORITY_MAIL: 'M3',
	EXPEDITED_MAIL_INNOVATIONS: 'M4',
	PRIORITY_MAIL_INNOVATIONS: 'M5',
	ECONOMY_MAIL_INNOVATIONS: 'M6',
	MAIL_INNOVATIONS_RETURNS: 'M7',
} as const;

/**
 * All UPS service codes combined.
 */
export const SERVICE_CODES = {
	...DOMESTIC_SERVICES,
	...INTERNATIONAL_SERVICES,
	...REGIONAL_SERVICES,
	...MAIL_INNOVATIONS_SERVICES,
} as const;

// ─── Packaging Type Codes ────────────────────────────────────────────────────

/**
 * UPS packaging type codes for small package shipments.
 */
export const PACKAGING_TYPES = {
	UNKNOWN: '00',
	UPS_LETTER: '01',
	CUSTOMER_SUPPLIED: '02',
	TUBE: '03',
	PAK: '04',
	UPS_EXPRESS_BOX: '21',
	UPS_25KG_BOX: '24',
	UPS_10KG_BOX: '25',
	SMALL_EXPRESS_BOX: '2a',
	MEDIUM_EXPRESS_BOX: '2b',
	LARGE_EXPRESS_BOX: '2c',
	PALLET: '30',
	FLATS: '56',
	PARCELS: '57',
	BPM: '58',
	FIRST_CLASS: '59',
	PRIORITY: '60',
	MACHINABLES: '61',
	IRREGULARS: '62',
	PARCEL_POST: '63',
	BPM_PARCEL: '64',
	MEDIA_MAIL: '65',
	BPM_FLAT: '66',
	STANDARD_FLAT: '67',
} as const;

/**
 * UPS Freight (LTL/TL) packaging codes.
 */
export const FREIGHT_PACKAGING_TYPES = {
	BAG: '01',
	BOX: '02',
	CARTON: '03',
	CRATE: '04',
	DRUM: '05',
	PALLET_SKID: '06',
	ROLL: '07',
	TUBE: '08',
} as const;

// ─── Tracking Status Codes ───────────────────────────────────────────────────

/**
 * UPS tracking status type codes.
 */
export const TRACKING_STATUS_TYPES = {
	DELIVERED: 'D',
	IN_TRANSIT: 'I',
	MANIFEST_PICKUP: 'M',
	EXCEPTION: 'X',
	RETURNED: 'RS',
} as const;

/**
 * UPS tracking activity codes (within status types).
 */
export const TRACKING_ACTIVITY_CODES = {
	DELIVERED: 'KB',
	DELIVERED_FRONT_DOOR: 'FS',
	DELIVERED_ACCESS_POINT: 'KN',
	OUT_FOR_DELIVERY: 'OT',
	DEPARTED_FACILITY: 'DP',
	ARRIVED_AT_FACILITY: 'AR',
	ORIGIN_SCAN: 'OR',
	DESTINATION_SCAN: 'DS',
	PICKUP_SCAN: 'PU',
	EXPORT_SCAN: 'XB',
	IMPORT_SCAN: 'IB',
	IN_TRANSIT_TO_DESTINATION: 'IT',
	PROCESSING_AT_FACILITY: 'OF',
	LABEL_CREATED: 'MP',
	MANIFEST_RECEIVED: 'MV',
	DELIVERY_ATTEMPTED: 'NA',
	HELD_FOR_PICKUP: 'KM',
	RETURNED_TO_SENDER: 'RS',
	TRANSFERRED_TO_POST_OFFICE: 'TO',
} as const;

// ─── Payment & Billing ───────────────────────────────────────────────────────

/**
 * Shipment charge type codes.
 */
export const CHARGE_TYPES = {
	TRANSPORTATION: '01',
	DUTIES_AND_TAXES: '02',
} as const;

/**
 * Bill-to party codes (used in API string form).
 */
export const BILL_TO = {
	SHIPPER: 'SHP',
	RECEIVER: 'REC',
	THIRD_PARTY: 'TP',
	CONSIGNEE_BILLED: 'CB',
} as const;

/**
 * Payment method codes.
 */
export const PAYMENT_METHODS = {
	PREPAID: '01',
	COLLECT: '02',
	THIRD_PARTY: '03',
	FREIGHT_COLLECT: '04',
	CONSIGNEE_BILLED: '05',
} as const;

// ─── Reference Number Types ──────────────────────────────────────────────────

/**
 * Reference number type codes for shipments.
 */
export const REFERENCE_TYPES = {
	PURCHASE_ORDER: 'PO',
	INVOICE: 'IN',
	CUSTOMER_REFERENCE: 'CR',
	DEPARTMENT_NUMBER: 'DN',
	STORE_NUMBER: 'SN',
	RELEASE_NUMBER: 'RN',
	RMA_NUMBER: 'RMA',
	ENTRY_NUMBER: 'EI',
	APPROPRIATION_NUMBER: 'AP',
	BILL_OF_LADING: 'BL',
	PRODUCTION_CODE: 'PC',
	MANIFEST_KEY_NUMBER: 'MK',
	MODEL_NUMBER: 'MN',
	PART_NUMBER: 'PN',
	SERIAL_NUMBER: 'SE',
	TRANSACTION_REFERENCE: 'TN',
} as const;

// ─── Delivery Confirmation / Signature ───────────────────────────────────────

/**
 * Delivery confirmation type codes.
 */
export const DELIVERY_CONFIRMATION = {
	NONE: '0',
	DELIVERY_CONFIRMATION: '1',
	DELIVERY_CONFIRMATION_SIGNATURE: '2',
	ADULT_SIGNATURE_REQUIRED: '3',
	USPS_DELIVERY_CONFIRMATION: '4',
} as const;

// ─── Package Service Options ─────────────────────────────────────────────────

/**
 * Notification codes for shipment notifications.
 */
export const NOTIFICATION_CODES = {
	SHIP_NOTIFICATION: '5',
	DELIVERY_NOTIFICATION: '6',
	EXCEPTION_NOTIFICATION: '7',
	QUANTUM_VIEW_SHIP: '012',
	QUANTUM_VIEW_DELIVERY: '013',
	QUANTUM_VIEW_EXCEPTION: '2',
} as const;

/**
 * COD (Collect on Delivery) fund codes.
 */
export const COD_FUND_CODES = {
	CASH_ONLY: '0',
	ANY_FORM_OF_PAYMENT: '8',
} as const;

// ─── Units of Measurement ────────────────────────────────────────────────────

/**
 * Weight unit codes.
 */
export const WEIGHT_UNITS = {
	LBS: 'LBS',
	KGS: 'KGS',
	OZS: 'OZS',
} as const;

/**
 * Dimension unit codes.
 */
export const DIMENSION_UNITS = {
	INCHES: 'IN',
	CENTIMETERS: 'CM',
} as const;

/**
 * Distance unit codes.
 */
export const DISTANCE_UNITS = {
	MILES: 'MI',
	KILOMETERS: 'KM',
} as const;

/**
 * Combined units for backward compat.
 */
export const UNITS = {
	WEIGHT_LBS: WEIGHT_UNITS.LBS,
	WEIGHT_KGS: WEIGHT_UNITS.KGS,
	DIMENSION_INCHES: DIMENSION_UNITS.INCHES,
	DIMENSION_CM: DIMENSION_UNITS.CENTIMETERS,
	DISTANCE_MILES: DISTANCE_UNITS.MILES,
	DISTANCE_KM: DISTANCE_UNITS.KILOMETERS,
} as const;

// ─── Label Formats ───────────────────────────────────────────────────────────

/**
 * Supported label image formats.
 */
export const LABEL_FORMATS = {
	GIF: 'GIF',
	EPL: 'EPL',
	ZPL: 'ZPL',
	SPL: 'SPL',
	STARPL: 'STARPL',
	PNG: 'PNG',
} as const;

/**
 * Label stock sizes (Height x Width in inches).
 */
export const LABEL_STOCK = {
	HEIGHT: '6',
	WIDTH: '4',
} as const;

/**
 * Label stock size options.
 */
export const LABEL_STOCK_SIZES = {
	STANDARD_4x6: { Height: '6', Width: '4' },
	STANDARD_4x8: { Height: '8', Width: '4' },
} as const;

// ─── Pickup ──────────────────────────────────────────────────────────────────

/**
 * Pickup service codes.
 */
export const PICKUP_SERVICE_CODES = {
	DAILY_PICKUP: '001',
	CUSTOMER_COUNTER: '002',
	ON_CALL_AIR: '003',
	ONE_TIME_PICKUP: '004',
	LETTER_CENTER: '005',
	AIR_SERVICE_CENTER: '006',
} as const;

/**
 * Pickup indicator/flag codes.
 */
export const PICKUP = {
	CONTAINER_PACKAGE: '01',
	CONTAINER_UPS_LETTER: '02',
	CONTAINER_PALLET: '04',
	RATE_INDICATOR_YES: 'Y',
	RATE_INDICATOR_NO: 'N',
	ALTERNATE_ADDRESS_YES: 'Y',
	ALTERNATE_ADDRESS_NO: 'N',
	OVERWEIGHT_YES: 'Y',
	OVERWEIGHT_NO: 'N',
	PAYMENT_ACCOUNT: '01',
	PAYMENT_TRACKING: '03',
	SERVICE_ON_CALL_AIR: '003',
	SERVICE_DAILY: '001',
} as const;

// ─── Location Types ──────────────────────────────────────────────────────────

/**
 * UPS location type codes for Locator API.
 */
export const LOCATION_TYPES = {
	all: '64',
	dropoff: '01',
	pickup: '03',
	ups_store: '19',
	authorized_shipping_outlet: '20',
	alliance_customer_center: '22',
	ups_access_point: '64',
	store: '19',
} as const;

// ─── Address Validation ──────────────────────────────────────────────────────

/**
 * Address classification codes returned by validation.
 */
export const ADDRESS_CLASSIFICATION = {
	COMMERCIAL: '1',
	RESIDENTIAL: '2',
	UNKNOWN: '0',
} as const;

/**
 * Address validation request options (strictness levels).
 */
export const ADDRESS_VALIDATION_OPTIONS = {
	ADDRESS_VALIDATION: '1',
	ADDRESS_CLASSIFICATION: '2',
	ADDRESS_VALIDATION_AND_CLASSIFICATION: '3',
} as const;

// ─── Rating ──────────────────────────────────────────────────────────────────

/**
 * Rating request option types.
 */
export const RATING_REQUEST_OPTIONS = {
	RATE: 'Rate',
	SHOP: 'Shop',
	RAGENEG: 'Rageneg',
} as const;

/**
 * Default values for rating/transit queries.
 */
export const RATING_DEFAULTS = {
	SHIP_TIME: '1000',
	PACKAGE_COUNT: '1',
	REQUEST_OPTION_SHOP: RATING_REQUEST_OPTIONS.SHOP,
	REQUEST_OPTION_RATE: RATING_REQUEST_OPTIONS.RATE,
} as const;

// ─── Locator Defaults ────────────────────────────────────────────────────────

export const LOCATOR_DEFAULTS = {
	RADIUS_MILES: 25,
	MAX_RESULTS: 10,
	MAX_RESULTS_LIMIT: 50,
	REQUEST_ACTION: 'Locator',
	REQUEST_OPTION: '1',
} as const;

// ─── Shipment Limits ─────────────────────────────────────────────────────────

export const SHIPMENT_LIMITS = {
	MAX_PACKAGES: 200,
} as const;

// ─── Request Options ─────────────────────────────────────────────────────────

/**
 * Shipment request validation options.
 */
export const SHIPMENT_REQUEST_OPTIONS = {
	NON_VALIDATE: 'nonvalidate',
	VALIDATE: 'validate',
} as const;

// ─── Incoterms / Terms of Sale ───────────────────────────────────────────────

/**
 * International Commercial Terms (Incoterms 2020) for duty/tax responsibility.
 * Defines who pays freight, insurance, transportation, and when risk transfers.
 */
export const INCOTERMS = {
	// Multimodal (any transport mode)
	EXW: 'EXW',
	FCA: 'FCA',
	CPT: 'CPT',
	CIP: 'CIP',
	DAP: 'DAP',
	DPU: 'DPU',
	DDP: 'DDP',

	// Maritime only (sea or inland waterway)
	FAS: 'FAS',
	FOB: 'FOB',
	CFR: 'CFR',
	CIF: 'CIF',

	// Legacy / deprecated (still accepted by UPS API)
	DAT: 'DAT',
	DDU: 'DDU',
	DEQ: 'DEQ',
	DES: 'DES',
	DAF: 'DAF',
} as const;

/**
 * Terms of shipment — who pays duties, taxes, and freight.
 * Used in international forms and shipment service options.
 */
export const TERMS_OF_SHIPMENT = {
	COST_AND_FREIGHT: 'CFR',
	COST_INSURANCE_AND_FREIGHT: 'CIF',
	CARRIAGE_AND_INSURANCE_PAID: 'CIP',
	CARRIAGE_PAID_TO: 'CPT',
	DELIVERED_AT_FRONTIER: 'DAF',
	DELIVERED_AT_PLACE: 'DAP',
	DELIVERED_AT_TERMINAL: 'DAT',
	DELIVERED_DUTY_PAID: 'DDP',
	DELIVERED_DUTY_UNPAID: 'DDU',
	DELIVERED_EX_QUAY: 'DEQ',
	DELIVERED_EX_SHIP: 'DES',
	EX_WORKS: 'EXW',
	FREE_ALONGSIDE_SHIP: 'FAS',
	FREE_CARRIER: 'FCA',
	FREE_ON_BOARD: 'FOB',
} as const;

// ─── Customs & Duties ────────────────────────────────────────────────────────

/**
 * Customs value type codes for international shipments.
 */
export const CUSTOMS_VALUE_TYPES = {
	SALE: '01',
	COST: '02',
	REPLACEMENT: '03',
	FAIR_MARKET: '04',
} as const;

/**
 * Duty payment methods (who pays duties and taxes).
 */
export const DUTY_PAYMENT = {
	BILL_SHIPPER: '01',
	BILL_RECEIVER: '02',
	BILL_THIRD_PARTY: '03',
} as const;

/**
 * Broker selection codes.
 */
export const BROKER_TYPES = {
	UPS_BROKERAGE: '01',
	CUSTOMER_BROKER: '02',
} as const;

/**
 * De minimis threshold types (below which no duty/tax applies).
 */
export const DE_MINIMIS_TYPES = {
	DUTY: 'DUTY',
	TAX: 'TAX',
	DUTY_AND_TAX: 'DUTY_AND_TAX',
} as const;

/**
 * Landed cost billing party options.
 */
export const LANDED_COST_BILLING = {
	SHIPPER: 'SHIPPER',
	CONSIGNEE: 'CONSIGNEE',
	THIRD_PARTY: 'THIRD_PARTY',
} as const;

// ─── Export Control / EEI ────────────────────────────────────────────────────

/**
 * Export types for EEI (Electronic Export Information) filings.
 */
export const EXPORT_TYPES = {
	DOMESTIC: 'D',
	FOREIGN: 'F',
	FOREIGN_MILITARY: 'M',
} as const;

/**
 * EEI filing option codes.
 */
export const EEI_FILING_OPTIONS = {
	SHIPPER_FILED: '1',
	UPS_FILED: '3',
	AES_DIRECT: '4',
} as const;

/**
 * Point of origin codes for export declarations.
 */
export const POINT_OF_ORIGIN = {
	UNITED_STATES: 'US',
	PUERTO_RICO: 'PR',
	VIRGIN_ISLANDS: 'VI',
} as const;

/**
 * SED/AES exemption codes (when export information is not required).
 */
export const EXPORT_EXEMPTIONS = {
	NO_LICENSE_REQUIRED: 'NLR',
	NO_EEI_30_36: '30.36',
	NO_EEI_30_37_A: '30.37(a)',
	NO_EEI_30_37_H: '30.37(h)',
	NO_EEI_30_37_F: '30.37(f)',
	NO_EEI_30_37_G: '30.37(g)',
	NO_EEI_30_37_J: '30.37(j)',
	NO_EEI_30_37_K: '30.37(k)',
	NO_EEI_30_37_O: '30.37(o)',
	NO_EEI_30_37_Y: '30.37(y)',
	NO_EEI_30_39: '30.39',
	NO_EEI_30_40_A: '30.40(a)',
	NO_EEI_30_40_B: '30.40(b)',
	NO_EEI_30_40_C: '30.40(c)',
	NO_EEI_30_40_D: '30.40(d)',
} as const;

// ─── Product / Commodity Units ───────────────────────────────────────────────

/**
 * Unit of measure codes for product quantities in customs declarations.
 */
export const PRODUCT_UNITS = {
	BARREL: 'BA',
	BUNDLE: 'BE',
	BAG: 'BG',
	BOLT: 'BH',
	BOTTLE: 'BO',
	BOX: 'BX',
	CARTON: 'CT',
	CONTAINER: 'CN',
	CRATE: 'CR',
	CASE: 'CS',
	CYLINDER: 'CY',
	DOZEN: 'DZ',
	EACH: 'EA',
	ENVELOPE: 'EN',
	FLAT: 'FT',
	KILOGRAM: 'KG',
	GROSS: 'GR',
	LITER: 'L',
	LOT: 'LT',
	METER: 'M',
	NUMBER: 'NMB',
	PACKAGE: 'PA',
	PIECES: 'PC',
	PAIR: 'PR',
	PALLET: 'PL',
	POUND: 'LB',
	PROOF_LITER: 'PF',
	REAM: 'RL',
	ROLL: 'RO',
	SET: 'SET',
	SQUARE_METER: 'SM',
	SQUARE_YARD: 'SY',
	TUBE: 'TU',
	YARD: 'YD',
} as const;

/**
 * Schedule B unit of measure codes (US Census / HTS).
 */
export const SCHEDULE_B_UNITS = {
	BARRELS: 'BBL',
	CARAT: 'CAR',
	CLEAN_YIELD_KILOGRAM: 'CYK',
	CONTENT_KILOGRAM: 'CKG',
	CONTENT_TON: 'CTN',
	CUBIC_METERS: 'CBM',
	CURIE: 'CUR',
	DOZEN: 'DOZ',
	DOZEN_PAIRS: 'DPR',
	EACH: 'NO',
	FIBER_METER: 'FBM',
	GRAM: 'GM',
	GROSS: 'GRS',
	GROSS_CONTAINERS: 'GCN',
	HUNDRED: 'HUN',
	KILOGRAM: 'KG',
	LITER: 'LTR',
	METER: 'M',
	METRIC_TON: 'T',
	NUMBER: 'NO',
	PACKS: 'PAC',
	PAIRS: 'PRS',
	PIECES: 'PCS',
	PROOF_LITER: 'PFL',
	RUNNING_BALES: 'RBA',
	SQUARE_CENTIMETERS: 'SCM',
	SQUARE_METERS: 'SQM',
	THOUSAND: 'THS',
} as const;

// ─── USMCA / Trade Agreements ────────────────────────────────────────────────

/**
 * USMCA (formerly NAFTA) blanket period codes.
 */
export const USMCA_BLANKET_PERIODS = {
	ONE_YEAR: '01',
	TWO_YEARS: '02',
	FOUR_YEARS: '04',
} as const;

/**
 * USMCA/NAFTA net cost method codes.
 */
export const USMCA_NET_COST_METHODS = {
	NET_COST: 'NC',
	REGIONAL_VALUE_CONTENT: 'RV',
	TRANSACTION_VALUE: 'TV',
} as const;

/**
 * USMCA preference criteria codes (determines origin qualification).
 */
export const USMCA_PREFERENCE_CRITERIA = {
	A: 'A',
	B: 'B',
	C: 'C',
	D: 'D',
	E: 'E',
	F: 'F',
} as const;

/**
 * USMCA producer codes.
 */
export const USMCA_PRODUCER = {
	YES_CERTIFIER_IS_PRODUCER: '01',
	NO_BASED_ON_KNOWLEDGE: '02',
	NO_BASED_ON_PRODUCER_STATEMENT: '03',
} as const;

// ─── Currency Codes ──────────────────────────────────────────────────────────

/**
 * Common currency codes used in UPS transactions.
 */
export const CURRENCY_CODES = {
	USD: 'USD',
	EUR: 'EUR',
	GBP: 'GBP',
	CAD: 'CAD',
	AUD: 'AUD',
	JPY: 'JPY',
	CNY: 'CNY',
	MXN: 'MXN',
	CHF: 'CHF',
	HKD: 'HKD',
	SGD: 'SGD',
	INR: 'INR',
} as const;

// ─── Shipment Options ────────────────────────────────────────────────────────

/**
 * Shipment-level option indicator codes.
 */
export const SHIPMENT_OPTIONS = {
	SATURDAY_DELIVERY: 'SaturdayDelivery',
	SATURDAY_PICKUP: 'SaturdayPickup',
	DIRECT_DELIVERY_ONLY: 'DirectDeliveryOnly',
	RETURN_SERVICE: 'ReturnService',
	CARBON_NEUTRAL: 'CarbonNeutral',
} as const;

/**
 * Return service codes.
 */
export const RETURN_SERVICE_CODES = {
	UPS_PRINT_AND_MAIL: '2',
	UPS_RETURN_1_ATTEMPT: '3',
	UPS_RETURN_3_ATTEMPT: '5',
	UPS_ELECTRONIC_RETURN_LABEL: '8',
	UPS_PRINT_RETURN_LABEL: '9',
	UPS_EXCHANGE_PRINT_RETURN: '10',
	UPS_PACK_COLLECT_1_ATTEMPT: '11',
	UPS_PACK_COLLECT_3_ATTEMPT: '12',
} as const;

// ─── Shipment Indication Types ───────────────────────────────────────────────

/**
 * Shipment indication type codes (access point delivery, hold for pickup, etc.).
 */
export const SHIPMENT_INDICATION_TYPES = {
	HOLD_FOR_PICKUP_AT_ACCESS_POINT: '01',
	ACCESS_POINT_DELIVERY: '02',
} as const;

// ─── International Forms ─────────────────────────────────────────────────────

/**
 * International forms/document type codes.
 */
export const INTERNATIONAL_FORM_TYPES = {
	COMMERCIAL_INVOICE: '01',
	CERTIFICATE_OF_ORIGIN: '02',
	EXPORT_ACCOMPANYING_DOCUMENT: '03',
	EXPORT_LICENSE: '04',
	IMPORT_PERMIT: '05',
	ONE_TIME_NAFTA: '06',
	BLANKET_NAFTA: '07',
	SED_DOCUMENT: '08',
	SHIPPER_LETTER_OF_INSTRUCTION: '09',
	PACKING_LIST: '10',
	EEI_DOCUMENT: '11',
	USMCA_CERTIFICATION_OF_ORIGIN: '12',
} as const;

/**
 * Reason for export codes (used in international shipments).
 */
export const REASON_FOR_EXPORT = {
	SALE: 'SALE',
	GIFT: 'GIFT',
	SAMPLE: 'SAMPLE',
	RETURN: 'RETURN',
	REPAIR: 'REPAIR',
	INTERCOMPANY_DATA: 'INTERCOMPANYDATA',
	PERSONAL_EFFECTS: 'PERSONALEFFECTS',
	TEMPORARY_EXPORT: 'TEMPORARYEXPORT',
} as const;

// ─── Surcharges & Accessorials ───────────────────────────────────────────────

/**
 * Common accessorial/surcharge codes applied to shipments.
 */
export const ACCESSORIAL_CODES = {
	ADDITIONAL_HANDLING: 'AH',
	LARGE_PACKAGE: 'LP',
	OVERSIZE_1: 'OS1',
	OVERSIZE_2: 'OS2',
	RESIDENTIAL_SURCHARGE: 'RSC',
	DELIVERY_AREA_SURCHARGE: 'DAS',
	EXTENDED_AREA_SURCHARGE: 'EAS',
	FUEL_SURCHARGE: 'FSC',
	PEAK_SURCHARGE: 'PSC',
	DEMAND_SURCHARGE: 'DSC',
} as const;

// ─── Dangerous Goods / Hazmat ────────────────────────────────────────────────

/**
 * Hazardous materials regulation sets.
 */
export const HAZMAT_REGULATION_SETS = {
	ADR: 'ADR',
	CFR: 'CFR',
	IATA: 'IATA',
	TDG: 'TDG',
} as const;

/**
 * Hazmat transportation modes.
 */
export const HAZMAT_TRANSPORT_MODES = {
	HIGHWAY: 'Highway',
	GROUND: 'Ground',
	PASSENGER_AIRCRAFT: 'Passenger Aircraft',
	CARGO_AIRCRAFT_ONLY: 'Cargo Aircraft Only',
} as const;

/**
 * Commodity regulated level codes for dangerous goods.
 */
export const HAZMAT_REGULATED_LEVELS = {
	EXCEPTED_QUANTITY: 'EQ',
	FULLY_REGULATED: 'FR',
	LIMITED_QUANTITY: 'LQ',
	LIGHTLY_REGULATED: 'LR',
} as const;

// ─── WorldShip Alpha Service Codes ───────────────────────────────────────────

/**
 * WorldShip/legacy alpha service codes (mapped to numeric API codes).
 * These are used in some older integrations and WorldShip.
 */
export const WORLDSHIP_SERVICE_CODES = {
	'1DM': '14',
	'1DA': '01',
	'1DP': '13',
	'2DM': '59',
	'2DA': '02',
	'3DS': '12',
	GND: '03',
	EP: '54',
	ES: '07',
	SV: '65',
	EX: '08',
	ST: '11',
	ND: '01',
	EN: '74',
	LCO: '70',
	WPA: '72',
	WPO: '73',
} as const;

// ─── Paperless Document Types ────────────────────────────────────────────────

/**
 * Paperless document upload types (used with Paperless API).
 */
export const PAPERLESS_DOCUMENT_TYPES = {
	AUTHORIZATION_FORM: '001',
	COMMERCIAL_INVOICE: '002',
	CERTIFICATE_OF_ORIGIN: '003',
	EXPORT_ACCOMPANYING_DOCUMENT: '004',
	EXPORT_LICENSE: '005',
	IMPORT_PERMIT: '006',
	ONE_TIME_NAFTA: '007',
	OTHER_DOCUMENT: '008',
	POWER_OF_ATTORNEY: '009',
	PACKING_LIST: '010',
	SED_DOCUMENT: '011',
	SHIPPERS_LETTER_OF_INSTRUCTION: '012',
	DECLARATION: '013',
} as const;

// ─── Void Status Codes ───────────────────────────────────────────────────────

/**
 * Status codes returned by void/cancel operations.
 */
export const VOID_STATUS = {
	SUCCESS: '1',
	FAILURE: '0',
} as const;

// ─── Error Codes ─────────────────────────────────────────────────────────────

/**
 * Common UPS API error severity levels.
 */
export const ERROR_SEVERITY = {
	WARNING: 'Warning',
	TRANSIENT: 'Transient',
	HARD: 'Hard',
} as const;

/**
 * Common UPS API error codes encountered during operations.
 */
export const COMMON_ERROR_CODES = {
	SUCCESS: '1',
	FAILURE: '0',
	INVALID_ACCESS_LICENSE: '250001',
	INVALID_TRACKING_NUMBER: '151018',
	NO_TRACKING_INFO: '151044',
	INVALID_ADDRESS: '9241505',
	MISSING_REQUIRED_FIELD: '120100',
	PACKAGE_EXCEEDS_MAX_WEIGHT: '120500',
	INVALID_SERVICE_FOR_ORIGIN: '111210',
	INVALID_SERVICE_FOR_DESTINATION: '111212',
} as const;
