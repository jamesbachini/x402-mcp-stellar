import { config as loadEnv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { wrapFetchWithPayment, x402Client, x402HTTPClient } from "@x402/fetch";
import { z } from "zod";

import { STELLAR_PUBNET_CAIP2, STELLAR_TESTNET_CAIP2 } from "./stellar/constants.js";
import { ExactStellarScheme } from "./stellar/exact/client/scheme.js";
import { createEd25519Signer } from "./stellar/signer.js";

type StellarNetwork = typeof STELLAR_TESTNET_CAIP2 | typeof STELLAR_PUBNET_CAIP2;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const projectEnvPath = resolve(currentDir, "..", ".env");
loadEnv({ path: projectEnvPath });

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getStellarNetwork(): StellarNetwork {
  const network = (process.env.STELLAR_NETWORK ?? STELLAR_TESTNET_CAIP2).trim();
  if (network === STELLAR_TESTNET_CAIP2 || network === STELLAR_PUBNET_CAIP2) {
    return network;
  }
  throw new Error(
    `Unsupported STELLAR_NETWORK: ${network}. Use ${STELLAR_TESTNET_CAIP2} or ${STELLAR_PUBNET_CAIP2}.`,
  );
}

function tryParseBody(rawBody: string, contentType: string | null): unknown {
  if (!rawBody) return "";

  const looksLikeJson = contentType?.toLowerCase().includes("application/json") ?? false;
  if (!looksLikeJson) {
    return rawBody;
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    return rawBody;
  }
}

async function main(): Promise<void> {
  const network = getStellarNetwork();
  const secretKey = getRequiredEnv("STELLAR_SECRET_KEY");
  const rpcUrl = process.env.STELLAR_RPC_URL?.trim() || undefined;

  if (network === STELLAR_PUBNET_CAIP2 && !rpcUrl) {
    throw new Error(
      "STELLAR_RPC_URL is required when STELLAR_NETWORK=stellar:pubnet. Testnet works without it.",
    );
  }

  const signer = createEd25519Signer(secretKey, network);
  const paymentClient = new x402Client().register(
    "stellar:*",
    new ExactStellarScheme(signer, rpcUrl ? { url: rpcUrl } : undefined),
  );

  const httpClient = new x402HTTPClient(paymentClient);
  const fetchWithPayment = wrapFetchWithPayment(fetch, httpClient);

  const server = new McpServer({
    name: process.env.MCP_SERVER_NAME || "x402-stellar-resource-client",
    version: process.env.MCP_SERVER_VERSION || "1.0.0",
  });

  server.tool("x402_wallet_info", "Show Stellar wallet and MCP client configuration", {}, async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            network,
            address: signer.address,
            rpcUrl: rpcUrl ?? (network === STELLAR_TESTNET_CAIP2 ? "https://soroban-testnet.stellar.org" : null),
          },
          null,
          2,
        ),
      },
    ],
  }));

  server.tool(
    "fetch_paid_resource",
    "Fetch any x402-protected URL and automatically pay with Stellar USDC when required",
    {
      url: z
        .string()
        .url()
        .describe("Full URL to fetch, for example http://localhost:3000/my-service"),
      method: z.enum(["GET", "POST"]).default("GET").describe("HTTP method"),
      body: z.string().optional().describe("Optional raw body for POST requests"),
      headers: z
        .record(z.string())
        .optional()
        .describe("Optional additional HTTP headers"),
    },
    async ({ url, method, body, headers }) => {
      const requestHeaders = new Headers(headers ?? {});
      const requestInit: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (body && method === "POST") {
        requestInit.body = body;
        if (!requestHeaders.has("content-type")) {
          requestHeaders.set("content-type", "application/json");
        }
      }

      const response = await fetchWithPayment(url, requestInit);
      const rawBody = await response.text();
      const parsedBody = tryParseBody(rawBody, response.headers.get("content-type"));

      let paymentReceipt: unknown = null;
      try {
        paymentReceipt = httpClient.getPaymentSettleResponse(headerName =>
          response.headers.get(headerName),
        );
      } catch {
        paymentReceipt = null;
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                url,
                method,
                status: response.status,
                ok: response.ok,
                paymentMade: paymentReceipt !== null,
                paymentReceipt,
                response: parsedBody,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("x402 Stellar MCP server running over stdio");
  console.error(`wallet: ${signer.address}`);
  console.error(`network: ${network}`);
}

main().catch(error => {
  console.error("Fatal error starting MCP server:", error);
  process.exit(1);
});
