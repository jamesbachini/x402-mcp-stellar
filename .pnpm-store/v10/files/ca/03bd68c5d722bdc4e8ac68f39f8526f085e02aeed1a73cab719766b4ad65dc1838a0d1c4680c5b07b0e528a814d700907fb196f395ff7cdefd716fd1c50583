import { Network } from './index.js';
export interface PriceData {
    /**
     * The price as a fixed point number with the oracle's decimals.
     */
    price: bigint;
    /**
     * The timestamp of the price in seconds
     */
    timestamp: number;
}
/**
 * Fetch the `lastprice` from an oracle contract for the given token.
 * @param network - The network to use
 * @param oracle_id - The oracle contract ID
 * @param token_id - The token contract ID to fetch the price for
 * @returns The PriceData
 * @throws Will throw an error if `None` is returned or if the simulation fails.
 */
export declare function getOraclePrice(network: Network, oracle_id: string, token_id: string): Promise<PriceData>;
/**
 * Fetch the `decimals` from an oracle contract.
 * @param network - The network to use
 * @param oracle_id - The oracle contract ID
 * @returns The decimals and latest ledger number
 * @throws Will throw an error if the simulation fails.
 */
export declare function getOracleDecimals(network: Network, oracle_id: string): Promise<{
    decimals: number;
    latestLedger: number;
}>;
/**
 * Add future Reflector oracle entries to the read-only footprint of a transaction.
 * This ensures that if a future oracle round occurs before the transaction is executed,
 * the future oracle round will still be included in the footprint.
 *
 * This only works for Reflector based oracles as it makes assumptions based on how the
 * oracle contracts keys are structured.
 *
 * If more than 100 entries are added to the read-only footprint, it will stop adding. The priority
 * is given to the oracle contracts seen first, and the indexes for the contract that are seen first.
 *
 * @param tx - The transaction XDR to add the reflector entries to.
 * @returns A base-64 transaction XDR string with the reflector entries added to the read-only footprint.
 */
export declare function addReflectorEntries(txXdr: string): string;
