import test from "node:test";
import assert from "node:assert/strict";
import { Keypair } from "@stellar/stellar-sdk";

import {
  createEd25519Signer,
  isClientStellarSigner,
  isFacilitatorStellarSigner,
} from "./signer.js";

test("createEd25519Signer builds signer from secret key", () => {
  const kp = Keypair.random();
  const signer = createEd25519Signer(kp.secret());

  assert.equal(signer.address, kp.publicKey());
  assert.equal(typeof signer.signAuthEntry, "function");
  assert.equal(typeof signer.signTransaction, "function");
});

test("createEd25519Signer throws for invalid secret", () => {
  assert.throws(() => createEd25519Signer("invalid-secret"), /invalid encoded string/i);
});

test("isFacilitatorStellarSigner validates required shape", () => {
  const valid = {
    address: "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
    signAuthEntry: () => Promise.resolve({}),
    signTransaction: () => Promise.resolve({}),
  };

  assert.equal(isFacilitatorStellarSigner(valid), true);
  assert.equal(
    isFacilitatorStellarSigner({
      address: "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
      signAuthEntry: () => Promise.resolve({}),
    }),
    false,
  );
  assert.equal(isFacilitatorStellarSigner(null), false);
});

test("isClientStellarSigner validates optional signTransaction", () => {
  const withOptionalMethod = {
    address: "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
    signAuthEntry: () => Promise.resolve({}),
  };

  const withAllMethods = {
    ...withOptionalMethod,
    signTransaction: () => Promise.resolve({}),
  };

  assert.equal(isClientStellarSigner(withOptionalMethod), true);
  assert.equal(isClientStellarSigner(withAllMethods), true);
  assert.equal(
    isClientStellarSigner({
      ...withOptionalMethod,
      signTransaction: "not-a-function",
    }),
    false,
  );
});
