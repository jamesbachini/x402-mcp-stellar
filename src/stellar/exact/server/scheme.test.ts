import test from "node:test";
import assert from "node:assert/strict";

import { ExactStellarScheme } from "./scheme.js";
import { STELLAR_TESTNET_CAIP2, USDC_TESTNET_ADDRESS } from "../../constants.js";

const baseRequirements = {
  scheme: "exact",
  network: STELLAR_TESTNET_CAIP2,
  maxAmountRequired: "100",
  resource: "/resource",
  description: "test",
  mimeType: "application/json",
  payTo: "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
  maxTimeoutSeconds: 60,
  asset: USDC_TESTNET_ADDRESS,
  amount: "10",
  outputSchema: undefined,
  extra: {},
};

test("parsePrice returns AssetAmount directly when already provided", async () => {
  const scheme = new ExactStellarScheme();

  const result = await scheme.parsePrice(
    {
      amount: "42",
      asset: USDC_TESTNET_ADDRESS,
      extra: { tag: "existing" },
    },
    STELLAR_TESTNET_CAIP2,
  );

  assert.deepEqual(result, {
    amount: "42",
    asset: USDC_TESTNET_ADDRESS,
    extra: { tag: "existing" },
  });
});

test("parsePrice rejects AssetAmount without asset", async () => {
  const scheme = new ExactStellarScheme();

  await assert.rejects(
    scheme.parsePrice({ amount: "42", asset: "" } as never, STELLAR_TESTNET_CAIP2),
    /Asset address must be specified/,
  );
});

test("parsePrice uses custom parser chain in registration order", async () => {
  const scheme = new ExactStellarScheme();

  scheme
    .registerMoneyParser(async () => null)
    .registerMoneyParser(async (amount, network) => {
      assert.equal(amount, 1.5);
      assert.equal(network, STELLAR_TESTNET_CAIP2);
      return {
        amount: "150",
        asset: USDC_TESTNET_ADDRESS,
        extra: { parser: "custom" },
      };
    });

  const result = await scheme.parsePrice("$1.50", STELLAR_TESTNET_CAIP2);

  assert.deepEqual(result, {
    amount: "150",
    asset: USDC_TESTNET_ADDRESS,
    extra: { parser: "custom" },
  });
});

test("parsePrice falls back to default USDC conversion", async () => {
  const scheme = new ExactStellarScheme();

  const result = await scheme.parsePrice("1.5", STELLAR_TESTNET_CAIP2);

  assert.deepEqual(result, {
    amount: "15000000",
    asset: USDC_TESTNET_ADDRESS,
    extra: {},
  });
});

test("parsePrice rejects invalid money strings", async () => {
  const scheme = new ExactStellarScheme();

  await assert.rejects(scheme.parsePrice("$not-a-number", STELLAR_TESTNET_CAIP2), /Invalid money format/);
});

test("enhancePaymentRequirements injects areFeesSponsored when boolean", async () => {
  const scheme = new ExactStellarScheme();

  const result = await scheme.enhancePaymentRequirements(
    baseRequirements as never,
    {
      x402Version: 2,
      scheme: "exact",
      network: STELLAR_TESTNET_CAIP2,
      extra: { areFeesSponsored: true },
    },
    [],
  );

  assert.equal(result.extra?.areFeesSponsored, true);
});

test("enhancePaymentRequirements ignores non-boolean areFeesSponsored", async () => {
  const scheme = new ExactStellarScheme();

  const result = await scheme.enhancePaymentRequirements(
    baseRequirements as never,
    {
      x402Version: 2,
      scheme: "exact",
      network: STELLAR_TESTNET_CAIP2,
      extra: { areFeesSponsored: "true" },
    },
    [],
  );

  assert.equal(result.extra?.areFeesSponsored, undefined);
});
