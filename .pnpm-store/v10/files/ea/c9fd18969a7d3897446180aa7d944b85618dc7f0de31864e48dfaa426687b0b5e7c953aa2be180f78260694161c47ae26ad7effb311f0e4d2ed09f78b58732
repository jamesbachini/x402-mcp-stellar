import * as jose from 'jose';
import { TypedDataDomain, Hex } from 'viem';
import { ResourceServerExtension, PaymentRequired, PaymentRequirements } from '@x402/core/types';

/**
 * Type definitions for the x402 Offer/Receipt Extension
 *
 * Based on: x402/specs/extensions/extension-offer-and-receipt.md (v1.0)
 *
 * Offers prove payment requirements originated from a resource server.
 * Receipts prove service was delivered after payment.
 */
/**
 * Extension identifier constant
 */
declare const OFFER_RECEIPT = "offer-receipt";
/**
 * Supported signature formats (§3.1)
 */
type SignatureFormat = "jws" | "eip712";
/**
 * Base signer interface for pluggable signing backends
 */
interface Signer {
    /** Key identifier DID (e.g., did:web:api.example.com#key-1) */
    kid: string;
    /** Sign payload and return signature string */
    sign: (payload: Uint8Array) => Promise<string>;
    /** Signature format */
    format: SignatureFormat;
}
/**
 * JWS-specific signer with algorithm info
 */
interface JWSSigner extends Signer {
    format: "jws";
    /** JWS algorithm (e.g., ES256K, EdDSA) */
    algorithm: string;
}
/**
 * EIP-712 specific signer
 */
interface EIP712Signer extends Signer {
    format: "eip712";
    /** Chain ID for EIP-712 domain */
    chainId: number;
}
/**
 * Offer payload fields (§4.2)
 *
 * Required: version, resourceUrl, scheme, network, asset, payTo, amount
 * Optional: validUntil
 */
interface OfferPayload {
    /** Offer payload schema version (currently 1) */
    version: number;
    /** The paid resource URL */
    resourceUrl: string;
    /** Payment scheme identifier (e.g., "exact") */
    scheme: string;
    /** Blockchain network identifier (CAIP-2 format, e.g., "eip155:8453") */
    network: string;
    /** Token contract address or "native" */
    asset: string;
    /** Recipient wallet address */
    payTo: string;
    /** Required payment amount */
    amount: string;
    /** Unix timestamp (seconds) when the offer expires (optional) */
    validUntil: number;
}
/**
 * Signed offer in JWS format (§3.1.1)
 *
 * "When format = 'jws': payload MUST be omitted"
 */
interface JWSSignedOffer {
    format: "jws";
    /** Index into accepts[] array (unsigned envelope field, §4.1.1) */
    acceptIndex?: number;
    /** JWS Compact Serialization string (header.payload.signature) */
    signature: string;
}
/**
 * Signed offer in EIP-712 format (§3.1.1)
 *
 * "When format = 'eip712': payload is REQUIRED"
 */
interface EIP712SignedOffer {
    format: "eip712";
    /** Index into accepts[] array (unsigned envelope field, §4.1.1) */
    acceptIndex?: number;
    /** The canonical payload fields */
    payload: OfferPayload;
    /** Hex-encoded ECDSA signature (0x-prefixed, 65 bytes: r+s+v) */
    signature: string;
}
/**
 * Union type for signed offers
 */
type SignedOffer = JWSSignedOffer | EIP712SignedOffer;
/**
 * Receipt payload fields (§5.2)
 *
 * Required: version, network, resourceUrl, payer, issuedAt
 * Optional: transaction (for verifiability over privacy)
 */
