import { xdr } from '@stellar/stellar-sdk';
import { EmissionConfig, EmissionData, Emissions, EmissionsV1 } from '../emissions.js';
import { Network, i128 } from '../index.js';
export declare abstract class BackstopPool {
    poolBalance: PoolBalance;
    emissions: Emissions | undefined;
    latestLedger: number;
    constructor(poolBalance: PoolBalance, emissions: Emissions | undefined, latestLedger: number);
    /**
     * Fetch the emission per year per non-Q4W backstop token
     * @returns The emission per year per backstop token as a float
     */
    emissionPerYearPerBackstopToken(): number;
    /**
     * Convert backstop tokens to shares
     * @param backstopTokens - The number of backstop tokens to convert
     * @returns - The number of shares as a fixed point number
     */
    backstopTokensToShares(backstopTokens: bigint | number): bigint;
    /**
     * Convert shares to backstop tokens
     * @param shares - The number of shares to convert
     * @returns - The number of backstop tokens as a fixed point number
     */
    sharesToBackstopTokens(shares: bigint): bigint;
    /**
     * Convert shares to backstop tokens
     * @param shares - The number of shares to convert
     * @returns - The number of backstop tokens as a floating point number
     */
    sharesToBackstopTokensFloat(shares: bigint): number;
}
export declare class BackstopPoolV1 extends BackstopPool {
    poolBalance: PoolBalance;
    toGulpEmissions: bigint;
    emissions: EmissionsV1 | undefined;
    latestLedger: number;
    constructor(poolBalance: PoolBalance, toGulpEmissions: bigint, emissions: EmissionsV1 | undefined, latestLedger: number);
    static load(network: Network, backstopId: string, poolId: string, timestamp?: number | undefined): Promise<BackstopPoolV1>;
}
export declare class BackstopPoolV2 extends BackstopPool {
    poolBalance: PoolBalance;
    emissions: EmissionsV1 | undefined;
    constructor(poolBalance: PoolBalance, emissions: EmissionsV1 | undefined, latestLedger: number);
    static load(network: Network, backstopId: string, poolId: string, timestamp?: number | undefined): Promise<BackstopPoolV2>;
}
export declare class PoolBalance {
    shares: i128;
    tokens: i128;
    q4w: i128;
    constructor(shares: i128, tokens: i128, q4w: i128);
    static ledgerKey(backstopId: string, poolId: string): xdr.LedgerKey;
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): PoolBalance;
}
export declare class BackstopEmissionConfig extends EmissionConfig {
    static ledgerKey(backstopId: string, poolId: string): xdr.LedgerKey;
}
export declare class BackstopEmissionData extends EmissionData {
    static ledgerKey(backstopId: string, poolId: string): xdr.LedgerKey;
}
