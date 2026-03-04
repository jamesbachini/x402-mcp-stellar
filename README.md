# x402 Stellar MCP Server

Local MCP server (stdio) that can call x402-protected HTTP resources and automatically pay in Stellar USDC.

## Features

- Stellar-only payment flow (`stellar:testnet` or `stellar:pubnet`)
- Default testnet configuration
- Mainnet-ready via env switch
- No resource whitelist: URL is provided at tool call time

## Tools Exposed

- `x402_wallet_info`: shows active wallet address/network/config
- `fetch_paid_resource`: generic paid fetch (`url`, `method`, optional body/headers)

## Prerequisites

- Node.js 20+
- A Stellar wallet funded with testnet XLM + testnet USDC
- x402 resource server running (your `app/index.js` demo)
- x402 facilitator running on `http://localhost:4022`

## Setup

```bash
npm install
cp .env.example .env
```

Update `.env` with your wallet key:

```dotenv
STELLAR_SECRET_KEY=S...
STELLAR_NETWORK=stellar:testnet
```

For mainnet later:

```dotenv
STELLAR_NETWORK=stellar:pubnet
STELLAR_RPC_URL=https://<your-soroban-mainnet-rpc>
```

## Run

```bash
npm run dev
```

The MCP server runs over stdio for Claude/Codex integrations.

## Add To Claude Desktop / Codex

Use an MCP entry like (don't forget to change the path/):

### Codex

```bash
codex mcp add x402-stellar -- npm --silent --prefix /absolute/path/to/x402-mcp-stellar run dev
```

### Claude Code
```bash
claude mcp add x402-stellar -- npm --silent --prefix /absolute/path/to/x402-mcp-stellar run dev
```

### Claude Desktop

```json
{
  "mcpServers": {
    "x402-stellar": {
      "command": "npm",
      "args": ["--silent", "--prefix", "/absolute/path/to/x402-mcp-stellar", "run", "dev"]
    }
  }
}
```

This server loads `.env` from the project directory (`/absolute/path/to/x402-mcp-stellar/.env`), so keep wallet secrets there instead of in MCP JSON config.

## Claude Usage

After loading the MCP server, you can ask:

`Can you fetch the resource at http://localhost:3000/my-service, use the x402-stellar MCP server to pay for it, and print the response?`

The tool call will pass that full URL at runtime; no URL allowlist or hardcoded endpoint is required in this MCP server.

## Notes

- `@x402/stellar` is not currently published on npm, so this repo vendors the Stellar mechanism under `src/stellar`.
- Default testnet Soroban RPC is used automatically.
- Mainnet requires `STELLAR_RPC_URL`.