interface ReceiptPayload {
    /** Receipt payload schema version (currently 1) */
    version: number;
    /** Blockchain network identifier (CAIP-2 format, e.g., "eip155:8453") */
    network: string;
    /** The paid resource URL */
    resourceUrl: string;
    /** Payer identifier (commonly a wallet address) */
    payer: string;
    /** Unix timestamp (seconds) when receipt was issued */
    issuedAt: number;
    /** Blockchain transaction hash (optional - for verifiability over privacy) */
    transaction: string;
}
/**
 * Signed receipt in JWS format (§3.1.1)
 */
interface JWSSignedReceipt {
    format: "jws";
    /** JWS Compact Serialization string */
    signature: string;
}
/**
 * Signed receipt in EIP-712 format (§3.1.1)
 */
interface EIP712SignedReceipt {
    format: "eip712";
    /** The receipt payload */
    payload: ReceiptPayload;
    /** Hex-encoded ECDSA signature */
    signature: string;
}
/**
 * Union type for signed receipts
 */
type SignedReceipt = JWSSignedReceipt | EIP712SignedReceipt;
/**
 * Declaration for the offer-receipt extension in route config
 * Used by servers to declare that a route uses offer-receipt
 */
interface OfferReceiptDeclaration {
    /** Include transaction hash in receipt (default: false for privacy). Set to true for verifiability. */
    includeTxHash?: boolean;
    /** Offer validity duration in seconds. Default: 300 (see x402ResourceServer.ts) */
    offerValiditySeconds?: number;
}
/**
 * Input for creating an offer (derived from PaymentRequirements)
 */
interface OfferInput {
    /** Index into accepts[] array this offer corresponds to (0-based) */
    acceptIndex: number;
    /** Payment scheme identifier */
    scheme: string;
    /** Blockchain network identifier (CAIP-2 format) */
    network: string;
    /** Token contract address or "native" */
    asset: string;
    /** Recipient wallet address */
    payTo: string;
    /** Required payment amount */
    amount: string;
    /** Offer validity duration in seconds. Default: 300 (see x402ResourceServer.ts) */
    offerValiditySeconds?: number;
}
/**
 * High-level issuer interface for the offer-receipt extension.
 * Creates and signs offers and receipts.
 * Used by createOfferReceiptExtension()
 */
interface OfferReceiptIssuer {
    /** Key identifier DID */
    kid: string;
    /** Signature format */
    format: SignatureFormat;
    /** Create and sign an offer for a resource */
    issueOffer(resourceUrl: string, input: OfferInput): Promise<SignedOffer>;
    /** Create and sign a receipt for a completed payment */
    issueReceipt(resourceUrl: string, payer: string, network: string, transaction?: string): Promise<SignedReceipt>;
}
/**
 * Check if an offer is JWS format
 *
 * @param offer - The signed offer to check
 * @returns True if the offer uses JWS format
 */
declare function isJWSSignedOffer(offer: SignedOffer): offer is JWSSignedOffer;
/**
 * Check if an offer is EIP-712 format
 *
 * @param offer - The signed offer to check
 * @returns True if the offer uses EIP-712 format
 */
declare function isEIP712SignedOffer(offer: SignedOffer): offer is EIP712SignedOffer;
/**
 * Check if a receipt is JWS format
 *
 * @param receipt - The signed receipt to check
 * @returns True if the receipt uses JWS format
 */
declare function isJWSSignedReceipt(receipt: SignedReceipt): receipt is JWSSignedReceipt;
/**
 * Check if a receipt is EIP-712 format
 *
 * @param receipt - The signed receipt to check
 * @returns True if the receipt uses EIP-712 format
 */
declare function isEIP712SignedReceipt(receipt: SignedReceipt): receipt is EIP712SignedReceipt;
/**
 * Check if a signer is JWS format
 *
 * @param signer - The signer to check
 * @returns True if the signer uses JWS format
 */
declare function isJWSSigner(signer: Signer): signer is JWSSigner;
/**
 * Check if a signer is EIP-712 format
 *
 * @param signer - The signer to check
 * @returns True if the signer uses EIP-712 format
 */
