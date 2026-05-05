import type { UPSConfig } from '../types/index.js';
import { UPSError } from './errors.js';

interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: string;
	issued_at: string;
}

interface CachedToken {
	accessToken: string;
	expiresAt: number;
}

const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry

/**
 * Manages OAuth 2.0 client credentials tokens with automatic caching and refresh.
 *
 * Tokens are cached in memory and transparently refreshed before expiry.
 * The 5-minute buffer ensures we never make API calls with a nearly-expired token.
 */
export class TokenManager {
	private cached: CachedToken | null = null;
	private pending: Promise<string> | null = null;
	private readonly baseUrl: string;
	private readonly credentials: string;

	constructor(config: UPSConfig) {
		this.baseUrl =
			config.environment === 'production'
				? 'https://onlinetools.ups.com'
				: 'https://wwwcie.ups.com';

		this.credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
	}

	/**
	 * Returns a valid access token, fetching or refreshing as needed.
	 * Coalesces concurrent requests to avoid redundant token fetches.
	 */
	async getToken(): Promise<string> {
		if (this.cached && Date.now() < this.cached.expiresAt) {
			return this.cached.accessToken;
		}

		if (this.pending) {
			return this.pending;
		}

		this.pending = this.fetchToken();
		try {
			return await this.pending;
		} finally {
			this.pending = null;
		}
	}

	/**
	 * Returns the base URL for API calls based on configured environment.
	 */
	getBaseUrl(): string {
		return this.baseUrl;
	}

	/**
	 * Invalidates the cached token, forcing a fresh fetch on next call.
	 */
	invalidate(): void {
		this.cached = null;
	}

	private async fetchToken(): Promise<string> {
		const url = `${this.baseUrl}/security/v1/oauth/token`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${this.credentials}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'grant_type=client_credentials',
		});

		if (!response.ok) {
			const body = await response.text();
			throw new UPSError('AUTHENTICATION_ERROR', `Token request failed: ${body}`, {
				statusCode: response.status,
			});
		}

		const data = (await response.json()) as TokenResponse;

		const expiresInMs = Number.parseInt(data.expires_in, 10) * 1000;
		this.cached = {
			accessToken: data.access_token,
			expiresAt: Date.now() + expiresInMs - TOKEN_REFRESH_BUFFER_MS,
		};

		return data.access_token;
	}
}
