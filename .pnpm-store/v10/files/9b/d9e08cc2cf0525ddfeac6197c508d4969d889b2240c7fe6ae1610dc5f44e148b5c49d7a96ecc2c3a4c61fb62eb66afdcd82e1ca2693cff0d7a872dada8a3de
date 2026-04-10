"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/offer-receipt/index.ts
var offer_receipt_exports = {};
__export(offer_receipt_exports, {
  OFFER_RECEIPT: () => OFFER_RECEIPT,
  OFFER_TYPES: () => OFFER_TYPES,
  RECEIPT_TYPES: () => RECEIPT_TYPES,
  canonicalize: () => canonicalize,
  convertNetworkStringToCAIP2: () => convertNetworkStringToCAIP2,
  createEIP712OfferReceiptIssuer: () => createEIP712OfferReceiptIssuer,
  createJWS: () => createJWS,
  createJWSOfferReceiptIssuer: () => createJWSOfferReceiptIssuer,
  createOfferDomain: () => createOfferDomain,
  createOfferEIP712: () => createOfferEIP712,
  createOfferJWS: () => createOfferJWS,
  createOfferReceiptExtension: () => createOfferReceiptExtension,
  createReceiptDomain: () => createReceiptDomain,
  createReceiptEIP712: () => createReceiptEIP712,
  createReceiptJWS: () => createReceiptJWS,
  declareOfferReceiptExtension: () => declareOfferReceiptExtension,
  decodeSignedOffers: () => decodeSignedOffers,
  extractChainIdFromCAIP2: () => extractChainIdFromCAIP2,
  extractEIP155ChainId: () => extractEIP155ChainId,
  extractJWSHeader: () => extractJWSHeader,
  extractJWSPayload: () => extractJWSPayload,
  extractOfferPayload: () => extractOfferPayload,
  extractOffersFromPaymentRequired: () => extractOffersFromPaymentRequired,
  extractPublicKeyFromKid: () => extractPublicKeyFromKid,
  extractReceiptFromResponse: () => extractReceiptFromResponse,
  extractReceiptPayload: () => extractReceiptPayload,
  findAcceptsObjectFromSignedOffer: () => findAcceptsObjectFromSignedOffer,
  getCanonicalBytes: () => getCanonicalBytes,
  hashCanonical: () => hashCanonical,
  hashOfferTypedData: () => hashOfferTypedData,
  hashReceiptTypedData: () => hashReceiptTypedData,
  isEIP712SignedOffer: () => isEIP712SignedOffer,
  isEIP712SignedReceipt: () => isEIP712SignedReceipt,
  isEIP712Signer: () => isEIP712Signer,
  isJWSSignedOffer: () => isJWSSignedOffer,
  isJWSSignedReceipt: () => isJWSSignedReceipt,
  isJWSSigner: () => isJWSSigner,
  prepareOfferForEIP712: () => prepareOfferForEIP712,
  prepareReceiptForEIP712: () => prepareReceiptForEIP712,
  signOfferEIP712: () => signOfferEIP712,
  signReceiptEIP712: () => signReceiptEIP712,
  verifyOfferSignatureEIP712: () => verifyOfferSignatureEIP712,
  verifyOfferSignatureJWS: () => verifyOfferSignatureJWS,
  verifyReceiptMatchesOffer: () => verifyReceiptMatchesOffer,
  verifyReceiptSignatureEIP712: () => verifyReceiptSignatureEIP712,
  verifyReceiptSignatureJWS: () => verifyReceiptSignatureJWS
});
module.exports = __toCommonJS(offer_receipt_exports);

// src/offer-receipt/types.ts
var OFFER_RECEIPT = "offer-receipt";
function isJWSSignedOffer(offer) {
  return offer.format === "jws";
}
function isEIP712SignedOffer(offer) {
  return offer.format === "eip712";
}
function isJWSSignedReceipt(receipt) {
  return receipt.format === "jws";
}
function isEIP712SignedReceipt(receipt) {
  return receipt.format === "eip712";
}
function isJWSSigner(signer) {
  return signer.format === "jws";
}
function isEIP712Signer(signer) {
  return signer.format === "eip712";
}

