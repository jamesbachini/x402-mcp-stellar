import { Address, Asset, xdr } from '@stellar/stellar-sdk';
import { Network } from './index.js';
/**
 * TokenMetadata contains information about a token
 *
 * @property name - The name of the token
 * @property symbol - The symbol of the token
 * @property decimals - The number of decimals the token uses
 * @property asset - The Stellar Asset if the token is a Stellar Asset Contract, undefined otherwise
 */
export declare class TokenMetadata {
    name: string;
    symbol: string;
    decimals: number;
    asset: Asset | undefined;
    constructor(name: string, symbol: string, decimals: number, asset: Asset | undefined);
    static load(network: Network, tokenId: string): Promise<TokenMetadata>;
    /**
     * Create the ledgerKey for the token contract instance
     * @param assetId - The contractId for the asset
     * @returns The ledgerKey for the contract instance
     */
    static ledgerKey(assetId: string): xdr.LedgerKey;
    /**
     * Create a TokenMetadata object from the XDR LedgerEntryData
     * @param ledger_entry_data - A XDR LedgerEntryData object or it's base64 string representation
     */
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): TokenMetadata;
}
/**
 * Fetch the token balance for a given address
 *
 * @param network - The Network to use
 * @param token_id - The token contract address
 * @param address - The address to fetch the balance for
 * @returns - The balance
 */
export declare function getTokenBalance(network: Network, token_id: string, address: Address): Promise<bigint>;