declare function isEIP712Signer(signer: Signer): signer is EIP712Signer;
/**
 * Input for creating a receipt
 */
interface ReceiptInput {
    /** The resource URL that was paid for */
    resourceUrl: string;
    /** The payer identifier (wallet address) */
    payer: string;
    /** The blockchain network (CAIP-2 format) */
    network: string;
    /** The transaction hash (optional, for verifiability) */
    transaction?: string;
}

/**
 * Signing utilities for x402 Offer/Receipt Extension
 *
 * This module provides:
 * - JCS (JSON Canonicalization Scheme) per RFC 8785
 * - JWS (JSON Web Signature) signing and extraction
 * - EIP-712 typed data signing
 * - Offer/Receipt creation utilities
 * - Signature verification utilities
 *
 * Based on: x402/specs/extensions/extension-offer-and-receipt.md (v1.0) §3
 */

/**
 * Canonicalize a JSON object using JCS (RFC 8785)
 *
 * Rules:
 * 1. Object keys are sorted lexicographically by UTF-16 code units
 * 2. No whitespace between tokens
 * 3. Numbers use shortest representation (no trailing zeros)
 * 4. Strings use minimal escaping
 * 5. null, true, false are lowercase literals
 *
 * @param value - The object to canonicalize
 * @returns The canonicalized JSON string
 */
declare function canonicalize(value: unknown): string;
/**
 * Hash a canonicalized object using SHA-256
 *
 * @param obj - The object to hash
 * @returns The SHA-256 hash as Uint8Array
 */
declare function hashCanonical(obj: unknown): Promise<Uint8Array>;
/**
 * Get canonical bytes of an object (UTF-8 encoded)
 *
 * @param obj - The object to encode
 * @returns The UTF-8 encoded canonical JSON
 */
declare function getCanonicalBytes(obj: unknown): Uint8Array;
/**
 * Create a JWS Compact Serialization from a payload
 *
 * Assembles the full JWS structure (header.payload.signature) using the
 * signer's algorithm and kid. The signer only needs to sign bytes and
 * return the base64url-encoded signature.
 *
 * @param payload - The payload object to sign
 * @param signer - The JWS signer
 * @returns The JWS compact serialization string
 */
declare function createJWS<T extends object>(payload: T, signer: JWSSigner): Promise<string>;
/**
 * Extract JWS header without verification
 *
 * @param jws - The JWS compact serialization string
 * @returns The decoded header object
 */
declare function extractJWSHeader(jws: string): {
    alg: string;
    kid?: string;
};
/**
 * Extract JWS payload
 *
 * Note: This extracts the payload without verifying the signature or
 * checking signer authorization. Signature verification requires resolving
 * key bindings (did:web documents, attestations, etc.) which is outside
 * the scope of x402 client utilities.
 *
 * @param jws - The JWS compact serialization string
 * @returns The decoded payload
 */
declare function extractJWSPayload<T>(jws: string): T;
/**
 * Create EIP-712 domain for offer signing
 *
 * @returns The EIP-712 domain object
 */
declare function createOfferDomain(): TypedDataDomain;
/**
 * Create EIP-712 domain for receipt signing
 *
 * @returns The EIP-712 domain object
 */
declare function createReceiptDomain(): TypedDataDomain;
/**
 * EIP-712 types for Offer (§4.3)
 */
declare const OFFER_TYPES: {
    Offer: {
        name: string;
        type: string;
    }[];
};
/**
 * EIP-712 types for Receipt (§5.3)
 */
declare const RECEIPT_TYPES: {
    Receipt: {
        name: string;
        type: string;
    }[];
};
/**
 * Prepare offer payload for EIP-712 signing
 *
 * @param payload - The offer payload
 * @returns The prepared message object for EIP-712
 */
