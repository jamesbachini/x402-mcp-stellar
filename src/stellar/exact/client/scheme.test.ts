import assert from "node:assert/strict";
import test from "node:test";
import { STELLAR_PUBNET_CAIP2, STELLAR_TESTNET_CAIP2 } from "../../constants";
import { getPaymentTransactionBaseFeeStroops } from "./scheme";

test("uses a 1 stroop payment transaction base fee on testnet", () => {
  assert.equal(getPaymentTransactionBaseFeeStroops(STELLAR_TESTNET_CAIP2), 1);
});

test("keeps the normal payment transaction base fee on mainnet", () => {
  assert.equal(getPaymentTransactionBaseFeeStroops(STELLAR_PUBNET_CAIP2), 10_000);
});
