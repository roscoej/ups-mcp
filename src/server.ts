import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { UPSHttpClient } from './client/index.js';
import {
	addAddressTools,
	addLocatorTools,
	addPickupTools,
	addRatingTools,
	addShippingTools,
	addTrackingTools,
} from './tools/index.js';
import type { ServerConfig } from './types/index.js';

/**
 * Creates and configures the MCP server with all UPS tools registered.
 */
export function createServer(config: ServerConfig): McpServer {
	const server = new McpServer({
		name: 'ups-mcp',
		version: '0.1.0',
	});

	const client = new UPSHttpClient(config.ups);

	addTrackingTools(server, client);
	addAddressTools(server, client);
	addShippingTools(server, client);
	addRatingTools(server, client);
	addPickupTools(server, client);
	addLocatorTools(server, client);

	return server;
}
