import {
  BAZAAR,
  bazaarResourceServerExtension,
  declareDiscoveryExtension,
  extractDiscoveryInfo,
  extractDiscoveryInfoFromExtension,
  extractDiscoveryInfoV1,
  extractResourceMetadataV1,
  isBodyExtensionConfig,
  isDiscoverableV1,
  isMcpExtensionConfig,
  isQueryExtensionConfig,
  isValidRouteTemplate,
  validateAndExtract,
  validateDiscoveryExtension,
  validateRouteTemplate,
  withBazaar
} from "./chunk-I2JLOI4L.mjs";
import {
  InMemorySIWxStorage,
  SIGN_IN_WITH_X,
  SIWxPayloadSchema,
  SOLANA_DEVNET,
  SOLANA_MAINNET,
  SOLANA_TESTNET,
  buildSIWxSchema,
  createSIWxClientHook,
  createSIWxMessage,
  createSIWxPayload,
  createSIWxRequestHook,
  createSIWxSettleHook,
  declareSIWxExtension,
  decodeBase58,
  encodeBase58,
  encodeSIWxHeader,
  extractEVMChainId,
  extractSolanaChainReference,
  formatSIWEMessage,
  formatSIWSMessage,
  getEVMAddress,
  getSolanaAddress,
  isEVMSigner,
  isSolanaSigner,
  parseSIWxHeader,
  signEVMMessage,
  signSolanaMessage,
  siwxResourceServerExtension,
  validateSIWxMessage,
  verifyEVMSignature,
  verifySIWxSignature,
  verifySolanaSignature,
  wrapFetchWithSIWx
} from "./chunk-5UYCX7A7.mjs";
import {
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
} from "./chunk-TYR4QHVX.mjs";
import {
  PAYMENT_IDENTIFIER,
  PAYMENT_ID_MAX_LENGTH,
  PAYMENT_ID_MIN_LENGTH,
  PAYMENT_ID_PATTERN,
  appendPaymentIdentifierToExtensions,
  declarePaymentIdentifierExtension,
  extractAndValidatePaymentIdentifier,
  extractPaymentIdentifier,
  generatePaymentId,
  hasPaymentIdentifier,
  isPaymentIdentifierExtension,
  isPaymentIdentifierRequired,
  isValidPaymentId,
  paymentIdentifierResourceServerExtension,
  paymentIdentifierSchema,
  validatePaymentIdentifier,
  validatePaymentIdentifierRequirement
} from "./chunk-73HCOE6N.mjs";

// src/eip2612-gas-sponsoring/types.ts
var EIP2612_GAS_SPONSORING = { key: "eip2612GasSponsoring" };

// src/eip2612-gas-sponsoring/resourceService.ts
var eip2612GasSponsoringSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    from: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]{40}$",
      description: "The address of the sender."
    },
    asset: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]{40}$",
      description: "The address of the ERC-20 token contract."
    },
    spender: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]{40}$",
      description: "The address of the spender (Canonical Permit2)."
    },
    amount: {
      type: "string",
      pattern: "^[0-9]+$",
      description: "The amount to approve (uint256). Typically MaxUint."
    },
    nonce: {
      type: "string",
      pattern: "^[0-9]+$",
      description: "The current nonce of the sender."
    },
    deadline: {
      type: "string",
      pattern: "^[0-9]+$",
      description: "The timestamp at which the signature expires."
    },
    signature: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]+$",
      description: "The 65-byte concatenated signature (r, s, v) as a hex string."
    },
    version: {
      type: "string",
      pattern: "^[0-9]+(\\.[0-9]+)*$",
      description: "Schema version identifier."
    }
  },
  required: ["from", "asset", "spender", "amount", "nonce", "deadline", "signature", "version"]
};
function declareEip2612GasSponsoringExtension() {
  const key = EIP2612_GAS_SPONSORING.key;
  return {
    [key]: {
      info: {
        description: "The facilitator accepts EIP-2612 gasless Permit to `Permit2` canonical contract.",
        version: "1"
      },
      schema: eip2612GasSponsoringSchema
    }
  };
}

