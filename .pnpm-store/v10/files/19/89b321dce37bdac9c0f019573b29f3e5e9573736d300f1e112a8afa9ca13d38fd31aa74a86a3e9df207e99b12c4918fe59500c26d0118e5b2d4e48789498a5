export { k as BAZAAR, E as BazaarClientExtension, c as BodyDiscoveryExtension, B as BodyDiscoveryInfo, g as DeclareBodyDiscoveryExtensionConfig, i as DeclareDiscoveryExtensionConfig, j as DeclareDiscoveryExtensionInput, h as DeclareMcpDiscoveryExtensionConfig, f as DeclareQueryDiscoveryExtensionConfig, u as DiscoveredHTTPResource, w as DiscoveredMCPResource, x as DiscoveredResource, e as DiscoveryExtension, D as DiscoveryInfo, F as DiscoveryResource, G as DiscoveryResourcesResponse, L as ListDiscoveryResourcesParams, d as McpDiscoveryExtension, M as McpDiscoveryInfo, a as QueryDiscoveryExtension, Q as QueryDiscoveryInfo, V as ValidationResult, W as WithExtensions, b as bazaarResourceServerExtension, o as declareDiscoveryExtension, r as extractDiscoveryInfo, s as extractDiscoveryInfoFromExtension, y as extractDiscoveryInfoV1, A as extractResourceMetadataV1, n as isBodyExtensionConfig, z as isDiscoverableV1, l as isMcpExtensionConfig, m as isQueryExtensionConfig, p as isValidRouteTemplate, t as validateAndExtract, v as validateDiscoveryExtension, q as validateRouteTemplate, C as withBazaar } from './index-DihVrF7v.js';
export { CompleteSIWxInfo, CreateSIWxHookOptions, DeclareSIWxOptions, EVMMessageVerifier, EVMSigner, InMemorySIWxStorage, SIGN_IN_WITH_X, SIWxExtension, SIWxExtensionInfo, SIWxExtensionSchema, SIWxHookEvent, SIWxPayload, SIWxPayloadSchema, SIWxSigner, SIWxStorage, SIWxValidationOptions, SIWxValidationResult, SIWxVerifyOptions, SIWxVerifyResult, SOLANA_DEVNET, SOLANA_MAINNET, SOLANA_TESTNET, SignatureScheme, SignatureType, SolanaSigner, SupportedChain, buildSIWxSchema, createSIWxClientHook, createSIWxMessage, createSIWxPayload, createSIWxRequestHook, createSIWxSettleHook, declareSIWxExtension, decodeBase58, encodeBase58, encodeSIWxHeader, extractEVMChainId, extractSolanaChainReference, formatSIWEMessage, formatSIWSMessage, getEVMAddress, getSolanaAddress, isEVMSigner, isSolanaSigner, parseSIWxHeader, signEVMMessage, signSolanaMessage, siwxResourceServerExtension, validateSIWxMessage, verifyEVMSignature, verifySIWxSignature, verifySolanaSignature, wrapFetchWithSIWx } from './sign-in-with-x/index.js';
export { DecodedOffer, EIP712SignedOffer, EIP712SignedReceipt, EIP712Signer, EIP712VerificationResult, JWSSignedOffer, JWSSignedReceipt, JWSSigner, OFFER_RECEIPT, OFFER_TYPES, OfferInput, OfferPayload, OfferReceiptDeclaration, OfferReceiptIssuer, RECEIPT_TYPES, ReceiptInput, ReceiptPayload, SignTypedDataFn, SignatureFormat, SignedOffer, SignedReceipt, Signer, canonicalize, convertNetworkStringToCAIP2, createEIP712OfferReceiptIssuer, createJWS, createJWSOfferReceiptIssuer, createOfferDomain, createOfferEIP712, createOfferJWS, createOfferReceiptExtension, createReceiptDomain, createReceiptEIP712, createReceiptJWS, declareOfferReceiptExtension, decodeSignedOffers, extractChainIdFromCAIP2, extractEIP155ChainId, extractJWSHeader, extractJWSPayload, extractOfferPayload, extractOffersFromPaymentRequired, extractPublicKeyFromKid, extractReceiptFromResponse, extractReceiptPayload, findAcceptsObjectFromSignedOffer, getCanonicalBytes, hashCanonical, hashOfferTypedData, hashReceiptTypedData, isEIP712SignedOffer, isEIP712SignedReceipt, isEIP712Signer, isJWSSignedOffer, isJWSSignedReceipt, isJWSSigner, prepareOfferForEIP712, prepareReceiptForEIP712, signOfferEIP712, signReceiptEIP712, verifyOfferSignatureEIP712, verifyOfferSignatureJWS, verifyReceiptMatchesOffer, verifyReceiptSignatureEIP712, verifyReceiptSignatureJWS } from './offer-receipt/index.js';
export { PAYMENT_IDENTIFIER, PAYMENT_ID_MAX_LENGTH, PAYMENT_ID_MIN_LENGTH, PAYMENT_ID_PATTERN, PaymentIdentifierExtension, PaymentIdentifierInfo, PaymentIdentifierSchema, PaymentIdentifierValidationResult, appendPaymentIdentifierToExtensions, declarePaymentIdentifierExtension, extractAndValidatePaymentIdentifier, extractPaymentIdentifier, generatePaymentId, hasPaymentIdentifier, isPaymentIdentifierExtension, isPaymentIdentifierRequired, isValidPaymentId, paymentIdentifierResourceServerExtension, paymentIdentifierSchema, validatePaymentIdentifier, validatePaymentIdentifierRequirement } from './payment-identifier/index.js';
import { FacilitatorExtension, PaymentPayload } from '@x402/core/types';
import '@x402/core/http';
import 'zod';
import 'jose';
import 'viem';

