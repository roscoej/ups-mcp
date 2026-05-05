import type { ServerConfig, TransportMode, UPSEnvironment } from './types/index.js';

/**
 * Resolves server configuration from environment variables.
 *
 * Required:
 *   - UPS_CLIENT_ID
 *   - UPS_CLIENT_SECRET
 *
 * Optional:
 *   - UPS_ENVIRONMENT (production | sandbox, default: sandbox)
 *   - UPS_ACCOUNT_NUMBER (required for shipping/rating)
 *   - TRANSPORT (stdio | http, default: stdio)
 *   - PORT (default: 3100)
 */
export function resolveConfig(env: NodeJS.ProcessEnv): ServerConfig {
	const clientId = env.UPS_CLIENT_ID;
	const clientSecret = env.UPS_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		console.error(
			'Missing required environment variables: UPS_CLIENT_ID and UPS_CLIENT_SECRET\n' +
				'Get your credentials at https://developer.ups.com',
		);
		process.exit(1);
	}

	const environment = (env.UPS_ENVIRONMENT ?? 'sandbox') as UPSEnvironment;
	if (environment !== 'production' && environment !== 'sandbox') {
		console.error('UPS_ENVIRONMENT must be "production" or "sandbox"');
		process.exit(1);
	}

	const transport = (env.TRANSPORT ?? 'stdio') as TransportMode;
	if (transport !== 'stdio' && transport !== 'http') {
		console.error('TRANSPORT must be "stdio" or "http"');
		process.exit(1);
	}

	return {
		ups: {
			clientId,
			clientSecret,
			environment,
			accountNumber: env.UPS_ACCOUNT_NUMBER,
		},
		transport,
		port: Number.parseInt(env.PORT ?? '3100', 10),
	};
}
