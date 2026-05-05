#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { resolveConfig } from './config.js';
import { createServer } from './server.js';

const config = resolveConfig(process.env);
const server = createServer(config);

async function main(): Promise<void> {
	if (config.transport === 'stdio') {
		const transport = new StdioServerTransport();
		await server.connect(transport);
	} else {
		console.error('HTTP transport not yet implemented. Use stdio.');
		process.exit(1);
	}
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

main().catch((error) => {
	console.error('Fatal:', error instanceof Error ? error.message : error);
	process.exit(1);
});
