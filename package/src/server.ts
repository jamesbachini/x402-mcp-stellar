import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { BlendService } from './services/blend.service.js';
import { StellarService } from './services/stellar.service.js';
import { PoolV1, PoolV2 } from '@blend-capital/blend-sdk';
import dotenv from 'dotenv';

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason, promise);
  process.exit(1);
});

dotenv.config();

/**
 * Custom replacer function for JSON.stringify to handle BigInts.
 * @param key The key being serialized.
 * @param value The value being serialized.
 * @returns The value, with BigInts converted to strings.
 */
function jsonReplacer(key: any, value: any) {
  return typeof value === 'bigint' ? value.toString() : value;
}

// 1. Create an MCP server instance
const server = new McpServer({
  name: 'blend-protocol-server',
  version: '2.0.0',
  title: 'Blend Protocol MCP',
  description: 'A server for interacting with the Blend DeFi Protocol on the Stellar network.',
});

const blendService = new BlendService();
const stellarService = new StellarService();

// 2. Register tools with explicit schemas

// --- READ-ONLY TOOLS ---

server.registerTool(
  'loadPoolData',
  {
    title: 'Load Blend Pool Data',
    description: "Loads comprehensive data for a given Blend pool. Can optionally include a specific user's position data.",
    inputSchema: {
      poolId: z.string().describe('The contract ID of the Blend pool to load.'),
      userAddress: z
        .string()
        .optional()
        .describe("(Optional) The public key of a user to load their specific data for the pool."),
    },
  },
  async ({ poolId, userAddress }: { poolId: string; userAddress?: string }) => {
    const meta = await blendService.loadPoolMeta(poolId);
    const pool = await blendService.loadPool(poolId, meta);
    let user;
    if (userAddress) {
      user = await blendService.loadPoolUser(pool, userAddress);
    }
    const oracle = await blendService.loadPoolOracle(pool);
    const backstop_pool = await blendService.loadBackstopPool(meta);
    const result = {
      pool: pool,
      user: user || 'Not requested',
      oracle: oracle,
      backstop_pool: backstop_pool,
    };
    return { content: [{ type: 'text', text: JSON.stringify(result, jsonReplacer, 2) }] };
  }
);

server.registerTool(
    "getTokenBalance",
    {
        title: "Get Token Balance",
        description: "Gets the balance of a specific token for a given user address.",
        inputSchema: {
            tokenId: z.string().describe("The asset ID (e.g., 'USDC' or a contract ID) or 'native' for XLM."),
            userAddress: z.string().describe("The public key of the user."),
        }
    },
    async ({ tokenId, userAddress }: { tokenId: string; userAddress: string }) => {
        const balance = await blendService.getTokenBalance(tokenId, userAddress);
        return { content: [{ type: 'text', text: `The balance is: ${balance.toString()}` }] };
    }
);

server.registerTool(
    "getFeeStats",
    {
        title: "Get Fee Stats",
        description: "Gets the current Soroban network fee statistics.",
        inputSchema: {},
    },
    async () => {
        const feeStats = await blendService.getFeeStats();
        return { content: [{ type: 'text', text: JSON.stringify(feeStats, jsonReplacer, 2) }] };
    }
);

server.registerTool(
  'getPoolEvents',
  {
    title: 'Get Pool Events',
    description: 'Gets historical events for a specific pool.',
    inputSchema: {
      poolId: z.string().describe('The contract ID of the pool.'),
      version: z.enum(['V1', 'V2']).describe('The version of the pool.'),
      startLedger: z.number().describe('The ledger number to start fetching events from.'),
    },
  },
  async ({ poolId, version, startLedger }: { poolId: string; version: 'V1' | 'V2'; startLedger: number }) => {
    const events = await blendService.getPoolEvents(poolId, version, startLedger);
    return { content: [{ type: 'text', text: JSON.stringify(events, jsonReplacer, 2) }] };
  }
);

server.registerTool(
  'loadBackstopData',
  {
    title: 'Load Backstop Data',
    description: 'Loads data for the main Blend backstop contract.',
    inputSchema: {
      version: z.enum(['V1', 'V2']).describe('The version of the backstop to load.'),
    },
  },
  async ({ version }: { version: 'V1' | 'V2' }) => {
    const backstopData = await blendService.loadBackstop(version);
    return { content: [{ type: 'text', text: JSON.stringify(backstopData, jsonReplacer, 2) }] };
  }
);

