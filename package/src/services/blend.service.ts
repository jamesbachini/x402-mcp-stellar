// NOTE: '@blend-capital/blend-sdk' types may be missing until dependencies are installed
import {
  Backstop,
  BackstopPool,
  BackstopPoolUser,
  BackstopPoolV1,
  BackstopPoolV2,
  ErrorTypes,
  getOracleDecimals,
  Network as BlendNetwork,
  Pool,
  PoolMetadata,
  PoolOracle,
  PoolUser,
  PoolV1,
  PoolV2,
  PoolV1Event,
  PoolV2Event,
  TokenMetadata,
  Version,
  
  poolEventV1FromEventResponse,
  poolEventV2FromEventResponse,
  RequestType,
  PoolFactoryContractV2,
  DeployV2Args,
  parseError,
  parseResult,
  PoolContractV2,
} from '@blend-capital/blend-sdk';
import stellarSdk from '@stellar/stellar-sdk';
import {
  xdr,
  Keypair,
  TransactionBuilder,
  Networks,
  Transaction,
  Address,
  Account,
  Operation,
} from '@stellar/stellar-sdk';

const AGENT_SECRET = process.env.AGENT_SECRET || '';
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const RPC_URL = 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const NETWORK_OPTS = { allowHttp: true };

function getNetwork() {
  return {
    rpc: RPC_URL,
    passphrase: NETWORK_PASSPHRASE,
    horizonUrl: HORIZON_URL,
    opts: NETWORK_OPTS,
  };
}

function getKeypair(secret?: string) {
  return Keypair.fromSecret(secret || AGENT_SECRET);
}

// Define a type that includes the version property we will add.
type PoolMetaWithVersion = PoolMetadata & { id: string; version: Version };

export class BlendService {
  constructor() {}

  // Pool Meta
  async loadPoolMeta(poolId: string): Promise<PoolMetaWithVersion> {
    if (!poolId) throw new Error('poolId is required');
    const network = getNetwork();
    const metadata = await PoolMetadata.load(network, poolId);

    // Hardcoding wasm hashes from blend-ui api.ts for version detection
    const V1_WASM_HASH = 'baf978f10efdbcd85747868bef8832845ea6809f7643b67a4ac0cd669327fc2c';
    const V2_WASM_HASH = 'a41fc53d6753b6c04eb15b021c55052366a4c8e0e21bc72700f461264ec1350e';
    const V2_TESTNET_WASM_HASH = '6a7c67449f6bad0d5f641cfbdf03f430ec718faa85107ecb0b97df93410d1c43';

    if (metadata.wasmHash === V1_WASM_HASH) {
      return { ...metadata, id: poolId, version: Version.V1 };
    }

    if (metadata.wasmHash === V2_WASM_HASH || metadata.wasmHash === V2_TESTNET_WASM_HASH) {
      return { ...metadata, id: poolId, version: Version.V2 };
    }

    throw new Error(
      `Could not determine pool version for ${poolId}. Unknown wasmHash: ${metadata.wasmHash}`
    );
  }

  // Pool (V1/V2)
  async loadPool(poolId: string, meta: PoolMetaWithVersion) {
    if (!poolId) throw new Error('poolId is required');
    const network = getNetwork();
    if (meta) {
      if (meta.version === Version.V2) {
        return await PoolV2.loadWithMetadata(network, poolId, meta);
      } else {
        return await PoolV1.loadWithMetadata(network, poolId, meta);
      }
    } else {
      throw new Error('Pool meta/version required for loadPool');
    }
  }

  // Pool User
  async loadPoolUser(pool: PoolV1 | PoolV2, userAddress: string) {
    if (!pool || !userAddress) throw new Error('pool and userAddress are required');
    return await pool.loadUser(userAddress);
  }

  // Pool Oracle
  async loadPoolOracle(pool: PoolV1 | PoolV2) {
    const network = getNetwork();
    if (pool && pool.metadata && pool.metadata.oracle) {
      try {
        await getOracleDecimals(network, pool.metadata.oracle);
        return await pool.loadOracle();
      } catch (e) {
        return await pool.loadOracle();
      }
    }
    return null;
  }