/**
 * Type definitions for the EIP-2612 Gas Sponsoring Extension
 *
 * This extension enables gasless approval of the Permit2 contract for tokens
 * that implement EIP-2612. The client signs an off-chain permit, and the
 * facilitator submits it on-chain via `x402Permit2Proxy.settleWithPermit`.
 */

/**
 * Extension identifier for the EIP-2612 gas sponsoring extension.
 */
declare const EIP2612_GAS_SPONSORING: FacilitatorExtension;
/**
 * EIP-2612 gas sponsoring info populated by the client.
 *
 * Contains the EIP-2612 permit signature and parameters that the facilitator
 * needs to call `x402Permit2Proxy.settleWithPermit`.
 */
interface Eip2612GasSponsoringInfo {
    /** Index signature for compatibility with Record<string, unknown> */
    [key: string]: unknown;
    /** The address of the sender (token owner). */
    from: string;
    /** The address of the ERC-20 token contract. */
    asset: string;
    /** The address of the spender (Canonical Permit2). */
    spender: string;
    /** The amount to approve (uint256 as decimal string). Typically MaxUint256. */
    amount: string;
    /** The current EIP-2612 nonce of the sender (decimal string). */
    nonce: string;
    /** The timestamp at which the permit signature expires (decimal string). */
    deadline: string;
    /** The 65-byte concatenated EIP-2612 permit signature (r, s, v) as a hex string. */
    signature: string;
    /** Schema version identifier. */
    version: string;
}
/**
 * Server-side EIP-2612 gas sponsoring info included in PaymentRequired.
 * Contains a description and version; the client populates the rest.
 */
interface Eip2612GasSponsoringServerInfo {
    /** Index signature for compatibility with Record<string, unknown> */
    [key: string]: unknown;
    /** Human-readable description of the extension. */
    description: string;
    /** Schema version identifier. */
    version: string;
}
/**
 * The full extension object as it appears in PaymentRequired.extensions
 * and PaymentPayload.extensions.
 */
interface Eip2612GasSponsoringExtension {
    /** Extension info - server-provided or client-enriched. */
    info: Eip2612GasSponsoringServerInfo | Eip2612GasSponsoringInfo;
    /** JSON Schema describing the expected structure of info. */
    schema: Record<string, unknown>;
}

/**
 * Resource Service functions for declaring the EIP-2612 Gas Sponsoring extension.
 *
 * These functions help servers declare support for EIP-2612 gasless Permit2 approvals
 * in the PaymentRequired response extensions.
 */