// src/eip2612-gas-sponsoring/facilitator.ts
function extractEip2612GasSponsoringInfo(paymentPayload) {
  if (!paymentPayload.extensions) {
    return null;
  }
  const extension = paymentPayload.extensions[EIP2612_GAS_SPONSORING.key];
  if (!extension?.info) {
    return null;
  }
  const info = extension.info;
  if (!info.from || !info.asset || !info.spender || !info.amount || !info.nonce || !info.deadline || !info.signature || !info.version) {
    return null;
  }
  return info;
}
function validateEip2612GasSponsoringInfo(info) {
  const addressPattern = /^0x[a-fA-F0-9]{40}$/;
  const numericPattern = /^[0-9]+$/;
  const hexPattern = /^0x[a-fA-F0-9]+$/;
  const versionPattern = /^[0-9]+(\.[0-9]+)*$/;
  return addressPattern.test(info.from) && addressPattern.test(info.asset) && addressPattern.test(info.spender) && numericPattern.test(info.amount) && numericPattern.test(info.nonce) && numericPattern.test(info.deadline) && hexPattern.test(info.signature) && versionPattern.test(info.version);
}

// src/erc20-approval-gas-sponsoring/types.ts
var ERC20_APPROVAL_GAS_SPONSORING = {
  key: "erc20ApprovalGasSponsoring"
};
var ERC20_APPROVAL_GAS_SPONSORING_VERSION = "1";
function createErc20ApprovalGasSponsoringExtension(signer, signerForNetwork) {
  return { ...ERC20_APPROVAL_GAS_SPONSORING, signer, signerForNetwork };
}

// src/erc20-approval-gas-sponsoring/resourceService.ts
var erc20ApprovalGasSponsoringSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    from: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]{40}$",
      description: "The address of the sender (token owner)."
    },
    asset: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]{40}$",
      description: "The address of the ERC-20 token contract."
    },
    spender: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]{40}$",
      description: "The address of the spender (Canonical Permit2)."
    },
    amount: {
      type: "string",
      pattern: "^[0-9]+$",
      description: "The amount approved (uint256). Always MaxUint256."
    },
    signedTransaction: {
      type: "string",
      pattern: "^0x[a-fA-F0-9]+$",
      description: "The RLP-encoded signed EIP-1559 transaction as a hex string."
    },
    version: {
      type: "string",
      pattern: "^[0-9]+(\\.[0-9]+)*$",
      description: "Schema version identifier."
    }
  },
  required: ["from", "asset", "spender", "amount", "signedTransaction", "version"]
};
function declareErc20ApprovalGasSponsoringExtension() {
  const key = ERC20_APPROVAL_GAS_SPONSORING.key;
  return {
    [key]: {
      info: {
        description: "The facilitator broadcasts a pre-signed ERC-20 approve() transaction to grant Permit2 allowance.",
        version: ERC20_APPROVAL_GAS_SPONSORING_VERSION
      },
      schema: erc20ApprovalGasSponsoringSchema
    }
  };
}

