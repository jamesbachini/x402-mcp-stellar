# x402 Stellar MCP Server

Local MCP server (stdio) that can call x402-protected HTTP resources and automatically pay in Stellar USDC.

This server is designed for your current setup:

- protected resource: `http://localhost:3000/my-service`
- facilitator: `http://localhost:4022`
- paying wallet: local Stellar secret key (`STELLAR_SECRET_KEY`)

## Features

- Stellar-only payment flow (`stellar:testnet` or `stellar:pubnet`)
- Default testnet configuration
- Mainnet-ready via env switch
- MCP tools for wallet info and protected resource fetching

## Tools Exposed

- `x402_wallet_info`: shows active wallet address/network/config
- `get_my_service`: calls configured `ENDPOINT_PATH` on `RESOURCE_SERVER_URL`
- `fetch_paid_resource`: generic paid fetch tool (`path`, `method`, optional body/headers)

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
RESOURCE_SERVER_URL=http://localhost:3000
ENDPOINT_PATH=/my-service
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

Use an MCP entry like:

```json
{
  "mcpServers": {
    "x402-stellar": {
      "command": "npm",
      "args": ["--prefix", "/absolute/path/to/x402-mcp-stellar", "run", "dev"],
      "env": {
        "STELLAR_SECRET_KEY": "S...",
        "STELLAR_NETWORK": "stellar:testnet",
        "RESOURCE_SERVER_URL": "http://localhost:3000",
        "ENDPOINT_PATH": "/my-service"
      }
    }
  }
}
```

## Notes

- `@x402/stellar` is not currently published on npm, so this repo vendors the Stellar mechanism under `src/stellar`.
- Default testnet Soroban RPC is used automatically.
- Mainnet requires `STELLAR_RPC_URL`.