/**
 * Declares the EIP-2612 gas sponsoring extension for inclusion in
 * PaymentRequired.extensions.
 *
 * The server advertises that it (or its facilitator) supports EIP-2612
 * gasless Permit2 approval. The client will populate the info with the
 * actual permit signature data.
 *
 * @returns An object keyed by the extension identifier containing the extension declaration
 *
 * @example
 * ```typescript
 * import { declareEip2612GasSponsoringExtension } from '@x402/extensions';
 *
 * const routes = [
 *   {
 *     path: "/api/data",
 *     price: "$0.01",
 *     extensions: {
 *       ...declareEip2612GasSponsoringExtension(),
 *     },
 *   },
 * ];
 * ```
 */
declare function declareEip2612GasSponsoringExtension(): Record<string, Eip2612GasSponsoringExtension>;

/**
 * Facilitator functions for extracting and validating EIP-2612 Gas Sponsoring extension data.
 *
 * These functions help facilitators extract the EIP-2612 permit data from payment
 * payloads and validate it before calling settleWithPermit.
 */

/**
 * Extracts the EIP-2612 gas sponsoring info from a payment payload's extensions.
 *
 * Returns the info if the extension is present and contains the required client-populated
 * fields (from, asset, spender, amount, nonce, deadline, signature, version).
 *
 * @param paymentPayload - The payment payload to extract from
 * @returns The EIP-2612 gas sponsoring info, or null if not present
 */
declare function extractEip2612GasSponsoringInfo(paymentPayload: PaymentPayload): Eip2612GasSponsoringInfo | null;
/**
 * Validates that the EIP-2612 gas sponsoring info has valid format.
 *
 * Performs basic validation on the info fields:
 * - Addresses are valid hex (0x + 40 hex chars)
 * - Amount, nonce, deadline are numeric strings
 * - Signature is a hex string
 * - Version is a numeric version string
 *
 * @param info - The EIP-2612 gas sponsoring info to validate
 * @returns True if the info is valid, false otherwise
 */
declare function validateEip2612GasSponsoringInfo(info: Eip2612GasSponsoringInfo): boolean;

/**
 * Type definitions for the ERC-20 Approval Gas Sponsoring Extension
 *
 * This extension enables gasless Permit2 approval for generic ERC-20 tokens
 * that do NOT implement EIP-2612. The client signs (but does not broadcast) a
 * raw `approve(Permit2, MaxUint256)` transaction, and the facilitator broadcasts
 * it atomically before settling the Permit2 payment.
 */

/**
 * A single transaction to be executed by the signer.
 * - `0x${string}`: a pre-signed serialized transaction (broadcast as-is via sendRawTransaction)
 * - `{ to, data, gas? }`: an unsigned call intent (signer signs and broadcasts)
 */
type TransactionRequest = `0x${string}` | {
    to: `0x${string}`;
    data: `0x${string}`;
    gas?: bigint;
};
/**
 * Signer capability carried by the ERC-20 approval extension when registered in a facilitator.
 *
 * Mirrors FacilitatorEvmSigner (from @x402/evm) plus `sendTransactions`.
 * The signer owns execution of multiple transactions, enabling production implementations
 * to bundle them atomically (e.g., Flashbots, multicall, smart account batching)
 * while simpler implementations can execute them sequentially.
 *
 * The method signatures are duplicated here (rather than extending FacilitatorEvmSigner)
 * to avoid a circular dependency between @x402/extensions and @x402/evm.
 */
interface Erc20ApprovalGasSponsoringSigner {
    getAddresses(): readonly `0x${string}`[];
    readContract(args: {
        address: `0x${string}`;
        abi: readonly unknown[];
        functionName: string;
        args?: readonly unknown[];
    }): Promise<unknown>;
    verifyTypedData(args: {
        address: `0x${string}`;
        domain: Record<string, unknown>;
        types: Record<string, unknown>;
        primaryType: string;
        message: Record<string, unknown>;
        signature: `0x${string}`;
    }): Promise<boolean>;
    writeContract(args: {
        address: `0x${string}`;
        abi: readonly unknown[];
        functionName: string;
        args: readonly unknown[];
        gas?: bigint;
    }): Promise<`0x${string}`>;
    sendTransaction(args: {
        to: `0x${string}`;
        data: `0x${string}`;
    }): Promise<`0x${string}`>;
    waitForTransactionReceipt(args: {
        hash: `0x${string}`;
    }): Promise<{
        status: string;
    }>;
    getCode(args: {
        address: `0x${string}`;
    }): Promise<`0x${string}` | undefined>;
    sendTransactions(transactions: TransactionRequest[]): Promise<`0x${string}`[]>;
}
/**
 * Extension identifier for the ERC-20 approval gas sponsoring extension.
 */