  // Pool Events
  async getPoolEvents(poolId: string, version: string, startLedger: number) {
    if (!poolId || !version || typeof startLedger !== 'number')
      throw new Error('poolId, version, and startLedger are required');
    const network = getNetwork();
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const topics =
      version === 'V2'
        ? [
            [xdr.ScVal.scvSymbol('new_auction').toXDR('base64'), '*', '*'],
            [xdr.ScVal.scvSymbol('fill_auction').toXDR('base64'), '*', '*'],
            [xdr.ScVal.scvSymbol('delete_auction').toXDR('base64'), '*', '*'],
          ]
        : [
            [xdr.ScVal.scvSymbol('fill_auction').toXDR('base64'), '*', '*'],
            [xdr.ScVal.scvSymbol('delete_liquidation_auction').toXDR('base64'), '*'],
            [xdr.ScVal.scvSymbol('new_liquidation_auction').toXDR('base64'), '*'],
            [xdr.ScVal.scvSymbol('new_auction').toXDR('base64'), '*'],
            [xdr.ScVal.scvSymbol('delete_liquidation_auction').toXDR('base64'), '*'],
          ];
    const resp = await stellarRpc._getEvents({
      startLedger,
      filters: [
        {
          type: 'contract',
          contractIds: [poolId],
          topics,
        },
      ],
      limit: 1000,
    });
    if (version === 'V2') {
      let events: PoolV2Event[] = [];
      for (const respEvent of resp.events) {
        let poolEvent = poolEventV2FromEventResponse(respEvent);
        if (poolEvent) events.push(poolEvent);
      }
      return { events, latestLedger: resp.latestLedger };
    } else {
      let events: PoolV1Event[] = [];
      for (const respEvent of resp.events) {
        let poolEvent = poolEventV1FromEventResponse(respEvent);
        if (poolEvent) events.push(poolEvent);
      }
      return { events, latestLedger: resp.latestLedger };
    }
  }

  // Backstop
  async loadBackstop(version: string) {
    if (!version) throw new Error('version is required');
    const network = getNetwork();
    const backstopId = version === 'V2' ? process.env.BACKSTOP_ID_V2 : process.env.BACKSTOP_ID;
    if (!backstopId) throw new Error('BACKSTOP_ID env variable is required');
    return await Backstop.load(network, backstopId);
  }

  // Backstop Pool
  async loadBackstopPool(poolMeta: any) {
    if (!poolMeta || !poolMeta.id || !poolMeta.version)
      throw new Error('poolMeta with id and version is required');
    const network = getNetwork();
    if (poolMeta.version === Version.V2) {
      if (!process.env.BACKSTOP_ID_V2) throw new Error('BACKSTOP_ID_V2 env variable is required');
      return await BackstopPoolV2.load(network, process.env.BACKSTOP_ID_V2, poolMeta.id);
    } else {
      if (!process.env.BACKSTOP_ID) throw new Error('BACKSTOP_ID env variable is required');
      return await BackstopPoolV1.load(network, process.env.BACKSTOP_ID, poolMeta.id);
    }
  }

  // Backstop Pool User
  async loadBackstopPoolUser(poolMeta: any, userAddress: string) {
    if (!poolMeta || !poolMeta.id || !poolMeta.version || !userAddress)
      throw new Error('poolMeta with id, version and userAddress are required');
    const network = getNetwork();
    if (poolMeta.version === Version.V2) {
      if (!process.env.BACKSTOP_ID_V2) throw new Error('BACKSTOP_ID_V2 env variable is required');
      return await BackstopPoolUser.load(
        network,
        process.env.BACKSTOP_ID_V2,
        poolMeta.id,
        userAddress
      );
    } else {
      if (!process.env.BACKSTOP_ID) throw new Error('BACKSTOP_ID env variable is required');
      return await BackstopPoolUser.load(
        network,
        process.env.BACKSTOP_ID,
        poolMeta.id,
        userAddress
      );
    }
  }

  // Token Metadata
  async loadTokenMetadata(assetId: string) {
    if (!assetId) throw new Error('assetId is required');
    const network = getNetwork();
    return await TokenMetadata.load(network, assetId);
  }

