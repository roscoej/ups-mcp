# UPS MCP Server

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/MCP-compatible-8A2BE2)](https://modelcontextprotocol.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![npm](https://img.shields.io/npm/v/ups-mcp)](https://www.npmjs.com/package/ups-mcp)

A [Model Context Protocol](https://modelcontextprotocol.io) server for UPS shipping and logistics APIs. Enables AI agents to create shipments, track packages, get rates, validate addresses, schedule pickups, and find UPS locations.

### Install in your IDE

[![Install in Cursor](https://img.shields.io/badge/Cursor-Install-0098FF?logo=cursor&logoColor=white)](cursor://anysphere.cursor-deeplink/mcp/install?name=ups&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22ups-mcp%22%5D%2C%22env%22%3A%7B%22UPS_CLIENT_ID%22%3A%22your_client_id%22%2C%22UPS_CLIENT_SECRET%22%3A%22your_client_secret%22%2C%22UPS_ACCOUNT_NUMBER%22%3A%22123456%22%2C%22UPS_ENVIRONMENT%22%3A%22sandbox%22%7D%7D)
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=ups&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22ups-mcp%22%5D%2C%22env%22%3A%7B%22UPS_CLIENT_ID%22%3A%22your_client_id%22%2C%22UPS_CLIENT_SECRET%22%3A%22your_client_secret%22%2C%22UPS_ACCOUNT_NUMBER%22%3A%22123456%22%2C%22UPS_ENVIRONMENT%22%3A%22sandbox%22%7D%7D)

> After installing, update the environment variables with your [UPS Developer Portal](https://developer.ups.com/get-started) credentials.

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

## Disclaimer

This project is an **independent, unofficial, third-party tool**. It is not affiliated with, endorsed by, sponsored by, or in any way officially connected to United Parcel Service, Inc. (UPS) or any of its subsidiaries.

"UPS" and the UPS brandmark are registered trademarks of United Parcel Service of America, Inc. All other trademarks are property of their respective owners. Use of these names is for identification and interoperability purposes only and does not imply endorsement.

This software is provided "AS IS", without warranty of any kind. You are solely responsible for:

- Complying with the [UPS Technology Agreement](https://developer.ups.com) and all applicable UPS terms of service, rate limits, and acceptable-use policies.
- Securing your API credentials and UPS account.
- All activity conducted through your UPS account via this tool.
- Compliance with all applicable laws and regulations in your jurisdiction.

The authors and contributors accept no liability for damages arising from the use of this software or the UPS APIs accessed through it.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT
