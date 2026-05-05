// ─── Config ──────────────────────────────────────────────────────────────────
export type { UPSEnvironment, UPSConfig, TransportMode, ServerConfig } from './config.js';

// ─── Shipping ────────────────────────────────────────────────────────────────
export type {
	DomesticServiceCode,
	InternationalServiceCode,
	RegionalServiceCode,
	MailInnovationsServiceCode,
	UPSServiceCode,
	UPSPackagingCode,
	FreightPackagingCode,
	LabelFormat,
	ChargeType,
	PaymentMethodCode,
	ReferenceType,
	ReturnServiceCode,
	DeliveryConfirmationType,
	UPSAddress,
	PackageDimensions,
	PackageWeight,
	DeclaredValue,
	PackageDeliveryConfirmation,
	CODOptions,
	PackageServiceOptions,
	HazmatInfo,
	ShipmentPackage,
	PaymentInformation,
	ShipmentServiceOptions,
	NotificationRequest,
	CreateShipmentParams,
	ShipmentResult,
	PackageResult,
	VoidShipmentResult,
} from './shipping.js';

// ─── Tracking ────────────────────────────────────────────────────────────────
export type {
	TrackingStatusType,
	TrackingActivityCode,
	TrackPackageParams,
	TrackingResponse,
	TrackingShipment,
	TrackingPackage,
	PackageStatus,
	TrackingActivity,
	ActivityLocation,
	DeliveryDate,
	DeliveryTime,
	TrackingWeight,
	TrackingService,
	Milestone,
	SignatureInfo,
	ProofOfDelivery,
	TrackingResult,
	SimpleTrackingActivity,
} from './tracking.js';

// ─── Rating ──────────────────────────────────────────────────────────────────
export type {
	RatingAddress,
	RatePackage,
	RateParams,
	RateResponse,
	ResponseStatus,
	ResponseAlert,
	RatedShipment,
	ChargeAmount,
	RatedPackage,
	RateOption,
	RateResult,
	TimeInTransitParams,
	TransitTimeEstimate,
	TimeInTransitResult,
} from './rating.js';

// ─── Address Validation ──────────────────────────────────────────────────────
export type {
	AddressClassificationType,
	AddressValidationOption,
	ValidateAddressParams,
	AddressValidationResponse,
	AddressCandidateRaw,
	AddressCandidate,
	AddressValidationResult,
} from './address.js';

// ─── Pickup ──────────────────────────────────────────────────────────────────
export type {
	PickupServiceCode,
	SchedulePickupParams,
	PickupAddress,
	PickupPackage,
	PickupCreationResponse,
	PickupChargeDetail,
	PickupTaxCharge,
	PickupResult,
	CancelPickupParams,
	CancelPickupResult,
} from './pickup.js';