// src/offer-receipt/signing.ts
var jose2 = __toESM(require("jose"));
var import_viem = require("viem");

// src/offer-receipt/did.ts
var jose = __toESM(require("jose"));
var import_base = require("@scure/base");
var import_secp256k1 = require("@noble/curves/secp256k1");
var import_nist = require("@noble/curves/nist");
var MULTICODEC_ED25519_PUB = 237;
var MULTICODEC_SECP256K1_PUB = 231;
var MULTICODEC_P256_PUB = 4608;
async function extractPublicKeyFromKid(kid) {
  const [didPart, fragment] = kid.split("#");
  const parts = didPart.split(":");
  if (parts.length < 3 || parts[0] !== "did") {
    throw new Error(`Invalid DID format: ${kid}`);
  }
  const method = parts[1];
  const identifier = parts.slice(2).join(":");
  switch (method) {
    case "key":
      return extractKeyFromDidKey(identifier);
    case "jwk":
      return extractKeyFromDidJwk(identifier);
    case "web":
      return resolveDidWeb(identifier, fragment);
    default:
      throw new Error(
        `Unsupported DID method "${method}". Supported: did:key, did:jwk, did:web. Provide the public key directly for other methods.`
      );
  }
}
async function extractKeyFromDidKey(identifier) {
  if (!identifier.startsWith("z")) {
    throw new Error(`Unsupported multibase encoding. Expected 'z' (base58-btc).`);
  }
  const decoded = import_base.base58.decode(identifier.slice(1));
  const { codec, keyBytes } = readMulticodec(decoded);
  switch (codec) {
    case MULTICODEC_ED25519_PUB:
      return importAsymmetricJWK({
        kty: "OKP",
        crv: "Ed25519",
        x: jose.base64url.encode(keyBytes)
      });
    case MULTICODEC_SECP256K1_PUB: {
      const point = import_secp256k1.secp256k1.Point.fromHex(keyBytes);
      const uncompressed = point.toBytes(false);
      return importAsymmetricJWK({
        kty: "EC",
        crv: "secp256k1",
        x: jose.base64url.encode(uncompressed.slice(1, 33)),
        y: jose.base64url.encode(uncompressed.slice(33, 65))
      });
    }
    case MULTICODEC_P256_PUB: {
      const point = import_nist.p256.Point.fromHex(keyBytes);
      const uncompressed = point.toBytes(false);
      return importAsymmetricJWK({
        kty: "EC",
        crv: "P-256",
        x: jose.base64url.encode(uncompressed.slice(1, 33)),
        y: jose.base64url.encode(uncompressed.slice(33, 65))
      });
    }
    default:
      throw new Error(
        `Unsupported key type in did:key (multicodec: 0x${codec.toString(16)}). Supported: Ed25519, secp256k1, P-256.`
      );
  }
}
async function extractKeyFromDidJwk(identifier) {
  const jwkJson = new TextDecoder().decode(jose.base64url.decode(identifier));
  const jwk = JSON.parse(jwkJson);
  return importAsymmetricJWK(jwk);
}
async function resolveDidWeb(identifier, fragment) {
  const parts = identifier.split(":");
  const domain = decodeURIComponent(parts[0]);
  const path = parts.slice(1).map(decodeURIComponent).join("/");
  const host = domain.split(":")[0];
  const scheme = host === "localhost" || host === "127.0.0.1" ? "http" : "https";
  const url = path ? `${scheme}://${domain}/${path}/did.json` : `${scheme}://${domain}/.well-known/did.json`;
  let didDocument;
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/did+json, application/json" }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    didDocument = await response.json();
  } catch (error) {
    throw new Error(
      `Failed to resolve did:web:${identifier}: ${error instanceof Error ? error.message : error}`
    );
  }
  const fullDid = `did:web:${identifier}`;
  const keyId = fragment ? `${fullDid}#${fragment}` : void 0;
  const method = findVerificationMethod(didDocument, keyId);
  if (!method) {
    throw new Error(`No verification method found for ${keyId || fullDid}`);
  }
  if (method.publicKeyJwk) {
    return importAsymmetricJWK(method.publicKeyJwk);
  }
  if (method.publicKeyMultibase) {
    return extractKeyFromDidKey(method.publicKeyMultibase);
  }
  throw new Error(`Verification method ${method.id} has no supported key format`);
}
function readMulticodec(bytes) {
  let codec = 0;
  let shift = 0;
  let offset = 0;
  for (const byte of bytes) {
    codec |= (byte & 127) << shift;
    offset++;
    if ((byte & 128) === 0) break;
    shift += 7;
  }
  return { codec, keyBytes: bytes.slice(offset) };
}
async function importAsymmetricJWK(jwk) {
  const key = await jose.importJWK(jwk);
  if (key instanceof Uint8Array) {
    throw new Error("Symmetric keys are not supported");
  }
  return key;
}
function findVerificationMethod(doc, keyId) {
  const methods = doc.verificationMethod || [];
  if (keyId) {
    return methods.find((m) => m.id === keyId);
  }
  for (const ref of doc.assertionMethod || []) {
    if (typeof ref === "string") {
      const m = methods.find((m2) => m2.id === ref);
      if (m) return m;
    } else {
      return ref;
    }
  }
  for (const ref of doc.authentication || []) {
    if (typeof ref === "string") {
      const m = methods.find((m2) => m2.id === ref);
      if (m) return m;
    } else {
      return ref;
    }
  }
  return methods[0];
}

