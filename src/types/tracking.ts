import type { TRACKING_ACTIVITY_CODES, TRACKING_STATUS_TYPES } from '../tools/constants.js';

// ─── Status Types ────────────────────────────────────────────────────────────

export type TrackingStatusType = (typeof TRACKING_STATUS_TYPES)[keyof typeof TRACKING_STATUS_TYPES];
export type TrackingActivityCode =
	(typeof TRACKING_ACTIVITY_CODES)[keyof typeof TRACKING_ACTIVITY_CODES];

// ─── Tracking Parameters ─────────────────────────────────────────────────────

/**
 * Parameters for tracking a package.
 */
export interface TrackPackageParams {
	readonly trackingNumber: string;
	readonly locale?: string;
	readonly returnSignature?: boolean;
	readonly returnMilestones?: boolean;
	readonly returnPOD?: boolean;
}

// ─── Tracking Response Types ─────────────────────────────────────────────────

/**
 * Top-level tracking response.
 */
export interface TrackingResponse {
	readonly trackResponse: {
		readonly shipment: readonly TrackingShipment[];
	};
}

/**
 * A shipment in the tracking response (may contain multiple packages).
 */
export interface TrackingShipment {
	readonly inquiryNumber: string;
	readonly package: readonly TrackingPackage[];
}

/**
 * A tracked package with full activity history.
 */
export interface TrackingPackage {
	readonly trackingNumber: string;
	readonly deliveryDate?: readonly DeliveryDate[];
	readonly deliveryTime?: DeliveryTime;
	readonly currentStatus: PackageStatus;
	readonly activity: readonly TrackingActivity[];
	readonly weight?: TrackingWeight;
	readonly service?: TrackingService;
	readonly milestones?: readonly Milestone[];
	readonly signature?: SignatureInfo;
	readonly proofOfDelivery?: ProofOfDelivery;
}

/**
 * Current package status.
 */
export interface PackageStatus {
	readonly type: TrackingStatusType;
	readonly code: string;
	readonly description: string;
	readonly simplifiedTextDescription?: string;
}

/**
 * A single activity/scan event in tracking history.
 */
export interface TrackingActivity {
	readonly date: string;
	readonly time: string;
	readonly location: ActivityLocation;
	readonly status: PackageStatus;
	readonly gmtDate?: string;
	readonly gmtTime?: string;
	readonly gmtOffset?: string;
}

/**
 * Location information for a tracking activity.
 */
export interface ActivityLocation {
	readonly city?: string;
	readonly stateProvince?: string;
	readonly postalCode?: string;
	readonly country?: string;
	readonly countryCode?: string;
	readonly description?: string;
}

/**
 * Delivery date information.
 */
export interface DeliveryDate {
	readonly type: 'SDD' | 'RDD' | 'DEL';
	readonly date: string;
}

/**
 * Delivery time information.
 */
export interface DeliveryTime {
	readonly startTime?: string;
	readonly endTime?: string;
	readonly type?: string;
}

/**
 * Package weight from tracking.
 */
export interface TrackingWeight {
	readonly weight: string;
	readonly unitOfMeasurement: string;
}

/**
 * Service information from tracking.
 */
export interface TrackingService {
	readonly code: string;
	readonly description: string;
}

/**
 * Milestone information (detailed journey steps).
 */
export interface Milestone {
	readonly category: string;
	readonly code: string;
	readonly current: boolean;
	readonly description: string;
	readonly linkedActivity?: string;
	readonly state?: string;
	readonly subMilestone?: {
		readonly category: string;
	};
}

/**
 * Signature information.
 */
export interface SignatureInfo {
	readonly image?: string;
	readonly signedBy?: string;
}

/**
 * Proof of delivery information.
 */
export interface ProofOfDelivery {
	readonly image?: string;
	readonly signedBy?: string;
	readonly deliveredTo?: string;
	readonly leftAt?: string;
}

// ─── Legacy Simple Types (backward compat) ───────────────────────────────────

/**
 * Simplified tracking result (flattened from raw API response).
 */
export interface TrackingResult {
	readonly trackingNumber: string;
	readonly status: string;
	readonly statusType: TrackingStatusType;
	readonly statusDescription: string;
	readonly deliveryDate?: string;
	readonly deliveryTime?: string;
	readonly signedBy?: string;
	readonly weight?: string;
	readonly service?: string;
	readonly activities: readonly SimpleTrackingActivity[];
}

/**
 * Simplified activity event.
 */
export interface SimpleTrackingActivity {
	readonly date: string;
	readonly time: string;
	readonly location: string;
	readonly status: string;
	readonly description: string;
}
