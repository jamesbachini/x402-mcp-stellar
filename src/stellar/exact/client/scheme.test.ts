import assert from "node:assert/strict";
import test from "node:test";
import { STELLAR_PUBNET_CAIP2, STELLAR_TESTNET_CAIP2 } from "../../constants";
import { getPaymentTransactionFeeStroops } from "./scheme";

test("uses a 1 stroop payment transaction fee on testnet", () => {
  assert.equal(getPaymentTransactionFeeStroops(STELLAR_TESTNET_CAIP2, 66_098), 1);
});

test("keeps the normal payment transaction fee on mainnet", () => {
  assert.equal(getPaymentTransactionFeeStroops(STELLAR_PUBNET_CAIP2, 66_098), 76_098);
});