// src/erc20-approval-gas-sponsoring/facilitator.ts
import Ajv from "ajv/dist/2020.js";
function extractErc20ApprovalGasSponsoringInfo(paymentPayload) {
  if (!paymentPayload.extensions) {
    return null;
  }
  const extension = paymentPayload.extensions[ERC20_APPROVAL_GAS_SPONSORING.key];
  if (!extension?.info) {
    return null;
  }
  const info = extension.info;
  if (!info.from || !info.asset || !info.spender || !info.amount || !info.signedTransaction || !info.version) {
    return null;
  }
  return info;
}
function validateErc20ApprovalGasSponsoringInfo(info) {
  const ajv = new Ajv({ strict: false, allErrors: true });
  const validate = ajv.compile(erc20ApprovalGasSponsoringSchema);
  return validate(info);
}
export {
  BAZAAR,
  EIP2612_GAS_SPONSORING,
  ERC20_APPROVAL_GAS_SPONSORING,
  ERC20_APPROVAL_GAS_SPONSORING_VERSION,
  InMemorySIWxStorage,
  OFFER_RECEIPT,
  OFFER_TYPES,
  PAYMENT_IDENTIFIER,
  PAYMENT_ID_MAX_LENGTH,
  PAYMENT_ID_MIN_LENGTH,
  PAYMENT_ID_PATTERN,
  RECEIPT_TYPES,
  SIGN_IN_WITH_X,
  SIWxPayloadSchema,
  SOLANA_DEVNET,
  SOLANA_MAINNET,
  SOLANA_TESTNET,
  appendPaymentIdentifierToExtensions,
  bazaarResourceServerExtension,
  buildSIWxSchema,
  canonicalize,
  convertNetworkStringToCAIP2,
  createEIP712OfferReceiptIssuer,
  createErc20ApprovalGasSponsoringExtension,
  createJWS,
  createJWSOfferReceiptIssuer,
  createOfferDomain,
  createOfferEIP712,
  createOfferJWS,
  createOfferReceiptExtension,
  createReceiptDomain,
  createReceiptEIP712,
  createReceiptJWS,
  createSIWxClientHook,
  createSIWxMessage,
  createSIWxPayload,
  createSIWxRequestHook,
  createSIWxSettleHook,
  declareDiscoveryExtension,
  declareEip2612GasSponsoringExtension,
  declareErc20ApprovalGasSponsoringExtension,
  declareOfferReceiptExtension,
  declarePaymentIdentifierExtension,
  declareSIWxExtension,
  decodeBase58,
  decodeSignedOffers,
  encodeBase58,
  encodeSIWxHeader,
  erc20ApprovalGasSponsoringSchema,
  extractAndValidatePaymentIdentifier,
  extractChainIdFromCAIP2,
  extractDiscoveryInfo,
  extractDiscoveryInfoFromExtension,
  extractDiscoveryInfoV1,
  extractEIP155ChainId,
  extractEVMChainId,
  extractEip2612GasSponsoringInfo,
  extractErc20ApprovalGasSponsoringInfo,
  extractJWSHeader,
  extractJWSPayload,
  extractOfferPayload,
  extractOffersFromPaymentRequired,
  extractPaymentIdentifier,
  extractPublicKeyFromKid,
  extractReceiptFromResponse,
  extractReceiptPayload,
  extractResourceMetadataV1,
  extractSolanaChainReference,
  findAcceptsObjectFromSignedOffer,
  formatSIWEMessage,
  formatSIWSMessage,
  generatePaymentId,
  getCanonicalBytes,
  getEVMAddress,
  getSolanaAddress,
  hasPaymentIdentifier,
  hashCanonical,
  hashOfferTypedData,
  hashReceiptTypedData,
  isBodyExtensionConfig,
  isDiscoverableV1,
  isEIP712SignedOffer,
  isEIP712SignedReceipt,
  isEIP712Signer,
  isEVMSigner,
  isJWSSignedOffer,
  isJWSSignedReceipt,
  isJWSSigner,
  isMcpExtensionConfig,
  isPaymentIdentifierExtension,
  isPaymentIdentifierRequired,
  isQueryExtensionConfig,
  isSolanaSigner,
  isValidPaymentId,
  isValidRouteTemplate,
  parseSIWxHeader,
  paymentIdentifierResourceServerExtension,
  paymentIdentifierSchema,
  prepareOfferForEIP712,
  prepareReceiptForEIP712,
  signEVMMessage,
  signOfferEIP712,
  signReceiptEIP712,
  signSolanaMessage,
  siwxResourceServerExtension,
  validateAndExtract,
  validateDiscoveryExtension,
  validateEip2612GasSponsoringInfo,
  validateErc20ApprovalGasSponsoringInfo,
  validatePaymentIdentifier,
  validatePaymentIdentifierRequirement,
  validateRouteTemplate,
  validateSIWxMessage,
  verifyEVMSignature,
  verifyOfferSignatureEIP712,
  verifyOfferSignatureJWS,
  verifyReceiptMatchesOffer,
  verifyReceiptSignatureEIP712,
  verifyReceiptSignatureJWS,
  verifySIWxSignature,
  verifySolanaSignature,
  withBazaar,
  wrapFetchWithSIWx
};
//# sourceMappingURL=index.mjs.map