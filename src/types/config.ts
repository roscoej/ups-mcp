/**
 * Environment the UPS API client should target.
 * - `production` — Live UPS systems (onlinetools.ups.com)
 * - `sandbox` — Customer Integration Environment for testing (wwwcie.ups.com)
 */
export type UPSEnvironment = 'production' | 'sandbox';

/**
 * Configuration required to authenticate with UPS APIs.
 */
export interface UPSConfig {
	readonly clientId: string;
	readonly clientSecret: string;
	readonly environment: UPSEnvironment;
	readonly accountNumber?: string;
}

/**
 * Transport mode for the MCP server.
 */
export type TransportMode = 'stdio' | 'http';

/**
 * Resolved server configuration after parsing CLI args and environment.
 */
export interface ServerConfig {
	readonly ups: UPSConfig;
	readonly transport: TransportMode;
	readonly port: number;
}
