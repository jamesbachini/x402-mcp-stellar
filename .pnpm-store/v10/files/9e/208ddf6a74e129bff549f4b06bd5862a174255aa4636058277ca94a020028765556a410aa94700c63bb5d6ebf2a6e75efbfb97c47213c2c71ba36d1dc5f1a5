// src/constants.ts
var STELLAR_PUBNET_CAIP2 = "stellar:pubnet";
var STELLAR_TESTNET_CAIP2 = "stellar:testnet";
var STELLAR_WILDCARD_CAIP2 = "stellar:*";
var DEFAULT_TESTNET_RPC_URL = "https://soroban-testnet.stellar.org";
var DEFAULT_TESTNET_HORIZON_URL = "https://horizon-testnet.stellar.org";
var DEFAULT_PUBNET_HORIZON_URL = "https://horizon.stellar.org";
var STELLAR_DESTINATION_ADDRESS_REGEX = /^(?:[GC][ABCD][A-Z2-7]{54}|M[ABCD][A-Z2-7]{67})$/;
var STELLAR_ASSET_ADDRESS_REGEX = /^(?:[C][ABCD][A-Z2-7]{54})$/;
var USDC_PUBNET_ADDRESS = "CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZPUTHXSTZLEO7SJMI75";
var USDC_TESTNET_ADDRESS = "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA";
var STELLAR_NETWORK_TO_PASSPHRASE = /* @__PURE__ */ new Map([
  [STELLAR_PUBNET_CAIP2, "Public Global Stellar Network ; September 2015"],
  [STELLAR_TESTNET_CAIP2, "Test SDF Network ; September 2015"]
]);
var DEFAULT_TOKEN_DECIMALS = 7;

// src/utils.ts
import { Horizon, rpc } from "@stellar/stellar-sdk";
var DEFAULT_ESTIMATED_LEDGER_SECONDS = 5;
var HORIZON_LEDGERS_SAMPLE_SIZE = 20;
function isStellarNetwork(network) {
  return STELLAR_NETWORK_TO_PASSPHRASE.has(network);
}
function validateStellarDestinationAddress(address) {
  return STELLAR_DESTINATION_ADDRESS_REGEX.test(address);
}
function validateStellarAssetAddress(address) {
  return STELLAR_ASSET_ADDRESS_REGEX.test(address);
}
function getNetworkPassphrase(network) {
  const networkPassphrase = STELLAR_NETWORK_TO_PASSPHRASE.get(network);
  if (!networkPassphrase) {
    throw new Error(`Unknown Stellar network: ${network}`);
  }
  return networkPassphrase;
}
function getRpcUrl(network, rpcConfig) {
  const customRpcUrl = rpcConfig?.url;
  switch (network) {
    case STELLAR_TESTNET_CAIP2:
      return customRpcUrl || DEFAULT_TESTNET_RPC_URL;
    case STELLAR_PUBNET_CAIP2:
      if (!customRpcUrl) {
        throw new Error(
          "Stellar mainnet requires a non-empty rpcUrl. For a list of RPC providers, see https://developers.stellar.org/docs/data/apis/rpc/providers#publicly-accessible-apis"
        );
      }
      return customRpcUrl;
    default:
      throw new Error(`Unknown Stellar network: ${network}`);
  }
}
function getRpcClient(network, rpcConfig) {
  const rpcUrl = getRpcUrl(network, rpcConfig);
  return new rpc.Server(rpcUrl, {
    allowHttp: network === STELLAR_TESTNET_CAIP2
    // Allow HTTP for testnet
  });
}
function getHorizonClient(network) {
  switch (network) {
    case STELLAR_TESTNET_CAIP2:
      return new Horizon.Server(DEFAULT_TESTNET_HORIZON_URL);
    case STELLAR_PUBNET_CAIP2:
      return new Horizon.Server(DEFAULT_PUBNET_HORIZON_URL);
    default:
      throw new Error(`Unknown Stellar network: ${network}`);
  }
}
async function getEstimatedLedgerCloseTimeSeconds(network) {
  try {
    const horizon = getHorizonClient(network);
    const page = await horizon.ledgers().limit(HORIZON_LEDGERS_SAMPLE_SIZE).order("desc").call();
    const records = page.records;
    if (!records || records.length < 2) return DEFAULT_ESTIMATED_LEDGER_SECONDS;
    const newestTs = new Date(records[0].closed_at).getTime() / 1e3;
    const oldestTs = new Date(records[records.length - 1].closed_at).getTime() / 1e3;
    const intervals = records.length - 1;
    return Math.ceil((newestTs - oldestTs) / intervals);
  } catch {
    return DEFAULT_ESTIMATED_LEDGER_SECONDS;
  }
}
function getUsdcAddress(network) {
  switch (network) {
    case STELLAR_PUBNET_CAIP2:
      return USDC_PUBNET_ADDRESS;
    case STELLAR_TESTNET_CAIP2:
      return USDC_TESTNET_ADDRESS;
    default:
      throw new Error(`No USDC address configured for network: ${network}`);
  }
}
function convertToTokenAmount(decimalAmount, decimals = DEFAULT_TOKEN_DECIMALS) {
  const amount = parseFloat(decimalAmount);
  if (isNaN(amount)) {
    throw new Error(`Invalid amount: ${decimalAmount}`);
  }
  if (decimals < 0 || decimals > 20) {
    throw new Error(`Decimals must be between 0 and 20, got ${decimals}`);
  }
  const normalizedDecimal = /[eE]/.test(decimalAmount) ? amount.toFixed(Math.max(decimals, 20)) : decimalAmount;
  const [intPart, decPart = ""] = normalizedDecimal.split(".");
  const paddedDec = decPart.padEnd(decimals, "0").slice(0, decimals);
  return (intPart + paddedDec).replace(/^0+/, "") || "0";
}

export {
  STELLAR_PUBNET_CAIP2,
  STELLAR_TESTNET_CAIP2,
  STELLAR_WILDCARD_CAIP2,
  DEFAULT_TESTNET_RPC_URL,
  DEFAULT_TESTNET_HORIZON_URL,
  DEFAULT_PUBNET_HORIZON_URL,
  STELLAR_DESTINATION_ADDRESS_REGEX,
  STELLAR_ASSET_ADDRESS_REGEX,
  USDC_PUBNET_ADDRESS,
  USDC_TESTNET_ADDRESS,
  STELLAR_NETWORK_TO_PASSPHRASE,
  DEFAULT_TOKEN_DECIMALS,
  DEFAULT_ESTIMATED_LEDGER_SECONDS,
  isStellarNetwork,
  validateStellarDestinationAddress,
  validateStellarAssetAddress,
  getNetworkPassphrase,
  getRpcUrl,
  getRpcClient,
  getHorizonClient,
  getEstimatedLedgerCloseTimeSeconds,
  getUsdcAddress,
  convertToTokenAmount
};
//# sourceMappingURL=chunk-I3AZA5S2.mjs.map