import type { UPSConfig } from '../types/index.js';
import { TokenManager } from './auth.js';
import { UPSError, classifyHttpError } from './errors.js';

const DEFAULT_TIMEOUT_MS = 30_000;

interface RequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	body?: unknown;
	params?: Record<string, string>;
	headers?: Record<string, string>;
	timeout?: number;
}

/**
 * Low-level HTTP client for the UPS REST API.
 *
 * Handles authentication, request signing, error classification,
 * and automatic token refresh on 401 responses.
 */
export class UPSHttpClient {
	private readonly tokenManager: TokenManager;
	private readonly accountNumber?: string;

	constructor(config: UPSConfig) {
		this.tokenManager = new TokenManager(config);
		this.accountNumber = config.accountNumber;
	}

	async get<T>(path: string, params?: Record<string, string>): Promise<T> {
		return this.request<T>({ method: 'GET', path, params });
	}

	async post<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>({ method: 'POST', path, body });
	}

	async put<T>(path: string, body?: unknown): Promise<T> {
		return this.request<T>({ method: 'PUT', path, body });
	}

	async delete<T>(path: string): Promise<T> {
		return this.request<T>({ method: 'DELETE', path });
	}

	getAccountNumber(): string | undefined {
		return this.accountNumber;
	}

	private async request<T>(options: RequestOptions, isRetry = false): Promise<T> {
		const token = await this.tokenManager.getToken();
		const baseUrl = this.tokenManager.getBaseUrl();

		let url = `${baseUrl}${options.path}`;
		if (options.params) {
			const search = new URLSearchParams(options.params);
			url += `?${search.toString()}`;
		}

		const transId = `mcp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

		const headers: Record<string, string> = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			transId,
			transactionSrc: 'ups-mcp',
			...options.headers,
		};

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), options.timeout ?? DEFAULT_TIMEOUT_MS);

		try {
			const response = await fetch(url, {
				method: options.method,
				headers,
				body: options.body ? JSON.stringify(options.body) : undefined,
				signal: controller.signal,
			});

			if (response.status === 401 && !isRetry) {
				this.tokenManager.invalidate();
				return this.request<T>(options, true);
			}

			if (!response.ok) {
				const body = await response.text();
				throw classifyHttpError(response.status, body);
			}

			return (await response.json()) as T;
		} catch (error) {
			if (error instanceof UPSError) throw error;

			if (error instanceof Error && error.name === 'AbortError') {
				throw new UPSError('TIMEOUT_ERROR', 'Request timed out', { cause: error });
			}

			throw new UPSError('NETWORK_ERROR', String(error), { cause: error });
		} finally {
			clearTimeout(timeout);
		}
	}
}
