import { Network } from '../index.js';
import { PriceData } from '../oracle.js';
export declare class PoolOracle {
    oracleId: string;
    prices: Map<string, PriceData>;
    decimals: number;
    latestLedger: number;
    constructor(oracleId: string, prices: Map<string, PriceData>, decimals: number, latestLedger: number);
    static load(network: Network, oracleId: string, assets: string[]): Promise<PoolOracle>;
    /**
     * Get the price of an asset as a fixed point number with the oracle's decimals
     * @param assetId - The asset to get the price of
     * @returns The price as a fixed point number, or undefined if no price is available
     */
    getPrice(assetId: string): bigint | undefined;
    /**
     * Get the price of an asset as a floating point number
     * @param assetId - The asset to get the price of
     * @returns The price as a floating point number, or undefined if no price is available
     */
    getPriceFloat(assetId: string): number | undefined;
}