server.registerTool(
  'loadTokenMetadata',
  {
    title: 'Load Token Metadata',
    description: 'Loads the metadata for a given token/asset.',
    inputSchema: {
      assetId: z.string().describe('The contract ID of the asset.'),
    },
  },
  async ({ assetId }: { assetId: string }) => {
    const metadata = await blendService.loadTokenMetadata(assetId);
    return { content: [{ type: 'text', text: JSON.stringify(metadata, jsonReplacer, 2) }] };
  }
);

server.registerTool(
  'simulateOperation',
  {
    title: 'Simulate Operation',
    description: 'Simulates a transaction operation without submitting it to the network.',
    inputSchema: {
      operationXdr: z.string().describe('The base64-encoded XDR of the operation to simulate.'),
      userAddress: z.string().describe('The public key of the user address to use as the source for the simulation.'),
    },
  },
  async ({ operationXdr, userAddress }: { operationXdr: string; userAddress: string }) => {
    const simulationResult = await blendService.simulateOperation(operationXdr, userAddress);
    return { content: [{ type: 'text', text: JSON.stringify(simulationResult, jsonReplacer, 2) }] };
  }
);

// --- WRITE/TRANSACTION TOOLS ---

const transactionInputSchema = {
    userAddress: z.string().describe("The Stellar public key of the user performing the action."),
    amount: z.number().describe("The amount of the asset for the transaction."),
    asset: z.string().describe("The contract ID of the asset being used."),
    poolId: z.string().describe("The contract ID of the pool for the transaction."),
    privateKey: z.string().optional().describe("(Optional) The secret key of the user. If not provided, the server's AGENT_SECRET will be used."),
};

const transactionObjectSchema = z.object(transactionInputSchema);
type TransactionParams = z.infer<typeof transactionObjectSchema>;

server.registerTool('lend', {
    title: "Lend to Pool",
    description: "Submits a transaction to lend (supply collateral) to a pool.",
    inputSchema: transactionInputSchema,
}, async (params: TransactionParams) => {
    const txHash = await blendService.lend(params);
    return { content: [{ type: 'text', text: `Lend transaction submitted successfully. Hash: ${txHash}` }] };
});

server.registerTool('withdraw', {
    title: "Withdraw from Pool",
    description: "Submits a transaction to withdraw assets from a pool.",
    inputSchema: transactionInputSchema,
}, async (params: TransactionParams) => {
    const txHash = await blendService.withdraw(params);
    return { content: [{ type: 'text', text: `Withdraw transaction submitted successfully. Hash: ${txHash}` }] };
});

server.registerTool('borrow', {
    title: "Borrow from Pool",
    description: "Submits a transaction to borrow assets from a pool.",
    inputSchema: transactionInputSchema,
}, async (params: TransactionParams) => {
    const txHash = await blendService.borrow(params);
    return { content: [{ type: 'text', text: `Borrow transaction submitted successfully. Hash: ${txHash}` }] };
});

server.registerTool('repay', {
    title: "Repay to Pool",
    description: "Submits a transaction to repay borrowed assets to a pool.",
    inputSchema: transactionInputSchema,
}, async (params: TransactionParams) => {
    const txHash = await blendService.repay(params);
    return { content: [{ type: 'text', text: `Repay transaction submitted successfully. Hash: ${txHash}` }] };
});

const claimRewardsSchema = {
    userAddress: z.string().describe("The Stellar public key of the user performing the action."),
    poolId: z.string().describe("The contract ID of the pool to claim rewards from."),
    reserveTokenIds: z.array(z.union([z.string(), z.number()])).describe("List of reserve token IDs to claim rewards for."),
    privateKey: z.string().optional().describe("(Optional) The secret key of the user. If not provided, the server's AGENT_SECRET will be used."),
};
const claimRewardsObjectSchema = z.object(claimRewardsSchema);
type ClaimRewardsParams = z.infer<typeof claimRewardsObjectSchema>;

server.registerTool('claimRewards', {
    title: "Claim Rewards",
    description: "Submits a transaction to claim available rewards from a pool.",
    inputSchema: claimRewardsSchema,
}, async (params: ClaimRewardsParams) => {
    const txHash = await blendService.claim(params);
    return { content: [{ type: 'text', text: `Claim transaction submitted successfully. Hash: ${txHash}` }] };
});