declare function prepareOfferForEIP712(payload: OfferPayload): {
    version: bigint;
    resourceUrl: string;
    scheme: string;
    network: string;
    asset: string;
    payTo: string;
    amount: string;
    validUntil: bigint;
};
/**
 * Prepare receipt payload for EIP-712 signing
 *
 * @param payload - The receipt payload
 * @returns The prepared message object for EIP-712
 */
declare function prepareReceiptForEIP712(payload: ReceiptPayload): {
    version: bigint;
    network: string;
    resourceUrl: string;
    payer: string;
    issuedAt: bigint;
    transaction: string;
};
/**
 * Hash offer typed data for EIP-712
 *
 * @param payload - The offer payload
 * @returns The EIP-712 hash
 */
declare function hashOfferTypedData(payload: OfferPayload): Hex;
/**
 * Hash receipt typed data for EIP-712
 *
 * @param payload - The receipt payload
 * @returns The EIP-712 hash
 */
declare function hashReceiptTypedData(payload: ReceiptPayload): Hex;
/**
 * Function type for signing EIP-712 typed data
 */
type SignTypedDataFn = (params: {
    domain: TypedDataDomain;
    types: Record<string, Array<{
        name: string;
        type: string;
    }>>;
    primaryType: string;
    message: Record<string, unknown>;
}) => Promise<Hex>;
/**
 * Sign an offer using EIP-712
 *
 * @param payload - The offer payload
 * @param signTypedData - The signing function
 * @returns The signature hex string
 */
declare function signOfferEIP712(payload: OfferPayload, signTypedData: SignTypedDataFn): Promise<Hex>;
/**
 * Sign a receipt using EIP-712
 *
 * @param payload - The receipt payload
 * @param signTypedData - The signing function
 * @returns The signature hex string
 */
declare function signReceiptEIP712(payload: ReceiptPayload, signTypedData: SignTypedDataFn): Promise<Hex>;
/**
 * Extract chain ID from an EIP-155 network string (strict format)
 *
 * @param network - The network string in "eip155:<chainId>" format
 * @returns The chain ID number
 * @throws Error if network is not in "eip155:<chainId>" format
 */
declare function extractEIP155ChainId(network: string): number;
/**
 * Convert a network string to CAIP-2 format
 *
 * Handles both CAIP-2 format and legacy x402 v1 network strings:
 * - CAIP-2: "eip155:8453" → "eip155:8453" (passed through)
 * - V1 EVM: "base" → "eip155:8453", "base-sepolia" → "eip155:84532"
 * - V1 Solana: "solana" → "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
 *
 * @param network - The network string to convert
 * @returns The CAIP-2 formatted network string
 * @throws Error if network is not a recognized v1 identifier or CAIP-2 format
 */
declare function convertNetworkStringToCAIP2(network: string): string;
/**
 * Extract chain ID from a CAIP-2 network string (EVM only)
 *
 * @param network - The CAIP-2 network string
 * @returns Chain ID number, or undefined for non-EVM networks
 */
declare function extractChainIdFromCAIP2(network: string): number | undefined;
/**
 * Create a signed offer using JWS
 *
 * @param resourceUrl - The resource URL being paid for
 * @param input - The offer input parameters
 * @param signer - The JWS signer
 * @returns The signed offer with JWS format
 */
declare function createOfferJWS(resourceUrl: string, input: OfferInput, signer: JWSSigner): Promise<JWSSignedOffer>;
/**
 * Create a signed offer using EIP-712
 *
 * @param resourceUrl - The resource URL being paid for
 * @param input - The offer input parameters
 * @param signTypedData - The signing function
 * @returns The signed offer with EIP-712 format
 */
declare function createOfferEIP712(resourceUrl: string, input: OfferInput, signTypedData: SignTypedDataFn): Promise<EIP712SignedOffer>;
/**
 * Extract offer payload
 *
 * Note: This extracts the payload without verifying the signature or
 * checking signer authorization. Signer authorization requires resolving
 * key bindings (did:web documents, attestations, etc.) which is outside
 * the scope of x402 client utilities. See spec §4.5.1.
 *
 * @param offer - The signed offer
 * @returns The offer payload
 */
