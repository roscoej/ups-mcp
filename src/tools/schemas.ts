import { z } from 'zod';

/**
 * Full address schema for shipping operations (create shipment, pickup).
 */
export const fullAddressSchema = z.object({
	name: z.string().describe('Full name of the contact'),
	attentionName: z.string().optional().describe('Attention / care-of name'),
	phone: z.string().optional().describe('Phone number with country code'),
	addressLine1: z.string().describe('Street address line 1'),
	addressLine2: z.string().optional().describe('Address line 2'),
	addressLine3: z.string().optional().describe('Address line 3'),
	city: z.string().describe('City name'),
	stateProvinceCode: z.string().describe('State/province code (e.g. "CA")'),
	postalCode: z.string().describe('Postal/ZIP code'),
	countryCode: z.string().length(2).describe('Two-letter country code (e.g. "US")'),
});

/**
 * Minimal address schema for rating operations (only location needed).
 */
export const ratingAddressSchema = z.object({
	city: z.string().describe('City name'),
	stateProvinceCode: z.string().describe('State/province code'),
	postalCode: z.string().describe('Postal/ZIP code'),
	countryCode: z.string().length(2).default('US').describe('Two-letter country code'),
});

/**
 * Package schema for shipping operations (full details).
 */
export const shippingPackageSchema = z.object({
	weight: z.number().positive().describe('Package weight in lbs'),
	length: z.number().positive().optional().describe('Length in inches'),
	width: z.number().positive().optional().describe('Width in inches'),
	height: z.number().positive().optional().describe('Height in inches'),
	description: z.string().optional().describe('Package contents description'),
	packaging: z
		.enum(['02', '01', '03', '04', '21', '24', '25', '2a', '2b', '2c'])
		.default('02')
		.describe('Packaging type: 02=Customer Supplied, 01=Letter, 03=Tube, 04=Pak, 21=Express Box'),
	insuredValue: z.number().optional().describe('Declared value for insurance (USD)'),
});

/**
 * Package schema for rating operations (weight + optional dimensions).
 */
export const ratingPackageSchema = z.object({
	weight: z.number().positive().describe('Package weight in lbs'),
	length: z.number().positive().optional().describe('Length in inches'),
	width: z.number().positive().optional().describe('Width in inches'),
	height: z.number().positive().optional().describe('Height in inches'),
	packaging: z.string().default('02').describe('Packaging type code (02=Customer Supplied)'),
});

/**
 * Inferred types from schemas.
 */
export type FullAddress = z.infer<typeof fullAddressSchema>;
export type RatingAddress = z.infer<typeof ratingAddressSchema>;