  // Token Balance
  async getTokenBalance(tokenId: string, userAddress: string) {
    if (!tokenId || !userAddress) throw new Error('tokenId and userAddress are required');
    const network = getNetwork();
    try {
      // Try to fetch from Horizon for native and issued assets
      const horizon = new stellarSdk.Horizon.Server(network.horizonUrl, network.opts);
      const account = await horizon.loadAccount(userAddress);
      if (tokenId === 'native' || tokenId === 'XLM') {
        const nativeBalance = account.balances.find((b: any) => b.asset_type === 'native');
        if (nativeBalance) {
          return BigInt(nativeBalance.balance.replace('.', ''));
        }
      }
      const assetBalance = account.balances.find((b: any) => {
        if ('asset_code' in b && 'asset_issuer' in b) {
          return b.asset_code === tokenId || b.asset_issuer === tokenId;
        }
        return false;
      });
      if (assetBalance && 'balance' in assetBalance) {
        return BigInt(assetBalance.balance.replace('.', ''));
      }
      return BigInt(0);
    } catch (e) {
      return BigInt(0);
    }
  }

  // Write Actions (lend, borrow, repay, claim, supplyCollateral, withdrawCollateral)
  async lend({ userAddress, amount, asset, poolId, privateKey }: any): Promise<string> {
    if (!userAddress || !amount || !asset || !poolId)
      throw new Error('userAddress, amount, asset, and poolId are required');
    const network = getNetwork();
    const pool = new PoolContractV2(poolId);

    // Construct the supply collateral operation
    const supplyOp = pool.submit({
      from: userAddress,
      spender: userAddress,
      to: userAddress,
      requests: [
        {
          amount: BigInt(amount * 1e7),
          request_type: RequestType.SupplyCollateral,
          address: asset,
        },
      ],
    });

    // Prepare signing key
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);