declare function extractOfferPayload(offer: SignedOffer): OfferPayload;
/**
 * Create a signed receipt using JWS
 *
 * @param input - The receipt input parameters
 * @param signer - The JWS signer
 * @returns The signed receipt with JWS format
 */
declare function createReceiptJWS(input: ReceiptInput, signer: JWSSigner): Promise<JWSSignedReceipt>;
/**
 * Create a signed receipt using EIP-712
 *
 * @param input - The receipt input parameters
 * @param signTypedData - The signing function
 * @returns The signed receipt with EIP-712 format
 */
declare function createReceiptEIP712(input: ReceiptInput, signTypedData: SignTypedDataFn): Promise<EIP712SignedReceipt>;
/**
 * Extract receipt payload
 *
 * Note: This extracts the payload without verifying the signature or
 * checking signer authorization. Signer authorization requires resolving
 * key bindings (did:web documents, attestations, etc.) which is outside
 * the scope of x402 client utilities. See spec §5.5.
 *
 * @param receipt - The signed receipt
 * @returns The receipt payload
 */
declare function extractReceiptPayload(receipt: SignedReceipt): ReceiptPayload;
/**
 * Result of EIP-712 signature verification
 */
interface EIP712VerificationResult<T> {
    signer: Hex;
    payload: T;
}
/**
 * Verify an EIP-712 signed offer and recover the signer address.
 * Does NOT verify signer authorization for the resourceUrl - see spec §4.5.1.
 *
 * @param offer - The EIP-712 signed offer
 * @returns The recovered signer address and payload
 */
declare function verifyOfferSignatureEIP712(offer: EIP712SignedOffer): Promise<EIP712VerificationResult<OfferPayload>>;
/**
 * Verify an EIP-712 signed receipt and recover the signer address.
 * Does NOT verify signer authorization for the resourceUrl - see spec §4.5.1.
 *
 * @param receipt - The EIP-712 signed receipt
 * @returns The recovered signer address and payload
 */
declare function verifyReceiptSignatureEIP712(receipt: EIP712SignedReceipt): Promise<EIP712VerificationResult<ReceiptPayload>>;
/**
 * Verify a JWS signed offer.
 * Does NOT verify signer authorization for the resourceUrl - see spec §4.5.1.
 * If no publicKey provided, extracts from kid (supports did:key, did:jwk, did:web).
 *
 * @param offer - The JWS signed offer
 * @param publicKey - Optional public key (JWK or KeyLike). If not provided, extracted from kid.
 * @returns The verified payload
 */
declare function verifyOfferSignatureJWS(offer: JWSSignedOffer, publicKey?: jose.KeyLike | jose.JWK): Promise<OfferPayload>;
/**
 * Verify a JWS signed receipt.
 * Does NOT verify signer authorization for the resourceUrl - see spec §4.5.1.
 * If no publicKey provided, extracts from kid (supports did:key, did:jwk, did:web).
 *
 * @param receipt - The JWS signed receipt
 * @param publicKey - Optional public key (JWK or KeyLike). If not provided, extracted from kid.
 * @returns The verified payload
 */
declare function verifyReceiptSignatureJWS(receipt: JWSSignedReceipt, publicKey?: jose.KeyLike | jose.JWK): Promise<ReceiptPayload>;

/**
 * Offer-Receipt Extension for x402ResourceServer
 *
 * This module provides the ResourceServerExtension implementation that uses
 * the extension hooks (enrichPaymentRequiredResponse, enrichSettlementResponse)
 * to add signed offers and receipts to x402 payment flows.
 *
 * Based on: x402/specs/extensions/extension-offer-and-receipt.md (v1.0)
 */

