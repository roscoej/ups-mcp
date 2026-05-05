# UPS MCP Server

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)

A [Model Context Protocol](https://modelcontextprotocol.io) server for UPS shipping and logistics APIs. Enables AI agents to create shipments, track packages, get rates, validate addresses, schedule pickups, and find UPS locations.

## Tools

| Tool | Description |
|------|-------------|
| `create_shipment` | Create a shipment and generate a shipping label |
| `void_shipment` | Cancel a shipment and void its label |
| `track_package` | Track a package with full activity history |
| `get_rates` | Get shipping rates for all available services |
| `get_time_in_transit` | Get estimated delivery dates |
| `validate_address` | Validate US/PR addresses |
| `schedule_pickup` | Schedule a package pickup |
| `cancel_pickup` | Cancel a scheduled pickup |
| `find_locations` | Find nearby UPS stores and drop-off points |

## Prerequisites

- Node.js 20+
- UPS Developer Portal credentials ([Get started](https://developer.ups.com/get-started))
- UPS account number (for shipping and rating)

## Installation

```bash
npx ups-mcp
```

Or install globally:

```bash
npm install -g ups-mcp
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `UPS_CLIENT_ID` | Yes | OAuth Client ID from UPS Developer Portal |
| `UPS_CLIENT_SECRET` | Yes | OAuth Client Secret |
| `UPS_ENVIRONMENT` | No | `sandbox` (default) or `production` |
| `UPS_ACCOUNT_NUMBER` | No | 6-digit UPS account (required for shipping/rating) |

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "ups": {
      "command": "npx",
      "args": ["ups-mcp"],
      "env": {
        "UPS_CLIENT_ID": "your_client_id",
        "UPS_CLIENT_SECRET": "your_client_secret",
        "UPS_ACCOUNT_NUMBER": "123456",
        "UPS_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ups": {
      "command": "npx",
      "args": ["ups-mcp"],
      "env": {
        "UPS_CLIENT_ID": "your_client_id",
        "UPS_CLIENT_SECRET": "your_client_secret",
        "UPS_ACCOUNT_NUMBER": "123456",
        "UPS_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

## Usage Examples

### Create a Shipment

> "Ship a 5lb package from 123 Main St, Atlanta GA 30301 to 456 Oak Ave, Los Angeles CA 90001 via UPS Ground"

### Get Rates

> "What are the shipping rates for a 10lb package from NYC to Chicago?"

### Track a Package

> "Track package 1Z999AA10123456784"

### Validate an Address

> "Is 1600 Pennsylvania Ave NW, Washington DC 20500 a valid address?"

### Schedule a Pickup

> "Schedule a pickup tomorrow at 9am for 3 packages at our warehouse"

## Development

```bash
git clone https://github.com/roscoej/ups-mcp.git
cd ups-mcp
npm install
npm run build
```

### Testing with MCP Inspector

```bash
npm run inspector
```

### Running locally

```bash
cp .env.example .env
# Edit .env with your credentials
npm run build
node dist/index.js
```

## Architecture

```
src/
├── index.ts            # Entry point (stdio transport)
├── config.ts           # Environment variable resolution
├── server.ts           # MCP server factory
├── client/
│   ├── auth.ts         # OAuth 2.0 token manager
│   ├── http.ts         # HTTP client with retry + error handling
│   └── errors.ts       # Structured error types
├── tools/
│   ├── tracking.ts     # track_package
│   ├── shipping.ts     # create_shipment, void_shipment
│   ├── rating.ts       # get_rates, get_time_in_transit
│   ├── address.ts      # validate_address
│   ├── pickup.ts       # schedule_pickup, cancel_pickup
│   ├── locator.ts      # find_locations
│   ├── builders.ts     # Shared request payload builders
│   ├── constants.ts    # UPS API codes and enumerations
│   └── schemas.ts      # Zod input schemas
└── types/
    ├── config.ts       # Server configuration
    ├── shipping.ts     # Shipment types + service codes
    ├── tracking.ts     # Tracking types
    ├── rating.ts       # Rating types
    ├── address.ts      # Address validation types
    └── pickup.ts       # Pickup types
```

## Security

Your API credentials are sensitive. Never commit them to version control. Use environment variables or a secrets manager.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