const createPoolInputSchema = {
  admin: z.string().describe('The public key of the account that will be the admin of the new pool.'),
  name: z.string().describe('The name of the new pool (e.g., "My Custom Pool").'),
  oracleId: z.string().describe('The contract ID of the oracle to be used for asset pricing.'),
  backstopRate: z.number().describe('The backstop take rate for the pool, in BPS. (e.g., 1000 for 10%)'),
  maxPositions: z.number().describe('The maximum number of positions a user can have in the pool.'),
  minCollateral: z.number().describe('The minimum collateral amount for a position in the pool.'),
};

const createPoolObjectSchema = z.object(createPoolInputSchema);
type CreatePoolParams = z.infer<typeof createPoolObjectSchema>;

server.registerTool(
  'createPool',
  {
    title: 'Create Lending Pool',
    description: 'Deploys a new, permissionless lending pool on the Blend protocol.',
    inputSchema: createPoolInputSchema,
  },
  async (params: CreatePoolParams) => {
    const txHash = await blendService.createPool({
      ...params,
      minCollateral: BigInt(params.minCollateral),
    });
    return { content: [{ type: 'text', text: `Pool creation transaction submitted successfully. Hash: ${txHash}` }] };
  }
);

const reserveConfigSchema = {
  index: z.number().describe('The index of the reserve in the list (usually 0 for the first).'),
  decimals: z.number().describe('The decimals of the underlying asset contract.'),
  c_factor: z.number().describe('The collateral factor for the reserve, in BPS (e.g., 7500 for 75%).'),
  l_factor: z.number().describe('The liability factor for the reserve, in BPS (e.g., 8000 for 80%).'),
  util: z.number().describe('The target utilization rate, in BPS (e.g., 6500 for 65%).'),
  max_util: z.number().describe('The maximum allowed utilization rate, in BPS (e.g., 9500 for 95%).'),
  r_base: z.number().describe('The base interest rate, in BPS.'),
  r_one: z.number().describe('The interest rate slope below target utilization, in BPS.'),
  r_two: z.number().describe('The interest rate slope above target utilization, in BPS.'),
  r_three: z.number().describe('The interest rate slope above max utilization, in BPS.'),
  reactivity: z.number().describe('The interest rate reactivity constant.'),
  supply_cap: z.union([z.string(), z.number()]).describe('The total amount of underlying tokens that can be used as collateral (as string or number).'),
  enabled: z.boolean().describe('Whether the reserve is enabled.'),
};

const addReserveInputSchema = {
  admin: z.string().describe('The public key of the pool admin.'),
  poolId: z.string().describe('The contract ID of the pool to add the reserve to.'),
  assetId: z.string().describe('The contract ID of the asset to add as a reserve.'),
  metadata: z.object(reserveConfigSchema),
  privateKey: z.string().describe('The secret key of the admin account to sign the transaction.'),
};

const addReserveObjectSchema = z.object(addReserveInputSchema);
type AddReserveParams = z.infer<typeof addReserveObjectSchema>;

server.registerTool(
  'addReserve',
  {
    title: 'Add Reserve to Pool',
    description: 'Adds a new asset reserve to a lending pool.',
    inputSchema: addReserveInputSchema,
  },
  async (params: AddReserveParams) => {
    const txHash = await blendService.addReserve(params);
    return { content: [{ type: 'text', text: `Add reserve transaction submitted successfully. Hash: ${txHash}` }] };
  }
);

server.registerTool(
  'buyNft',
  {
    title: 'Buy NFT',
    description: 'Buys an NFT from a Soroban NFT contract using the provided funds. You must specify the NFT contract ID, token ID, and price. The contract method and arguments may need to be adjusted for your specific NFT contract.',
    inputSchema: {
      userAddress: z.string().describe('The Stellar address of the buyer.'),
      nftContractId: z.string().describe('The contract ID of the NFT.'),
      tokenId: z.union([z.string(), z.number()]).describe('The ID of the NFT to buy.'),
      price: z.number().describe('The price to pay (in stroops or contract units).'),
      privateKey: z.string().optional().describe('(Optional) The secret key to sign the transaction. If not provided, the server\'s AGENT_SECRET will be used.'),
    },
  },
  async ({ userAddress, nftContractId, tokenId, price, privateKey }) => {
    const txHash = await blendService.buyNft({ userAddress, nftContractId, tokenId, price, privateKey });
    return { content: [{ type: 'text', text: `NFT purchase transaction submitted. Hash: ${txHash}` }] };
  }
);

// 3. Connect to a transport and run the server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Blend Protocol MCP Server connected via stdio and ready.');
}

run().catch((err) => {
  console.error('Failed to run MCP server:', err);
  process.exit(1);
});