/**
 * Creates an offer-receipt extension for use with x402ResourceServer.
 *
 * The extension uses the hook system to:
 * 1. Add signed offers to each PaymentRequirements in 402 responses
 * 2. Add signed receipts to settlement responses after successful payment
 *
 * @param issuer - The issuer to use for creating and signing offers and receipts
 * @returns ResourceServerExtension that can be registered with x402ResourceServer
 */
declare function createOfferReceiptExtension(issuer: OfferReceiptIssuer): ResourceServerExtension;
/**
 * Declare offer-receipt extension for a route
 *
 * Use this in route configuration to enable offer-receipt for a specific endpoint.
 *
 * @param config - Optional configuration for the extension
 * @returns Extension declaration object to spread into route config
 */
declare function declareOfferReceiptExtension(config?: OfferReceiptDeclaration): Record<string, OfferReceiptDeclaration>;
/**
 * Create an OfferReceiptIssuer that uses JWS format
 *
 * @param kid - Key identifier DID (e.g., did:web:api.example.com#key-1)
 * @param jwsSigner - JWS signer with sign() function and algorithm
 * @returns OfferReceiptIssuer for use with createOfferReceiptExtension
 */
declare function createJWSOfferReceiptIssuer(kid: string, jwsSigner: JWSSigner): OfferReceiptIssuer;
/**
 * Create an OfferReceiptIssuer that uses EIP-712 format
 *
 * @param kid - Key identifier DID (e.g., did:pkh:eip155:1:0x...)
 * @param signTypedData - Function to sign EIP-712 typed data
 * @returns OfferReceiptIssuer for use with createOfferReceiptExtension
 */
declare function createEIP712OfferReceiptIssuer(kid: string, signTypedData: SignTypedDataFn): OfferReceiptIssuer;

/**
 * Client-side utilities for extracting offers and receipts from x402 responses
 *
 * Provides utilities for clients who want to access signed offers and receipts
 * from x402 payment flows. Useful for verified reviews, audit trails, and dispute resolution.
 *
 * @see README.md for usage examples (raw and wrapper flows)
 * @see examples/typescript/clients/offer-receipt/ for complete example
 */

/**
 * A signed offer with its decoded payload fields at the top level.
 * Combines the signed offer metadata with the decoded payload for easy access.
 */
interface DecodedOffer extends OfferPayload {
    /** The original signed offer (for passing to other functions or downstream systems) */
    signedOffer: SignedOffer;
    /** The signature format used */
    format: "jws" | "eip712";
    /** Index into accepts[] array (hint for matching), may be undefined */
    acceptIndex?: number;
}
/**
 * Verify that a receipt's payload matches the offer and payer.
 *
 * This performs basic payload field verification:
 * - resourceUrl matches the offer
 * - network matches the offer
 * - payer matches one of the client's wallet addresses
 * - issuedAt is recent (within maxAgeSeconds)
 *
 * NOTE: This does NOT verify the signature or key binding. See the comment
 * in the offer-receipt example for guidance on full verification.
 *
 * @param receipt - The signed receipt from the server
 * @param offer - The decoded offer that was accepted
 * @param payerAddresses - Array of the client's wallet addresses (EVM, SVM, etc.)
 * @param maxAgeSeconds - Maximum age of receipt in seconds (default: 3600 = 1 hour)
 * @returns true if all checks pass, false otherwise
 */
declare function verifyReceiptMatchesOffer(receipt: SignedReceipt, offer: DecodedOffer, payerAddresses: string[], maxAgeSeconds?: number): boolean;
/**
 * Extract signed offers from a PaymentRequired response.
 *
 * Call this immediately after receiving a 402 response to save the offers.
 * If the settlement response doesn't include a receipt, you'll still have
 * the offers for attestation purposes.
 *
 * @param paymentRequired - The PaymentRequired object from the 402 response
 * @returns Array of signed offers, or empty array if none present
 */
