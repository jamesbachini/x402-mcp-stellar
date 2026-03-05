# Repository Guidelines

## Project Structure & Module Organization
- `src/index.ts`: MCP stdio server entrypoint, tool registration, env loading, and x402 payment wiring.
- `src/stellar/`: vendored Stellar payment implementation (signer, constants, shared types, utilities).
- `src/stellar/exact/{client,server,facilitator}/`: exact scheme protocol logic and adapters.
- Root config/files: `package.json`, `tsconfig.json`, `.env.example`, `README.md`.
- Keep new features in `src/`; place Stellar-specific logic alongside existing `src/stellar/*` modules.

## Build, Test, and Development Commands
- `npm install`: install dependencies (requires Node.js 20+).
- `npm run dev`: run the MCP server with `tsx` for local development.
- `npm run start`: run the server in a production-like mode with source maps.
- `npm run build`: TypeScript type-check only (`tsc --noEmit`); run this before opening a PR.

## Coding Style & Naming Conventions
- Language: TypeScript (ES modules) with `strict` compiler settings.
- Formatting in current codebase: 2-space indentation, semicolons, double quotes.
- File/module naming: lowercase, descriptive names (for example `signer.ts`, `constants.ts`).
- Prefer explicit, descriptive function names (for example `getRequiredEnv`, `tryParseBody`) and clear types on exported APIs.

## Testing Guidelines
- No dedicated test runner is configured yet; `npm run build` is the minimum validation gate.
- For behavior changes, include manual verification steps:
  1. Copy `.env.example` to `.env` and set wallet values.
  2. Start facilitator and x402-protected resource server.
  3. Run `npm run dev` and exercise `fetch_paid_resource`.
- If you add tests, use `*.test.ts` naming and colocate with modules or under `src/__tests__/`.

## Commit & Pull Request Guidelines
- Use concise, imperative commit subjects, consistent with history (for example `resource agnostic`, `Update README.md`).
- Keep commit subjects focused and under ~72 characters.
- PRs should include: purpose, key changes, config/env impact, and verification commands/results.
- Link related issues and include request/response examples when MCP tool behavior changes.

## Security & Configuration Tips
- Never commit secrets (especially `STELLAR_SECRET_KEY`); keep them in local `.env`.
- When adding environment variables, update both `.env.example` and `README.md`.