declare const ERC20_APPROVAL_GAS_SPONSORING: {
    readonly key: "erc20ApprovalGasSponsoring";
};
/** Current schema version for the ERC-20 approval gas sponsoring extension info. */
declare const ERC20_APPROVAL_GAS_SPONSORING_VERSION = "1";
/**
 * Extended extension object registered in a facilitator via registerExtension().
 * Carries the signer that owns the full approve+settle flow for ERC-20 tokens
 * that lack EIP-2612.
 *
 * @example
 * ```typescript
 * import { createErc20ApprovalGasSponsoringExtension } from '@x402/extensions';
 *
 * facilitator.registerExtension(
 *   createErc20ApprovalGasSponsoringExtension(signer),
 * );
 * ```
 */
interface Erc20ApprovalGasSponsoringFacilitatorExtension extends FacilitatorExtension {
    key: "erc20ApprovalGasSponsoring";
    /** Default signer with approve+settle capability. Optional — settlement fails gracefully if absent. */
    signer?: Erc20ApprovalGasSponsoringSigner;
    /** Network-specific signer resolver. Takes precedence over `signer` when provided. */
    signerForNetwork?: (network: string) => Erc20ApprovalGasSponsoringSigner | undefined;
}
/**
 * Base signer shape without `sendTransactions`.
 * Matches the FacilitatorEvmSigner shape from @x402/evm (duplicated to avoid circular dep).
 */
type Erc20ApprovalGasSponsoringBaseSigner = Omit<Erc20ApprovalGasSponsoringSigner, "sendTransactions">;
/**
 * Create an ERC-20 approval gas sponsoring extension ready to register in a facilitator.
 *
 * @param signer - A complete signer with `sendTransactions` already implemented.
 *   The signer decides how to execute the transactions (sequentially, batched, or atomically).
 * @param signerForNetwork - Optional network-specific signer resolver. When provided,
 *   takes precedence over `signer` and allows different settlement signers per network.
 * @returns A fully configured extension to pass to `facilitator.registerExtension()`
 */
declare function createErc20ApprovalGasSponsoringExtension(signer: Erc20ApprovalGasSponsoringSigner, signerForNetwork?: (network: string) => Erc20ApprovalGasSponsoringSigner | undefined): Erc20ApprovalGasSponsoringFacilitatorExtension;
/**
 * ERC-20 approval gas sponsoring info populated by the client.
 *
 * Contains the RLP-encoded signed `approve(Permit2, MaxUint256)` transaction
 * that the facilitator broadcasts before settling the Permit2 payment.
 *
 * Note: Unlike EIP-2612, there is no nonce/deadline/signature — instead the
 * entire signed transaction is included as `signedTransaction`.
 */
interface Erc20ApprovalGasSponsoringInfo {
    /** Index signature for compatibility with Record<string, unknown> */
    [key: string]: unknown;
    /** The address of the sender (token owner who signed the tx). */
    from: `0x${string}`;
    /** The address of the ERC-20 token contract. */
    asset: `0x${string}`;
    /** The address of the spender (Canonical Permit2). */
    spender: `0x${string}`;
    /** The amount approved (uint256 as decimal string). Always MaxUint256. */
    amount: string;
    /** The RLP-encoded signed EIP-1559 transaction as a hex string. */
    signedTransaction: `0x${string}`;
    /** Schema version identifier. */
    version: string;
}
/**
 * Server-side ERC-20 approval gas sponsoring info included in PaymentRequired.
 * Contains a description and version; the client populates the rest.
 */
interface Erc20ApprovalGasSponsoringServerInfo {
    /** Index signature for compatibility with Record<string, unknown> */
    [key: string]: unknown;
    /** Human-readable description of the extension. */
    description: string;
    /** Schema version identifier. */
    version: string;
}
/**
 * The full extension object as it appears in PaymentRequired.extensions
 * and PaymentPayload.extensions.
 */