// src/offer-receipt/signing.ts
function canonicalize(value) {
  return serializeValue(value);
}
function serializeValue(value) {
  if (value === null) return "null";
  if (value === void 0) return "null";
  const type = typeof value;
  if (type === "boolean") return value ? "true" : "false";
  if (type === "number") return serializeNumber(value);
  if (type === "string") return serializeString(value);
  if (Array.isArray(value)) return serializeArray(value);
  if (type === "object") return serializeObject(value);
  throw new Error(`Cannot canonicalize value of type ${type}`);
}
function serializeNumber(num) {
  if (!Number.isFinite(num)) throw new Error("Cannot canonicalize Infinity or NaN");
  if (Object.is(num, -0)) return "0";
  return String(num);
}
function serializeString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = str.charCodeAt(i);
    if (code < 32) {
      result += "\\u" + code.toString(16).padStart(4, "0");
    } else if (char === '"') {
      result += '\\"';
    } else if (char === "\\") {
      result += "\\\\";
    } else {
      result += char;
    }
  }
  return result + '"';
}
function serializeArray(arr) {
  return "[" + arr.map(serializeValue).join(",") + "]";
}
function serializeObject(obj) {
  const keys = Object.keys(obj).sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const pairs = [];
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      pairs.push(serializeString(key) + ":" + serializeValue(value));
    }
  }
  return "{" + pairs.join(",") + "}";
}
async function hashCanonical(obj) {
  const canonical = canonicalize(obj);
  const data = new TextEncoder().encode(canonical);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
}
function getCanonicalBytes(obj) {
  return new TextEncoder().encode(canonicalize(obj));
}
async function createJWS(payload, signer) {
  const headerObj = { alg: signer.algorithm, kid: signer.kid };
  const headerB64 = jose2.base64url.encode(new TextEncoder().encode(JSON.stringify(headerObj)));
  const canonical = canonicalize(payload);
  const payloadB64 = jose2.base64url.encode(new TextEncoder().encode(canonical));
  const signingInput = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signatureB64 = await signer.sign(signingInput);
  return `${headerB64}.${payloadB64}.${signatureB64}`;
}
function extractJWSHeader(jws) {
  const parts = jws.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWS format");
  const headerJson = jose2.base64url.decode(parts[0]);
  return JSON.parse(new TextDecoder().decode(headerJson));
}
function extractJWSPayload(jws) {
  const parts = jws.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWS format");
  const payloadJson = jose2.base64url.decode(parts[1]);
  return JSON.parse(new TextDecoder().decode(payloadJson));
}
function createOfferDomain() {
  return { name: "x402 offer", version: "1", chainId: 1 };
}
function createReceiptDomain() {
  return { name: "x402 receipt", version: "1", chainId: 1 };
}
var OFFER_TYPES = {
  Offer: [
    { name: "version", type: "uint256" },
    { name: "resourceUrl", type: "string" },
    { name: "scheme", type: "string" },
    { name: "network", type: "string" },
    { name: "asset", type: "string" },
    { name: "payTo", type: "string" },
    { name: "amount", type: "string" },
    { name: "validUntil", type: "uint256" }
  ]
};
var RECEIPT_TYPES = {
  Receipt: [
    { name: "version", type: "uint256" },
    { name: "network", type: "string" },
    { name: "resourceUrl", type: "string" },
    { name: "payer", type: "string" },
    { name: "issuedAt", type: "uint256" },
    { name: "transaction", type: "string" }
  ]
};
function prepareOfferForEIP712(payload) {
  return {
    version: BigInt(payload.version),
    resourceUrl: payload.resourceUrl,
    scheme: payload.scheme,
    network: payload.network,
    asset: payload.asset,
    payTo: payload.payTo,
    amount: payload.amount,
    validUntil: BigInt(payload.validUntil)
  };
}
function prepareReceiptForEIP712(payload) {
  return {
    version: BigInt(payload.version),
    network: payload.network,
    resourceUrl: payload.resourceUrl,
    payer: payload.payer,
    issuedAt: BigInt(payload.issuedAt),
    transaction: payload.transaction
  };
}
function hashOfferTypedData(payload) {
  return (0, import_viem.hashTypedData)({
    domain: createOfferDomain(),
    types: OFFER_TYPES,
    primaryType: "Offer",
    message: prepareOfferForEIP712(payload)
  });
}
function hashReceiptTypedData(payload) {
  return (0, import_viem.hashTypedData)({
    domain: createReceiptDomain(),
    types: RECEIPT_TYPES,
    primaryType: "Receipt",
    message: prepareReceiptForEIP712(payload)
  });
}
async function signOfferEIP712(payload, signTypedData) {
  return signTypedData({
    domain: createOfferDomain(),
    types: OFFER_TYPES,
    primaryType: "Offer",
    message: prepareOfferForEIP712(payload)
  });
}
async function signReceiptEIP712(payload, signTypedData) {
  return signTypedData({
    domain: createReceiptDomain(),
    types: RECEIPT_TYPES,
    primaryType: "Receipt",
    message: prepareReceiptForEIP712(payload)
  });
}
function extractEIP155ChainId(network) {
  const match = network.match(/^eip155:(\d+)$/);
  if (!match) {
    throw new Error(`Invalid network format: ${network}. Expected "eip155:<chainId>"`);
  }
  return parseInt(match[1], 10);
}
var V1_EVM_NETWORK_CHAIN_IDS = {
  ethereum: 1,
  sepolia: 11155111,
  abstract: 2741,
  "abstract-testnet": 11124,
  "base-sepolia": 84532,
  base: 8453,
  "avalanche-fuji": 43113,
  avalanche: 43114,
  iotex: 4689,
  sei: 1329,
  "sei-testnet": 1328,
  polygon: 137,
  "polygon-amoy": 80002,
  peaq: 3338,
  story: 1514,
  educhain: 41923,
  "skale-base-sepolia": 324705682
};
var V1_SOLANA_NETWORKS = {
  solana: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "solana-devnet": "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "solana-testnet": "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"
};
function convertNetworkStringToCAIP2(network) {
  if (network.includes(":")) return network;
  const chainId = V1_EVM_NETWORK_CHAIN_IDS[network.toLowerCase()];
  if (chainId !== void 0) {
    return `eip155:${chainId}`;
  }
  const solanaNetwork = V1_SOLANA_NETWORKS[network.toLowerCase()];
  if (solanaNetwork) {
    return solanaNetwork;
  }
  throw new Error(
    `Unknown network identifier: "${network}". Expected CAIP-2 format (e.g., "eip155:8453") or v1 name (e.g., "base", "solana").`
  );
}
function extractChainIdFromCAIP2(network) {
  const [namespace, reference] = network.split(":");
  if (namespace === "eip155" && reference) {
    const chainId = parseInt(reference, 10);
    return isNaN(chainId) ? void 0 : chainId;
  }
  return void 0;
}
var DEFAULT_MAX_TIMEOUT_SECONDS = 300;
var EXTENSION_VERSION = 1;
function createOfferPayload(resourceUrl, input) {
  const now = Math.floor(Date.now() / 1e3);
  const offerValiditySeconds = input.offerValiditySeconds ?? DEFAULT_MAX_TIMEOUT_SECONDS;
  return {
    version: EXTENSION_VERSION,
    resourceUrl,
    scheme: input.scheme,
    network: input.network,
    asset: input.asset,
    payTo: input.payTo,
    amount: input.amount,
    validUntil: now + offerValiditySeconds
  };
}
async function createOfferJWS(resourceUrl, input, signer) {
  const payload = createOfferPayload(resourceUrl, input);
  const jws = await createJWS(payload, signer);
  return {
    format: "jws",
    acceptIndex: input.acceptIndex,
    signature: jws
  };
}
async function createOfferEIP712(resourceUrl, input, signTypedData) {
  const payload = createOfferPayload(resourceUrl, input);
  const signature = await signOfferEIP712(payload, signTypedData);
  return {
    format: "eip712",
    acceptIndex: input.acceptIndex,
    payload,
    signature
  };
}
function extractOfferPayload(offer) {
  if (isJWSSignedOffer(offer)) {
    return extractJWSPayload(offer.signature);
  } else if (isEIP712SignedOffer(offer)) {
    return offer.payload;
  }
  throw new Error(`Unknown offer format: ${offer.format}`);
}
function createReceiptPayloadForEIP712(input) {
  return {
    version: EXTENSION_VERSION,
    network: input.network,
    resourceUrl: input.resourceUrl,
    payer: input.payer,
    issuedAt: Math.floor(Date.now() / 1e3),
    transaction: input.transaction ?? ""
  };
}
function createReceiptPayloadForJWS(input) {
  const payload = {
    version: EXTENSION_VERSION,
    network: input.network,
    resourceUrl: input.resourceUrl,
    payer: input.payer,
    issuedAt: Math.floor(Date.now() / 1e3)
  };
  if (input.transaction) {
    payload.transaction = input.transaction;
  }
  return payload;
}
async function createReceiptJWS(input, signer) {
  const payload = createReceiptPayloadForJWS(input);
  const jws = await createJWS(payload, signer);
  return { format: "jws", signature: jws };
}
async function createReceiptEIP712(input, signTypedData) {
  const payload = createReceiptPayloadForEIP712(input);
  const signature = await signReceiptEIP712(payload, signTypedData);
  return { format: "eip712", payload, signature };
}
function extractReceiptPayload(receipt) {
  if (isJWSSignedReceipt(receipt)) {
    return extractJWSPayload(receipt.signature);
  } else if (isEIP712SignedReceipt(receipt)) {
    return receipt.payload;
  }
  throw new Error(`Unknown receipt format: ${receipt.format}`);
}
async function verifyOfferSignatureEIP712(offer) {
  if (offer.format !== "eip712") {
    throw new Error(`Expected eip712 format, got ${offer.format}`);
  }
  if (!offer.payload || !("scheme" in offer.payload)) {
    throw new Error("Invalid offer: missing or malformed payload");
  }
  const signer = await (0, import_viem.recoverTypedDataAddress)({
    domain: createOfferDomain(),
    types: OFFER_TYPES,
    primaryType: "Offer",
    message: prepareOfferForEIP712(offer.payload),
    signature: offer.signature
  });
  return { signer, payload: offer.payload };
}
async function verifyReceiptSignatureEIP712(receipt) {
  if (receipt.format !== "eip712") {
    throw new Error(`Expected eip712 format, got ${receipt.format}`);
  }
  if (!receipt.payload || !("payer" in receipt.payload)) {
    throw new Error("Invalid receipt: missing or malformed payload");
  }
  const signer = await (0, import_viem.recoverTypedDataAddress)({
    domain: createReceiptDomain(),
    types: RECEIPT_TYPES,
    primaryType: "Receipt",
    message: prepareReceiptForEIP712(receipt.payload),
    signature: receipt.signature
  });
  return { signer, payload: receipt.payload };
}
async function verifyOfferSignatureJWS(offer, publicKey) {
  if (offer.format !== "jws") {
    throw new Error(`Expected jws format, got ${offer.format}`);
  }
  const key = await resolveVerificationKey(offer.signature, publicKey);
  const { payload } = await jose2.compactVerify(offer.signature, key);
  return JSON.parse(new TextDecoder().decode(payload));
}
async function verifyReceiptSignatureJWS(receipt, publicKey) {
  if (receipt.format !== "jws") {
    throw new Error(`Expected jws format, got ${receipt.format}`);
  }
  const key = await resolveVerificationKey(receipt.signature, publicKey);
  const { payload } = await jose2.compactVerify(receipt.signature, key);
  return JSON.parse(new TextDecoder().decode(payload));
}
async function resolveVerificationKey(jws, providedKey) {
  if (providedKey) {
    if ("kty" in providedKey) {
      const key = await jose2.importJWK(providedKey);
      if (key instanceof Uint8Array) {
        throw new Error("Symmetric keys are not supported for JWS verification");
      }
      return key;
    }
    return providedKey;
  }
  const header = extractJWSHeader(jws);
  if (!header.kid) {
    throw new Error("No public key provided and JWS header missing kid");
  }
  return extractPublicKeyFromKid(header.kid);
}