    // Load the signer's account
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    // Prepare transaction parameters
    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '100000', // or appropriate fee
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    // Call _invokeSorobanOperation
    const txHash = await this._invokeSorobanOperation(
      supplyOp,
      () => '', // No parser needed, just return the hash
      txParams
    );
    return txHash as string;
  }

  async withdraw({ userAddress, amount, asset, poolId, privateKey }: any): Promise<string> {
    if (!userAddress || !amount || !asset || !poolId)
      throw new Error('userAddress, amount, asset, and poolId are required');
    const network = getNetwork();
    const pool = new PoolContractV2(poolId);

    // Construct the withdraw operation
    const withdrawOp = pool.submit({
      from: userAddress,
      spender: userAddress,
      to: userAddress,
      requests: [
        {
          amount: BigInt(amount * 1e7),
          request_type: RequestType.Withdraw,
          address: asset,
        },
      ],
    });

    // Prepare signing key
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);

    // Load the signer's account
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    // Prepare transaction parameters
    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '100000',
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    // Call _invokeSorobanOperation
    const txHash = await this._invokeSorobanOperation(
      withdrawOp,
      () => '', // No parser needed, just return the hash
      txParams
    );
    return txHash as string;
  }

  async borrow({ userAddress, amount, asset, poolId, privateKey }: any): Promise<string> {
    if (!userAddress || !amount || !asset || !poolId)
      throw new Error('userAddress, amount, asset, and poolId are required');
    const network = getNetwork();
    const pool = new PoolContractV2(poolId);

    // Construct the borrow operation
    const borrowOp = pool.submit({
      from: userAddress,
      spender: userAddress,
      to: userAddress,
      requests: [
        {
          amount: BigInt(amount * 1e7),
          request_type: RequestType.Borrow,
          address: asset,
        },
      ],
    });

    // Prepare signing key
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);

    // Load the signer's account
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    // Prepare transaction parameters
    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '100000',
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    // Call _invokeSorobanOperation
    const txHash = await this._invokeSorobanOperation(
      borrowOp,
      () => '', // No parser needed, just return the hash
      txParams
    );
    return txHash as string;
  }

  async repay({ userAddress, amount, asset, poolId, privateKey }: any): Promise<string> {
    if (!userAddress || !amount || !asset || !poolId)
      throw new Error('userAddress, amount, asset, and poolId are required');
    const network = getNetwork();
    const pool = new PoolContractV2(poolId);

    // Construct the repay operation
    const repayOp = pool.submit({
      from: userAddress,
      spender: userAddress,
      to: userAddress,
      requests: [
        {
          amount: BigInt(amount * 1e7),
          request_type: RequestType.Repay,
          address: asset,
        },
      ],
    });

    // Prepare signing key
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);

    // Load the signer's account
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    // Prepare transaction parameters
    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '100000',
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    // Call _invokeSorobanOperation
    const txHash = await this._invokeSorobanOperation(
      repayOp,
      () => '', // No parser needed, just return the hash
      txParams
    );
    return txHash as string;
  }

  async claim({ userAddress, poolId, reserveTokenIds, privateKey }: any): Promise<string> {
    if (!userAddress || !poolId || !reserveTokenIds) throw new Error('userAddress, poolId, and reserveTokenIds are required');
    const network = getNetwork();
    const pool = new PoolContractV2(poolId);

    // Construct the claim rewards operation using the correct method and args
    const claimOp = pool.claim({
      from: userAddress,
      reserve_token_ids: reserveTokenIds,
      to: userAddress,
    });

    // Prepare signing key
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);

    // Load the signer's account
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    // Prepare transaction parameters
    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '100000',
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    // Call _invokeSorobanOperation
    const txHash = await this._invokeSorobanOperation(
      claimOp,
      () => '', // No parser needed, just return the hash
      txParams
    );
    return txHash as string;
  }

  async createPool({
    admin,
    name,
    oracleId,
    backstopRate,
    maxPositions,
    minCollateral,
    privateKey
  }: {
    admin: string;
    name: string;
    oracleId: string;
    backstopRate: number;
    maxPositions: number;
    minCollateral: bigint;
    privateKey?: string;
  }): Promise<string> {
    if (!admin || !name || !oracleId || backstopRate === undefined || maxPositions === undefined || minCollateral === undefined) {
      throw new Error('admin, name, oracleId, backstopRate, maxPositions, and minCollateral are required');
    }
  
    // Validate input parameters
    if (backstopRate < 0 || backstopRate > 1000000) {
      throw new Error('backstopRate must be between 0 and 1000000 (representing 0% to 100% with 4 decimal precision)');
    }
  
    if (maxPositions < 1 || maxPositions > 255) {
      throw new Error('maxPositions must be between 1 and 255');
    }
  
    // Use environment variable or default factory ID for testnet
    const factoryId = process.env.POOL_FACTORY_ID || 'CDIE73IJJKOWXWCPU5GWQ745FUKWCSH3YKZRF5IQW7GE3G7YAZ773MYK';
  
    if (!factoryId) {
      throw new Error('POOL_FACTORY_ID environment variable is not set.');
    }
  
    try {
      const poolFactory = new PoolFactoryContractV2(factoryId);
  
      // Generate a random salt for pool creation
      const salt = Keypair.random().rawPublicKey();
  
      const deployPoolArgs: DeployV2Args = {
        admin: new Address(admin),
        name: name,
        salt: salt,
        oracle: new Address(oracleId),
        backstop_take_rate: backstopRate,
        max_positions: maxPositions,
        min_collateral: minCollateral,
      };
  
      const operation = poolFactory.deployPool(deployPoolArgs);
  
      // Use provided private key or fall back to AGENT_SECRET
      const signingKey = privateKey || process.env.AGENT_SECRET;
      if (!signingKey) {
        throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
      }
  
      const signerKeypair = Keypair.fromSecret(signingKey);
      const network = getNetwork();
      const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
  
      // Load the signer's account
      const account = await stellarRpc.getAccount(signerKeypair.publicKey());
  
      // Prepare transaction parameters
      const txParams = {
        account,
        signerFunction: async (txXdr: string) => {
          const tx = new Transaction(txXdr, network.passphrase);
          tx.sign(signerKeypair);
          return tx.toXDR();
        },
        txBuilderOptions: {
          fee: '1000000', // 1 XLM fee for pool creation
          networkPassphrase: network.passphrase,
          timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
        },
      };
  
      // Deploy the pool using the internal helper method
      const poolAddress = await this._invokeSorobanOperation(
        operation,
        PoolFactoryContractV2.parsers.deployPool,
        txParams
      );
  
      if (!poolAddress) {
        throw new Error('Failed to deploy pool: No pool address returned');
      }
  
      console.log(`Pool successfully created at address: ${poolAddress}`);
      return poolAddress;
  
    } catch (error: any) {
      console.error('Error creating pool:', error);
      
      // Provide more specific error messages based on common issues
      if (error.message?.includes('account not found')) {
        throw new Error(`Account not found: ${admin}. Make sure the admin account exists and is funded.`);
      }
      
      if (error.message?.includes('oracle')) {
        throw new Error(`Invalid oracle address: ${oracleId}. Make sure the oracle contract exists.`);
      }
      
      if (error.message?.includes('insufficient funds')) {
        throw new Error('Insufficient funds to create pool. The admin account needs enough XLM to cover transaction fees.');
      }
  
      // Re-throw the original error if it's not a recognized issue
      throw error;
    }
  }

  async addReserve({ admin, poolId, assetId, metadata, privateKey }: any): Promise<string> {
    if (!admin || !poolId || !assetId || !metadata) {
      throw new Error('admin, poolId, assetId, and metadata are required');
    }
    const network = getNetwork();
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '1000000',
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    const pool = new PoolContractV2(poolId);
    // Explicitly construct SetReserveV2Args structure
    const setReserveArgs = {
      asset: assetId,
      metadata: {
        index: metadata.index,
        decimals: metadata.decimals,
        c_factor: metadata.c_factor,
        l_factor: metadata.l_factor,
        util: metadata.util,
        max_util: metadata.max_util,
        r_base: metadata.r_base,
        r_one: metadata.r_one,
        r_two: metadata.r_two,
        r_three: metadata.r_three,
        reactivity: metadata.reactivity,
        supply_cap: BigInt(metadata.supply_cap),
        enabled: metadata.enabled,
      }
    };

    // Queue the reserve
    await this._invokeSorobanOperation(
      pool.queueSetReserve(setReserveArgs),
      PoolContractV2.parsers.queueSetReserve,
      txParams
    );

    // Try to set the reserve (may fail if time-lock not reached)
    let setResult = '';
    try {
      await this._invokeSorobanOperation(
        pool.setReserve(assetId),
        PoolContractV2.parsers.setReserve,
        txParams
      );
      setResult = `Reserve for asset ${assetId} set successfully.`;
    } catch (e) {
      setResult = `Reserve for asset ${assetId} queued, but not set yet (likely due to time-lock).`;
    }
    return setResult;
  }

  // Simulate Operation
  async simulateOperation(operationXdr: string, userAddress: string) {
    if (!operationXdr || !userAddress) throw new Error('operationXdr and userAddress are required');
    const network = getNetwork();
    const operation = xdr.Operation.fromXDR(operationXdr, 'base64');
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = new stellarSdk.Account(userAddress, '123');
    const txBuilder = new stellarSdk.TransactionBuilder(account, {
      networkPassphrase: network.passphrase,
      fee: stellarSdk.BASE_FEE,
      timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 5 * 60 * 1000 },
    }).addOperation(operation);
    const transaction = txBuilder.build();
    return await stellarRpc.simulateTransaction(transaction);
  }

  // Fee Stats
  async getFeeStats() {
    const network = getNetwork();
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const feeStats = await stellarRpc.getFeeStats();
    return {
      low: Math.max(parseInt(feeStats.sorobanInclusionFee.p30), 500).toString(),
      medium: Math.max(parseInt(feeStats.sorobanInclusionFee.p60), 2000).toString(),
      high: Math.max(parseInt(feeStats.sorobanInclusionFee.p90), 10000).toString(),
    };
  }

  /**
   * Buy an NFT from a Soroban NFT contract using borrowed funds.
   * @param userAddress - The Stellar address of the buyer
   * @param nftContractId - The contract ID of the NFT
   * @param tokenId - The ID of the NFT to buy
   * @param price - The price to pay (in stroops or contract units)
   * @param privateKey - (Optional) The secret key to sign the transaction
   * @returns Transaction hash or result
   *
   * NOTE: The contract method name and arguments may need to be adjusted for the specific NFT contract used.
   */
  async buyNft({ userAddress, nftContractId, tokenId, price, privateKey }: any): Promise<string> {
    if (!userAddress || !nftContractId || !tokenId || !price)
      throw new Error('userAddress, nftContractId, tokenId, and price are required');
    const network = getNetwork();
    const signingKey = privateKey || process.env.AGENT_SECRET;
    if (!signingKey) {
      throw new Error('Either privateKey parameter or AGENT_SECRET environment variable must be set.');
    }
    const signerKeypair = Keypair.fromSecret(signingKey);
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const account = await stellarRpc.getAccount(signerKeypair.publicKey());

    // Build the contract invocation operation (assume 'buy' method)
    // You may need to adjust the method name and argument order for your NFT contract
    const contractId = nftContractId;
    const method = 'buy';
    const args = [
      stellarSdk.Address.fromString(userAddress).toScVal(), // buyer
      typeof tokenId === 'string' ? stellarSdk.xdr.ScVal.scvString(tokenId) : stellarSdk.xdr.ScVal.scvU64(tokenId),
      stellarSdk.xdr.ScVal.scvU64(price),
    ];
    const op = stellarSdk.Operation.invokeContractFunction({
      contract: contractId,
      function: method,
      args,
    });

    // Prepare transaction parameters
    const txParams = {
      account,
      signerFunction: async (txXdr: string) => {
        const tx = new Transaction(txXdr, network.passphrase);
        tx.sign(signerKeypair);
        return tx.toXDR();
      },
      txBuilderOptions: {
        fee: '100000',
        networkPassphrase: network.passphrase,
        timebounds: { minTime: 0, maxTime: Math.floor(Date.now() / 1000) + 300 },
      },
    };

    // Call _invokeSorobanOperation
    const txHash = await this._invokeSorobanOperation(
      op.toXDR('base64'),
      () => '',
      txParams
    );
    return txHash as string;
  }

  // --- Internal helper for tx build/sign/submit ---
  private async _submitTx(source: string, operations: any[], privateKey?: string, network?: any) {
    if (!source || !operations || !network)
      throw new Error('source, operations, and network are required');
    const keypair = getKeypair(privateKey);

    if (source !== keypair.publicKey()) {
      throw new Error(
        `Transaction source address (${source}) does not match signing keypair public key (${keypair.publicKey()}). The privateKey for the source account must be provided.`
      );
    }

    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    const stellarServer = new stellarSdk.Horizon.Server(network.horizonUrl, {
      ...network.opts,
      allowHttp: true,
    });

    try {
      const sourceAccount = await stellarServer.loadAccount(source);

      // --- Simulation Phase ---
      const txBuilderForSim = new stellarSdk.TransactionBuilder(sourceAccount, {
        fee: stellarSdk.BASE_FEE,
        networkPassphrase: network.passphrase,
        timebounds: await stellarServer.fetchTimebounds(100),
      });
      operations.forEach((op) => txBuilderForSim.addOperation(op));
      const txToSimulate = txBuilderForSim.build();

      const simulation = await stellarRpc.simulateTransaction(txToSimulate);

      if (stellarRpc.rpc.isSimulationError(simulation)) {
        throw new Error(`Transaction simulation failed: ${simulation.error}`);
      } else if (!simulation.result) {
        throw new Error('Invalid simulation response: no result found.');
      }

      // --- Submission Phase ---
      const txBuilderForSubmit = new stellarSdk.TransactionBuilder(sourceAccount, {
        fee: simulation.minResourceFee,
        networkPassphrase: network.passphrase,
      });

      operations.forEach((op) => txBuilderForSubmit.addOperation(op));

      const txToSubmit = txBuilderForSubmit
        .setSorobanData(simulation.transactionData)
        .setTimeout(30)
        .build();

      txToSubmit.sign(keypair);

      const res = await stellarServer.submitTransaction(txToSubmit);
      return res.hash;
    } catch (e: any) {
      if (e?.response?.data) {
        console.error('Error submitting transaction:', JSON.stringify(e.response.data, null, 2));
        const { title, detail, extras } = e.response.data;
        let errorMessage = `Transaction submission failed: ${title}`;
        if (detail) {
          errorMessage += `. ${detail}`;
        }
        if (extras?.result_codes) {
          const { transaction, operations } = extras.result_codes;
          errorMessage += ` (Transaction: ${transaction}, Operations: ${operations?.join(', ')})`;
        }
        throw new Error(errorMessage);
      }
      console.error('Raw error submitting transaction:', e);
      throw e;
    }
  }

  private async _sendTransaction<T>(
    transaction: Transaction,
    parser: (result: string) => T
  ): Promise<T | undefined> {
    const network = getNetwork();
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    
    try {
      // Submit transaction
      let sendResponse = await stellarRpc.sendTransaction(transaction);
      const startTime = Date.now();
      const timeout = 30000; // 30 second timeout
      
      // Handle TRY_AGAIN_LATER responses
      while (sendResponse.status === 'TRY_AGAIN_LATER' && (Date.now() - startTime) < timeout) {
        console.log('Transaction submission returned TRY_AGAIN_LATER, retrying...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        sendResponse = await stellarRpc.sendTransaction(transaction);
      }
      
      // Check if submission timed out
      if (sendResponse.status === 'TRY_AGAIN_LATER') {
        throw new Error('Transaction submission timed out after multiple retries');
      }
      
      // Handle submission errors
      if (sendResponse.status !== 'PENDING') {
        console.error('Transaction failed to submit:', sendResponse.hash);
        console.error('Error details:', JSON.stringify(sendResponse, null, 2));
        console.error('Transaction XDR:', transaction.toXDR());
        
        // Log diagnostic events
        if (sendResponse.diagnosticEvents) {
          console.error('Diagnostic events:');
          sendResponse.diagnosticEvents.forEach((event:any, index:any) => {
            console.error(`Event ${index}:`, event.toXDR('base64'));
          });
        }
        
        const error = parseError(sendResponse);
        throw error;
      }
      
      console.log('Transaction submitted successfully, hash:', sendResponse.hash);
      
      // Wait for transaction to be included in ledger
      let getResponse = await stellarRpc.getTransaction(sendResponse.hash);
      const pollStartTime = Date.now();
      const pollTimeout = 60000; // 60 second timeout for transaction confirmation
      
      while (getResponse.status === 'NOT_FOUND' && (Date.now() - pollStartTime) < pollTimeout) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        getResponse = await stellarRpc.getTransaction(sendResponse.hash);
      }
      
      // Check if polling timed out
      if (getResponse.status === 'NOT_FOUND') {
        throw new Error(`Transaction confirmation timed out. Hash: ${sendResponse.hash}`);
      }
      
      // Handle transaction execution errors
      if (getResponse.status !== 'SUCCESS') {
        console.error('Transaction execution failed:', getResponse.hash);
        console.error('Transaction details:', JSON.stringify(getResponse, null, 2));
        
        const error = parseError(getResponse);
        throw error;
      }
      
      console.log('Transaction executed successfully!');
      
      // Parse and return result
      if (parser && getResponse.returnValue) {
        const result = parseResult(getResponse, parser);
        return result;
      }
      
      return undefined;
      
    } catch (error) {
      console.error('Error in _sendTransaction:', error);
      
      // Enhance error messages for better debugging
      if (error instanceof Error) {
        if (error.message.includes('tx_bad_seq')) {
          throw new Error('Transaction sequence number error. The account sequence may have changed.');
        }
        
        if (error.message.includes('tx_insufficient_fee')) {
          throw new Error('Transaction fee too low. Try increasing the fee.');
        }
        
        if (error.message.includes('tx_no_source_account')) {
          throw new Error('Source account not found or invalid.');
        }
      }
      
      throw error;
    }
  }

  private async _invokeSorobanOperation<T>(
    operation: string,
    parser: (result: string) => T,
    txParams: {
      account: Account;
      signerFunction: (txXdr: string) => Promise<string>;
      txBuilderOptions: TransactionBuilder.TransactionBuilderOptions;
    }
  ): Promise<T | undefined> {
    const network = getNetwork();
    const stellarRpc = new stellarSdk.rpc.Server(network.rpc, network.opts);
    
    try {
      // Get fresh account data to ensure correct sequence number
      const freshAccount = await stellarRpc.getAccount(txParams.account.accountId());
      
      // Build initial transaction
      const txBuilder = new stellarSdk.TransactionBuilder(freshAccount, txParams.txBuilderOptions)
        .addOperation(xdr.Operation.fromXDR(operation, 'base64'));
  
      let transaction = txBuilder.build();
      let simulation = await stellarRpc.simulateTransaction(transaction);
      
      // Handle restore if needed
      if (stellarSdk.rpc.Api.isSimulationRestore(simulation)) {
        console.log('Contract state needs restoration...');
        
        if (!simulation.restorePreamble?.transactionData) {
          throw new Error('Missing restore preamble transaction data');
        }
        
        // Calculate appropriate fee for restore operation
        const baseFee = Number(simulation.restorePreamble.minResourceFee);
        const restoreFee = Math.max(baseFee + 50000, 100000); // Ensure minimum fee
        
        // Get fresh account for restore transaction
        const restoreAccount = await stellarRpc.getAccount(txParams.account.accountId());
        
        // Build restore transaction with proper timebounds
        const restoreTx = new stellarSdk.TransactionBuilder(restoreAccount, { 
          fee: restoreFee.toString(),
          networkPassphrase: network.passphrase,
          timebounds: await stellarRpc.fetchTimebounds(100) // Add proper timebounds
        })
          .setSorobanData(simulation.restorePreamble.transactionData.build())
          .addOperation(stellarSdk.Operation.restoreFootprint({}))
          .build();
        
        // Sign and submit restore transaction
        const restoreSignedTx = new stellarSdk.Transaction(
          await txParams.signerFunction(restoreTx.toXDR()),
          network.passphrase
        );
        
        console.log('Restore Transaction Hash:', restoreSignedTx.hash().toString('hex'));
        await this._sendTransaction(restoreSignedTx, () => undefined);
        console.log('Contract state restored successfully');
        
        // Wait a moment for the restore to be processed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get fresh account again after restore (don't manually increment sequence)
        const postRestoreAccount = await stellarRpc.getAccount(txParams.account.accountId());
        
        // Rebuild main transaction with fresh account
        transaction = new stellarSdk.TransactionBuilder(postRestoreAccount, txParams.txBuilderOptions)
          .addOperation(xdr.Operation.fromXDR(operation, 'base64'))
          .build();
        
        // Simulate again after restore
        simulation = await stellarRpc.simulateTransaction(transaction);
      }
  
      // Check for simulation errors
      if (stellarSdk.rpc.Api.isSimulationError(simulation)) {
        console.error('Transaction simulation failed');
        console.error('Transaction XDR:', transaction.toXDR());
        console.error('Simulation error:', simulation.error);
        
        // Log diagnostic events if available
        if (simulation.events) {
          console.error('Diagnostic events:');
          simulation.events.forEach((event:any, index:any) => {
            console.error(`Event ${index}:`, event.toXDR('base64'));
          });
        }
        
        const error = parseError(simulation);
        throw error;
      }
  
      // Validate simulation result
      if (!simulation.result) {
        throw new Error('Simulation succeeded but returned no result');
      }
  
      // Assemble transaction with simulation data
      const assembledTx = stellarSdk.rpc.assembleTransaction(transaction, simulation).build();
      console.log('Main Transaction Hash:', assembledTx.hash().toString('hex'));
      
      // Sign the assembled transaction
      const signedTx = new stellarSdk.Transaction(
        await txParams.signerFunction(assembledTx.toXDR()),
        network.passphrase
      );
  
      // Submit and wait for result
      const response = await this._sendTransaction(signedTx, parser);
      return response;
      
    } catch (error) {
      console.error('Error in _invokeSorobanOperation:', error);
      
      // Provide more context for common errors
      if (error instanceof Error) {
        if (error.message.includes('account not found')) {
          throw new Error(`Account not found: ${txParams.account.accountId()}. Ensure the account exists and is funded.`);
        }
        
        if (error.message.includes('insufficient funds')) {
          throw new Error(`Insufficient funds for operation. Account needs more XLM to cover transaction fees.`);
        }
        
        if (error.message.includes('contract not found')) {
          throw new Error(`Contract not found or not properly deployed. Check the contract address.`);
        }
      }
      
      throw error;
    }
  }
} 