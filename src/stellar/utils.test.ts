import test from "node:test";
import assert from "node:assert/strict";
import { Keypair } from "@stellar/stellar-sdk";

import {
  DEFAULT_ESTIMATED_LEDGER_SECONDS,
  convertToTokenAmount,
  getEstimatedLedgerCloseTimeSeconds,
  getNetworkPassphrase,
  getRpcUrl,
  getUsdcAddress,
  isStellarNetwork,
  validateStellarAssetAddress,
  validateStellarDestinationAddress,
} from "./utils.js";
import {
  STELLAR_PUBNET_CAIP2,
  STELLAR_TESTNET_CAIP2,
  USDC_PUBNET_ADDRESS,
  USDC_TESTNET_ADDRESS,
} from "./constants.js";

test("isStellarNetwork recognizes supported networks", () => {
  assert.equal(isStellarNetwork(STELLAR_TESTNET_CAIP2), true);
  assert.equal(isStellarNetwork(STELLAR_PUBNET_CAIP2), true);
  assert.equal(isStellarNetwork("eip155:1"), false);
});

test("address validators accept and reject expected values", () => {
  const gAddress = Keypair.random().publicKey();

  assert.equal(validateStellarDestinationAddress(gAddress), true);
  assert.equal(validateStellarDestinationAddress(USDC_TESTNET_ADDRESS), true);
  assert.equal(validateStellarDestinationAddress("not-an-address"), false);

  assert.equal(validateStellarAssetAddress(USDC_TESTNET_ADDRESS), true);
  assert.equal(validateStellarAssetAddress(USDC_PUBNET_ADDRESS), true);
  assert.equal(validateStellarAssetAddress(gAddress), false);
});

test("getNetworkPassphrase returns expected passphrases", () => {
  assert.equal(
    getNetworkPassphrase(STELLAR_TESTNET_CAIP2),
    "Test SDF Network ; September 2015",
  );
  assert.equal(
    getNetworkPassphrase(STELLAR_PUBNET_CAIP2),
    "Public Global Stellar Network ; September 2015",
  );
});

test("getNetworkPassphrase throws for unknown network", () => {
  assert.throws(() => getNetworkPassphrase("unknown:network"), /Unknown Stellar network/);
});

test("getRpcUrl uses defaults and overrides", () => {
  assert.equal(getRpcUrl(STELLAR_TESTNET_CAIP2), "https://soroban-testnet.stellar.org");
  assert.equal(
    getRpcUrl(STELLAR_TESTNET_CAIP2, { url: "https://custom-testnet-rpc.example" }),
    "https://custom-testnet-rpc.example",
  );
  assert.equal(
    getRpcUrl(STELLAR_PUBNET_CAIP2, { url: "https://mainnet-rpc.example" }),
    "https://mainnet-rpc.example",
  );
});

test("getRpcUrl throws for pubnet without custom RPC URL", () => {
  assert.throws(() => getRpcUrl(STELLAR_PUBNET_CAIP2), /requires a non-empty rpcUrl/);
});

test("getUsdcAddress resolves known networks", () => {
  assert.equal(getUsdcAddress(STELLAR_TESTNET_CAIP2), USDC_TESTNET_ADDRESS);
  assert.equal(getUsdcAddress(STELLAR_PUBNET_CAIP2), USDC_PUBNET_ADDRESS);
});

test("getUsdcAddress throws for unknown network", () => {
  assert.throws(() => getUsdcAddress("unknown:network"), /No USDC address configured/);
});

test("convertToTokenAmount handles decimals and scientific notation", () => {
  assert.equal(convertToTokenAmount("0.1", 7), "1000000");
  assert.equal(convertToTokenAmount("1.5", 7), "15000000");
  assert.equal(convertToTokenAmount("1e-7", 7), "1");
  assert.equal(convertToTokenAmount("0.00000009", 7), "0");
  assert.equal(convertToTokenAmount("0001.2300", 2), "123");
});

test("convertToTokenAmount validates amount and decimals", () => {
  assert.throws(() => convertToTokenAmount("abc"), /Invalid amount/);
  assert.throws(() => convertToTokenAmount("1", -1), /between 0 and 20/);
  assert.throws(() => convertToTokenAmount("1", 21), /between 0 and 20/);
});

test("getEstimatedLedgerCloseTimeSeconds computes average interval", async () => {
  const result = await getEstimatedLedgerCloseTimeSeconds({
    getLatestLedger: async () => ({ sequence: 200 }),
    getLedgers: async () => ({
      ledgers: [
        { ledgerCloseTime: "100" },
        { ledgerCloseTime: "107" },
        { ledgerCloseTime: "113" },
      ],
    }),
  } as never);

  assert.equal(result, 7);
});

test("getEstimatedLedgerCloseTimeSeconds falls back when insufficient samples", async () => {
  const result = await getEstimatedLedgerCloseTimeSeconds({
    getLatestLedger: async () => ({ sequence: 200 }),
    getLedgers: async () => ({
      ledgers: [{ ledgerCloseTime: "100" }],
    }),
  } as never);

  assert.equal(result, DEFAULT_ESTIMATED_LEDGER_SECONDS);
});

test("getEstimatedLedgerCloseTimeSeconds falls back on RPC errors", async () => {
  const result = await getEstimatedLedgerCloseTimeSeconds({
    getLatestLedger: async () => {
      throw new Error("rpc unavailable");
    },
  } as never);

  assert.equal(result, DEFAULT_ESTIMATED_LEDGER_SECONDS);
});