// src/offer-receipt/server.ts
var OFFER_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    offers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          format: { type: "string" },
          acceptIndex: { type: "integer" },
          payload: {
            type: "object",
            properties: {
              version: { type: "integer" },
              resourceUrl: { type: "string" },
              scheme: { type: "string" },
              network: { type: "string" },
              asset: { type: "string" },
              payTo: { type: "string" },
              amount: { type: "string" },
              validUntil: { type: "integer" }
            },
            required: ["version", "resourceUrl", "scheme", "network", "asset", "payTo", "amount"]
          },
          signature: { type: "string" }
        },
        required: ["format", "signature"]
      }
    }
  },
  required: ["offers"]
};
var RECEIPT_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    receipt: {
      type: "object",
      properties: {
        format: { type: "string" },
        payload: {
          type: "object",
          properties: {
            version: { type: "integer" },
            network: { type: "string" },
            resourceUrl: { type: "string" },
            payer: { type: "string" },
            issuedAt: { type: "integer" },
            transaction: { type: "string" }
          },
          required: ["version", "network", "resourceUrl", "payer", "issuedAt"]
        },
        signature: { type: "string" }
      },
      required: ["format", "signature"]
    }
  },
  required: ["receipt"]
};
function requirementsToOfferInput(requirements, acceptIndex, offerValiditySeconds) {
  return {
    acceptIndex,
    scheme: requirements.scheme,
    network: requirements.network,
    asset: requirements.asset,
    payTo: requirements.payTo,
    amount: requirements.amount,
    offerValiditySeconds: offerValiditySeconds ?? requirements.maxTimeoutSeconds
  };
}
function createOfferReceiptExtension(issuer) {
  return {
    key: OFFER_RECEIPT,
    // Add signed offers to 402 PaymentRequired response
    enrichPaymentRequiredResponse: async (declaration, context) => {
      const config = declaration;
      const resourceUrl = context.paymentRequiredResponse.resource?.url || context.transportContext?.request?.adapter?.getUrl?.();
      if (!resourceUrl) {
        console.warn("[offer-receipt] No resource URL available for signing offers");
        return void 0;
      }
      const offers = [];
      for (let i = 0; i < context.requirements.length; i++) {
        const requirement = context.requirements[i];
        try {
          const offerInput = requirementsToOfferInput(requirement, i, config?.offerValiditySeconds);
          const signedOffer = await issuer.issueOffer(resourceUrl, offerInput);
          offers.push(signedOffer);
        } catch (error) {
          console.error(`[offer-receipt] Failed to sign offer for requirement ${i}:`, error);
        }
      }
      if (offers.length === 0) {
        return void 0;
      }
      return {
        info: {
          offers
        },
        schema: OFFER_SCHEMA
      };
    },
    // Add signed receipt to settlement response
    enrichSettlementResponse: async (declaration, context) => {
      const config = declaration;
      if (!context.result.success) {
        return void 0;
      }
      const payer = context.result.payer;
      if (!payer) {
        console.warn("[offer-receipt] No payer available for signing receipt");
        return void 0;
      }
      const network = context.result.network;
      if (!network) {
        console.warn("[offer-receipt] No network available for signing receipt");
        return void 0;
      }
      const transaction = context.result.transaction;
      const resourceUrl = context.transportContext?.request?.adapter?.getUrl?.();
      if (!resourceUrl) {
        console.warn("[offer-receipt] No resource URL available for signing receipt");
        return void 0;
      }
      const includeTxHash = config?.includeTxHash === true;
      try {
        const signedReceipt = await issuer.issueReceipt(
          resourceUrl,
          payer,
          network,
          includeTxHash ? transaction || void 0 : void 0
        );
        return {
          info: {
            receipt: signedReceipt
          },
          schema: RECEIPT_SCHEMA
        };
      } catch (error) {
        console.error("[offer-receipt] Failed to sign receipt:", error);
        return void 0;
      }
    }
  };
}
function declareOfferReceiptExtension(config) {
  return {
    [OFFER_RECEIPT]: {
      includeTxHash: config?.includeTxHash,
      offerValiditySeconds: config?.offerValiditySeconds
    }
  };
}
function createJWSOfferReceiptIssuer(kid, jwsSigner) {
  return {
    kid,
    format: "jws",
    async issueOffer(resourceUrl, input) {
      return createOfferJWS(resourceUrl, input, jwsSigner);
    },
    async issueReceipt(resourceUrl, payer, network, transaction) {
      return createReceiptJWS({ resourceUrl, payer, network, transaction }, jwsSigner);
    }
  };
}
function createEIP712OfferReceiptIssuer(kid, signTypedData) {
  return {
    kid,
    format: "eip712",
    async issueOffer(resourceUrl, input) {
      return createOfferEIP712(resourceUrl, input, signTypedData);
    },
    async issueReceipt(resourceUrl, payer, network, transaction) {
      return createReceiptEIP712({ resourceUrl, payer, network, transaction }, signTypedData);
    }
  };
}

