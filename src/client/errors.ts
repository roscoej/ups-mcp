export type UPSErrorCode =
	| 'AUTHENTICATION_ERROR'
	| 'RATE_LIMIT_ERROR'
	| 'VALIDATION_ERROR'
	| 'NOT_FOUND_ERROR'
	| 'NETWORK_ERROR'
	| 'TIMEOUT_ERROR'
	| 'SERVER_ERROR'
	| 'UNKNOWN_ERROR';

/**
 * Structured error from the UPS API with actionable context.
 */
export class UPSError extends Error {
	readonly code: UPSErrorCode;
	readonly statusCode?: number;
	readonly upstream?: unknown;

	constructor(
		code: UPSErrorCode,
		message: string,
		options?: { statusCode?: number; cause?: unknown },
	) {
		super(message);
		this.name = 'UPSError';
		this.code = code;
		this.statusCode = options?.statusCode;
		this.upstream = options?.cause;
	}

	/**
	 * Human-readable string for logging.
	 */
	toLogString(): string {
		const parts = [`[${this.code}] ${this.message}`];
		if (this.statusCode) parts.push(`HTTP ${this.statusCode}`);
		return parts.join(' | ');
	}
}

/**
 * Maps HTTP status codes to error codes.
 */
export function classifyHttpError(status: number, body?: string): UPSError {
	let message = body ?? `HTTP ${status}`;

	try {
		const parsed = JSON.parse(body ?? '{}');
		const errors = parsed?.response?.errors;
		if (Array.isArray(errors) && errors.length > 0) {
			message = errors.map((e: { message?: string }) => e.message).join('; ');
		}
	} catch {
		// Body isn't JSON, use raw string
	}

	switch (true) {
		case status === 401:
			return new UPSError('AUTHENTICATION_ERROR', message, { statusCode: status });
		case status === 403:
			return new UPSError('AUTHENTICATION_ERROR', message, { statusCode: status });
		case status === 404:
			return new UPSError('NOT_FOUND_ERROR', message, { statusCode: status });
		case status === 429:
			return new UPSError('RATE_LIMIT_ERROR', message, { statusCode: status });
		case status === 400 || status === 422:
			return new UPSError('VALIDATION_ERROR', message, { statusCode: status });
		case status >= 500:
			return new UPSError('SERVER_ERROR', message, { statusCode: status });
		default:
			return new UPSError('UNKNOWN_ERROR', message, { statusCode: status });
	}
}
