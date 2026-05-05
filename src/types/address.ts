import type { ADDRESS_CLASSIFICATION, ADDRESS_VALIDATION_OPTIONS } from '../tools/constants.js';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AddressClassificationType =
	(typeof ADDRESS_CLASSIFICATION)[keyof typeof ADDRESS_CLASSIFICATION];
export type AddressValidationOption =
	(typeof ADDRESS_VALIDATION_OPTIONS)[keyof typeof ADDRESS_VALIDATION_OPTIONS];

// ─── Parameters ──────────────────────────────────────────────────────────────

/**
 * Parameters for validating a US or Puerto Rico address.
 */
export interface ValidateAddressParams {
	readonly addressLine1: string;
	readonly addressLine2?: string;
	readonly addressLine3?: string;
	readonly city: string;
	readonly stateProvinceCode: string;
	readonly postalCode: string;
	readonly postalCodeExtended?: string;
	readonly countryCode: string;
	readonly urbanization?: string;
	readonly validationOption?: AddressValidationOption;
}

// ─── Response Types ──────────────────────────────────────────────────────────

/**
 * Full address validation API response.
 */
export interface AddressValidationResponse {
	readonly XAVResponse: {
		readonly Response: {
			readonly ResponseStatus: { readonly Code: string; readonly Description: string };
		};
		readonly ValidAddressIndicator?: string;
		readonly AmbiguousAddressIndicator?: string;
		readonly NoCandidatesIndicator?: string;
		readonly AddressClassification?: {
			readonly Code: AddressClassificationType;
			readonly Description: string;
		};
		readonly Candidate?: readonly AddressCandidateRaw[];
	};
}

/**
 * Raw candidate format from UPS API.
 */
export interface AddressCandidateRaw {
	readonly AddressClassification?: {
		readonly Code: string;
		readonly Description: string;
	};
	readonly AddressKeyFormat: {
		readonly AddressLine?: readonly string[];
		readonly PoliticalDivision2?: string;
		readonly PoliticalDivision1?: string;
		readonly PostcodePrimaryLow?: string;
		readonly PostcodeExtendedLow?: string;
		readonly Region?: string;
		readonly CountryCode?: string;
	};
}

// ─── Simplified Types ────────────────────────────────────────────────────────

/**
 * A candidate address suggestion from validation (simplified).
 */
export interface AddressCandidate {
	readonly addressLine1: string;
	readonly addressLine2?: string;
	readonly city: string;
	readonly stateProvinceCode: string;
	readonly postalCode: string;
	readonly postalCodeExtended?: string;
	readonly countryCode: string;
	readonly classification: 'commercial' | 'residential' | 'unknown';
}

/**
 * Simplified address validation result.
 */
export interface AddressValidationResult {
	readonly valid: boolean;
	readonly ambiguous: boolean;
	readonly noCandidates: boolean;
	readonly classification?: 'commercial' | 'residential' | 'unknown';
	readonly candidates: readonly AddressCandidate[];
}