// src/offer-receipt/client.ts
var import_http = require("@x402/core/http");
function verifyReceiptMatchesOffer(receipt, offer, payerAddresses, maxAgeSeconds = 3600) {
  const payload = extractReceiptPayload(receipt);
  const resourceUrlMatch = payload.resourceUrl === offer.resourceUrl;
  const networkMatch = payload.network === offer.network;
  const payerMatch = payerAddresses.some(
    (addr) => payload.payer.toLowerCase() === addr.toLowerCase()
  );
  const issuedRecently = Math.floor(Date.now() / 1e3) - payload.issuedAt < maxAgeSeconds;
  return resourceUrlMatch && networkMatch && payerMatch && issuedRecently;
}
function extractOffersFromPaymentRequired(paymentRequired) {
  const extData = paymentRequired.extensions?.[OFFER_RECEIPT];
  return extData?.info?.offers ?? [];
}
function decodeSignedOffers(offers) {
  return offers.map((offer) => {
    const payload = extractOfferPayload(offer);
    return {
      // Spread payload fields at top level
      ...payload,
      // Include metadata
      signedOffer: offer,
      format: offer.format,
      acceptIndex: offer.acceptIndex
    };
  });
}
function findAcceptsObjectFromSignedOffer(offer, accepts) {
  const isDecoded = "signedOffer" in offer;
  const payload = isDecoded ? offer : extractOfferPayload(offer);
  const acceptIndex = isDecoded ? offer.acceptIndex : offer.acceptIndex;
  if (acceptIndex !== void 0 && acceptIndex < accepts.length) {
    const hinted = accepts[acceptIndex];
    if (hinted.network === payload.network && hinted.scheme === payload.scheme && hinted.asset === payload.asset && hinted.payTo === payload.payTo && hinted.amount === payload.amount) {
      return hinted;
    }
  }
  return accepts.find(
    (req) => req.network === payload.network && req.scheme === payload.scheme && req.asset === payload.asset && req.payTo === payload.payTo && req.amount === payload.amount
  );
}
function extractReceiptFromResponse(response) {
  const paymentResponseHeader = response.headers.get("PAYMENT-RESPONSE") || response.headers.get("X-PAYMENT-RESPONSE");
  if (!paymentResponseHeader) {
    return void 0;
  }
  try {
    const settlementResponse = (0, import_http.decodePaymentResponseHeader)(paymentResponseHeader);
    const receiptExtData = settlementResponse.extensions?.[OFFER_RECEIPT];
    return receiptExtData?.info?.receipt;
  } catch {
    return void 0;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OFFER_RECEIPT,
  OFFER_TYPES,
  RECEIPT_TYPES,
  canonicalize,
  convertNetworkStringToCAIP2,
  createEIP712OfferReceiptIssuer,
  createJWS,
  createJWSOfferReceiptIssuer,
  createOfferDomain,
  createOfferEIP712,
  createOfferJWS,
  createOfferReceiptExtension,
  createReceiptDomain,
  createReceiptEIP712,
  createReceiptJWS,
  declareOfferReceiptExtension,
  decodeSignedOffers,
  extractChainIdFromCAIP2,
  extractEIP155ChainId,
  extractJWSHeader,
  extractJWSPayload,
  extractOfferPayload,
  extractOffersFromPaymentRequired,
  extractPublicKeyFromKid,
  extractReceiptFromResponse,
  extractReceiptPayload,
  findAcceptsObjectFromSignedOffer,
  getCanonicalBytes,
  hashCanonical,
  hashOfferTypedData,
  hashReceiptTypedData,
  isEIP712SignedOffer,
  isEIP712SignedReceipt,
  isEIP712Signer,
  isJWSSignedOffer,
  isJWSSignedReceipt,
  isJWSSigner,
  prepareOfferForEIP712,
  prepareReceiptForEIP712,
  signOfferEIP712,
  signReceiptEIP712,
  verifyOfferSignatureEIP712,
  verifyOfferSignatureJWS,
  verifyReceiptMatchesOffer,
  verifyReceiptSignatureEIP712,
  verifyReceiptSignatureJWS
});
//# sourceMappingURL=index.js.map