interface Erc20ApprovalGasSponsoringExtension {
    /** Extension info - server-provided or client-enriched. */
    info: Erc20ApprovalGasSponsoringServerInfo | Erc20ApprovalGasSponsoringInfo;
    /** JSON Schema describing the expected structure of info. */
    schema: Record<string, unknown>;
}

/**
 * Resource Service functions for declaring the ERC-20 Approval Gas Sponsoring extension.
 *
 * These functions help servers declare support for ERC-20 approval gas sponsoring
 * in the PaymentRequired response extensions. Use this for tokens that do NOT
 * implement EIP-2612 (generic ERC-20 tokens).
 */

/**
 * The JSON Schema for the ERC-20 approval gas sponsoring extension info.
 * Matches the schema defined in the spec.
 */
declare const erc20ApprovalGasSponsoringSchema: Record<string, unknown>;
/**
 * Declares the ERC-20 approval gas sponsoring extension for inclusion in
 * PaymentRequired.extensions.
 *
 * The server advertises that it (or its facilitator) supports broadcasting
 * a pre-signed `approve(Permit2, MaxUint256)` transaction on the client's behalf.
 * Use this for tokens that do NOT implement EIP-2612.
 *
 * @returns An object keyed by the extension identifier containing the extension declaration
 *
 * @example
 * ```typescript
 * import { declareErc20ApprovalGasSponsoringExtension } from '@x402/extensions';
 *
 * const routes = [
 *   {
 *     path: "/api/data",
 *     price: { amount: "1000", asset: "0x...", extra: { assetTransferMethod: "permit2" } },
 *     extensions: {
 *       ...declareErc20ApprovalGasSponsoringExtension(),
 *     },
 *   },
 * ];
 * ```
 */
declare function declareErc20ApprovalGasSponsoringExtension(): Record<string, Erc20ApprovalGasSponsoringExtension>;

/**
 * Facilitator functions for extracting and validating ERC-20 Approval Gas Sponsoring
 * extension data.
 *
 * These functions help facilitators extract the pre-signed approve() transaction
 * from payment payloads and validate it before broadcasting and settling.
 */

/**
 * Extracts the ERC-20 approval gas sponsoring info from a payment payload's extensions.
 *
 * Performs structural extraction only — checks that the extension is present and
 * contains all required fields. Does NOT validate field formats (use
 * validateErc20ApprovalGasSponsoringInfo for that).
 *
 * @param paymentPayload - The payment payload to extract from
 * @returns The ERC-20 approval gas sponsoring info, or null if not present
 */
declare function extractErc20ApprovalGasSponsoringInfo(paymentPayload: PaymentPayload): Erc20ApprovalGasSponsoringInfo | null;
/**
 * Validates that the ERC-20 approval gas sponsoring info has valid format.
 *
 * Validates the info against the canonical JSON Schema, checking:
 * - All required fields are present
 * - Addresses are valid hex (0x + 40 hex chars)
 * - Amount is a numeric string
 * - signedTransaction is a hex string
 * - Version is a numeric version string
 *
 * @param info - The ERC-20 approval gas sponsoring info to validate
 * @returns True if the info is valid, false otherwise
 */
declare function validateErc20ApprovalGasSponsoringInfo(info: Erc20ApprovalGasSponsoringInfo): boolean;

export { EIP2612_GAS_SPONSORING, ERC20_APPROVAL_GAS_SPONSORING, ERC20_APPROVAL_GAS_SPONSORING_VERSION, type Eip2612GasSponsoringExtension, type Eip2612GasSponsoringInfo, type Eip2612GasSponsoringServerInfo, type Erc20ApprovalGasSponsoringBaseSigner, type Erc20ApprovalGasSponsoringExtension, type Erc20ApprovalGasSponsoringFacilitatorExtension, type Erc20ApprovalGasSponsoringInfo, type Erc20ApprovalGasSponsoringServerInfo, type Erc20ApprovalGasSponsoringSigner, type TransactionRequest, createErc20ApprovalGasSponsoringExtension, declareEip2612GasSponsoringExtension, declareErc20ApprovalGasSponsoringExtension, erc20ApprovalGasSponsoringSchema, extractEip2612GasSponsoringInfo, extractErc20ApprovalGasSponsoringInfo, validateEip2612GasSponsoringInfo, validateErc20ApprovalGasSponsoringInfo };
