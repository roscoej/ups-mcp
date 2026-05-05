# Contributing to UPS MCP Server

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository and clone your fork:

```bash
git clone https://github.com/<your-username>/ups-mcp.git
cd ups-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Copy the example environment file and fill in your UPS Developer Portal credentials:

```bash
cp .env.example .env
```

4. Build and run:

```bash
npm run build
node dist/index.js
```

## Development Workflow

```bash
npm run dev          # Watch mode (rebuilds on file changes)
npm run build        # One-off production build
npm run lint         # Check for lint errors
npm run lint:fix     # Auto-fix lint errors
npm run test         # Run tests
npm run inspector    # Launch the MCP Inspector for interactive testing
```

### Code Style

This project uses [Biome](https://biomejs.dev) for linting and formatting. The config lives in `biome.json`. Key settings:

- Tabs for indentation
- Single quotes
- Semicolons required
- 100-character line width

Run `npm run lint:fix` before committing to auto-format.

## Project Structure

- **`src/client/`** — OAuth token management, HTTP client, error types
- **`src/tools/`** — One file per MCP tool group (tracking, shipping, rating, etc.)
- **`src/tools/constants.ts`** — All UPS API codes and enumerations
- **`src/tools/schemas.ts`** — Zod input schemas shared across tools
- **`src/tools/builders.ts`** — Shared request payload builder functions
- **`src/types/`** — TypeScript type definitions for API responses

## Adding a New Tool

1. Create a new file in `src/tools/` (e.g. `src/tools/paperless.ts`).
2. Export an `addXxxTools(server, client)` function that registers tools via `server.registerTool()`.
3. Wire it up in `src/server.ts` by importing and calling the function.
4. Re-export from `src/tools/index.ts`.
5. Add any new constants to `src/tools/constants.ts` and input schemas to `src/tools/schemas.ts`.
6. Update the tool table in `README.md`.

## Submitting Changes

1. Create a branch for your work:

```bash
git checkout -b feat/my-feature
```

2. Make your changes and ensure everything builds and passes lint:

```bash
npm run build
npm run lint
```

3. Commit with a descriptive message:

```bash
git commit -m "feat: add paperless document upload tool"
```

4. Push your branch and open a pull request against `main`.

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org):

- `feat:` — new feature or tool
- `fix:` — bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `docs:` — documentation only
- `chore:` — dependency updates, CI changes, etc.

## Reporting Issues

Open a [GitHub issue](https://github.com/roscoej/ups-mcp/issues) with:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your Node.js version and OS

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
