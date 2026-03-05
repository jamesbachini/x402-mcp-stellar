import test from "node:test";
import assert from "node:assert/strict";

import {
  ExactStellarScheme,
  invalidVerifyResponse,
  validVerifyResponse,
} from "./scheme.js";

const signerA = {
  address: "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
  signAuthEntry: () => Promise.resolve({}),
  signTransaction: () => Promise.resolve({ signedTxXdr: "AAAA", error: undefined }),
};

const signerB = {
  address: "GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBXH6",
  signAuthEntry: () => Promise.resolve({}),
  signTransaction: () => Promise.resolve({ signedTxXdr: "BBBB", error: undefined }),
};

test("invalidVerifyResponse and validVerifyResponse produce expected shapes", () => {
  assert.deepEqual(invalidVerifyResponse("network_mismatch", "GABC"), {
    isValid: false,
    invalidReason: "network_mismatch",
    payer: "GABC",
  });

  assert.deepEqual(validVerifyResponse("GABC"), {
    isValid: true,
    payer: "GABC",
  });
});

test("constructor rejects empty signer arrays", () => {
  assert.throws(() => new ExactStellarScheme([]), /At least one signer is required/);
});

test("getExtra returns areFeesSponsored config", () => {
  const defaultScheme = new ExactStellarScheme([signerA] as never);
  const unsponsoredScheme = new ExactStellarScheme([signerA] as never, {
    areFeesSponsored: false,
  });

  assert.deepEqual(defaultScheme.getExtra("stellar:testnet"), { areFeesSponsored: true });
  assert.deepEqual(unsponsoredScheme.getExtra("stellar:testnet"), { areFeesSponsored: false });
});

test("getSigners returns all configured signer addresses", () => {
  const scheme = new ExactStellarScheme([signerA, signerB] as never);

  const signers = scheme.getSigners("stellar:testnet").sort();
  assert.deepEqual(signers, [signerA.address, signerB.address].sort());
});