declare function extractOffersFromPaymentRequired(paymentRequired: PaymentRequired): SignedOffer[];
/**
 * Decode all signed offers and return them with payload fields at the top level.
 *
 * Use this to inspect offer details (network, amount, etc.) for selection.
 * JWS decoding is cheap (base64 decode, no crypto), so decoding all offers
 * upfront is fine even with multiple offers.
 *
 * @param offers - Array of signed offers from extractOffersFromPaymentRequired
 * @returns Array of decoded offers with payload fields at top level
 */
declare function decodeSignedOffers(offers: SignedOffer[]): DecodedOffer[];
/**
 * Find the accepts[] entry that matches a signed or decoded offer.
 *
 * Use this after selecting an offer to get the PaymentRequirements
 * object needed for createPaymentPayload.
 *
 * Uses the offer's acceptIndex as a hint for faster lookup, but verifies
 * the payload matches in case indices got out of sync.
 *
 * @param offer - A DecodedOffer (from decodeSignedOffers) or SignedOffer
 * @param accepts - Array of payment requirements from paymentRequired.accepts
 * @returns The matching PaymentRequirements, or undefined if not found
 */
declare function findAcceptsObjectFromSignedOffer(offer: DecodedOffer | SignedOffer, accepts: PaymentRequirements[]): PaymentRequirements | undefined;
/**
 * Extract signed receipt from a successful payment response.
 *
 * Call this after a successful payment to get the server's signed receipt.
 * The receipt proves the service was delivered after payment.
 *
 * @param response - The Response object from the successful request
 * @returns The signed receipt, or undefined if not present
 */
declare function extractReceiptFromResponse(response: Response): SignedReceipt | undefined;

/**
 * DID Resolution Utilities
 *
 * Extracts public keys from DID key identifiers. Supports did:key, did:jwk, did:web.
 * Uses @noble/curves and @scure/base for cryptographic operations.
 */

/**
 * Extract a public key from a DID key identifier (kid).
 * Supports did:key, did:jwk, did:web.
 *
 * @param kid - The key identifier (DID URL, e.g., did:key:z6Mk..., did:web:example.com#key-1)
 * @returns The extracted public key
 */
declare function extractPublicKeyFromKid(kid: string): Promise<jose.KeyLike>;

export { type DecodedOffer, type EIP712SignedOffer, type EIP712SignedReceipt, type EIP712Signer, type EIP712VerificationResult, type JWSSignedOffer, type JWSSignedReceipt, type JWSSigner, OFFER_RECEIPT, OFFER_TYPES, type OfferInput, type OfferPayload, type OfferReceiptDeclaration, type OfferReceiptIssuer, RECEIPT_TYPES, type ReceiptInput, type ReceiptPayload, type SignTypedDataFn, type SignatureFormat, type SignedOffer, type SignedReceipt, type Signer, canonicalize, convertNetworkStringToCAIP2, createEIP712OfferReceiptIssuer, createJWS, createJWSOfferReceiptIssuer, createOfferDomain, createOfferEIP712, createOfferJWS, createOfferReceiptExtension, createReceiptDomain, createReceiptEIP712, createReceiptJWS, declareOfferReceiptExtension, decodeSignedOffers, extractChainIdFromCAIP2, extractEIP155ChainId, extractJWSHeader, extractJWSPayload, extractOfferPayload, extractOffersFromPaymentRequired, extractPublicKeyFromKid, extractReceiptFromResponse, extractReceiptPayload, findAcceptsObjectFromSignedOffer, getCanonicalBytes, hashCanonical, hashOfferTypedData, hashReceiptTypedData, isEIP712SignedOffer, isEIP712SignedReceipt, isEIP712Signer, isJWSSignedOffer, isJWSSignedReceipt, isJWSSigner, prepareOfferForEIP712, prepareReceiptForEIP712, signOfferEIP712, signReceiptEIP712, verifyOfferSignatureEIP712, verifyOfferSignatureJWS, verifyReceiptMatchesOffer, verifyReceiptSignatureEIP712, verifyReceiptSignatureJWS };
