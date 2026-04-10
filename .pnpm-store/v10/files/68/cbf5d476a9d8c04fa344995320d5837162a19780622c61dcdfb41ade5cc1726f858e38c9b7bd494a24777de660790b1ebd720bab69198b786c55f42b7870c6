import { xdr } from '@stellar/stellar-sdk';
import { Network, i128 } from './index.js';
/********** Emission Source **********/
export declare abstract class Emissions {
    expiration: number;
    eps: i128;
    index: i128;
    lastTime: number;
    latestLedger: number;
    constructor(expiration: number, eps: i128, index: i128, lastTime: number, latestLedger: number);
    /**
     * The decimals of the index and eps values
     */
    abstract readonly epsDecimals: number;
    /**
     * Accrue emissions to the provided timestamp
     * @param supply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to
     * @param timestamp - The timestamp to accrue to. Defaults to the current time if not provided
     */
    accrue(supply: i128, decimals: number, timestamp?: number): void;
    /**
     * Calculate the emissions per year per token as a float.
     * @param supply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to. Defaults to 7.
     * @returns The emissions per year per token as a float
     */
    emissionsPerYearPerToken(supply: bigint, decimals?: number): number;
}
export declare class EmissionsV1 extends Emissions {
    constructor(config: EmissionConfig, data: EmissionData, latestLedger: number);
    readonly epsDecimals: number;
    /**
     * Fetch the emissions for a token.
     * @param network - The network to load the emissions from
     * @param configLedgerKey - The LedgerLey for the config
     * @param dataLedgerkey - The LedgerKey for the data
     * @param totalSupply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to
     * @param timestamp - The timestamp to accrue to. Defaults to the current time if not provided
     * @returns - The emissions if they exist, or undefined
     * @throws - If the emission data exists but is malformed
     */
    static load(network: Network, configLedgerKey: xdr.LedgerKey, dataLedgerkey: xdr.LedgerKey, totalSupply: bigint, decimals: number, timestamp?: number | undefined): Promise<Emissions | undefined>;
}
/**
 * Base class for emission data
 *
 * @property expiration - The timestamp the emissions expire
 * @property eps - The emissions per second
 * @property index - The last emission index
 * @property lastTime - The last time the emissions were updated
 */
export declare class EmissionsV2 extends Emissions {
    data: EmissionDataV2;
    latestLedger: number;
    constructor(data: EmissionDataV2, latestLedger: number);
    readonly epsDecimals: number;
    /**
     * Fetch the emissions for a token.
     * @param network - The network to load the emissions from
     * @param configLedgerKey - The LedgerLey for the config
     * @param dataLedgerkey - The LedgerKey for the data
     * @param totalSupply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to
     * @param timestamp - The timestamp to accrue to. Defaults to the current time if not provided
     * @returns - The emissions if they exist, or undefined
     * @throws - If the emission data exists but is malformed
     */
    static load(network: Network, dataLedgerkey: xdr.LedgerKey, totalSupply: bigint, decimals: number, timestamp?: number | undefined): Promise<EmissionsV2 | undefined>;
}
/**
 * The emission configuration
 *
 * @property eps - The emission per second
 * @property expiration - The expiration time of the emission
 */
export declare class EmissionConfig {
    eps: bigint;
    expiration: number;
    constructor(eps: bigint, expiration: number);
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): EmissionConfig;
}
export declare class EmissionData {
    index: i128;
    lastTime: number;
    constructor(index: i128, lastTime: number);
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): EmissionData;
}
export declare class EmissionDataV2 extends EmissionData {
    expiration: number;
    eps: bigint;
    index: bigint;
    lastTime: number;
    constructor(expiration: number, eps: bigint, index: bigint, lastTime: number);
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): EmissionDataV2;
}
/**
 * Emission data for a user. Assumes the emitted token is tracked in 7 decimals.
 *
 * @property index - The last emission index the user accrued to
 * @property accrued - The accrued emissions the user has
 */
export declare class UserEmissions {
    index: bigint;
    accrued: bigint;
    constructor(index: bigint, accrued: bigint);
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): UserEmissions;
    static fromScVal(sc_val: xdr.ScVal | string): UserEmissions | undefined;
    /**
     * Estimate the accrued emission to a given timestamp
     * @param emissions - The emissions data for a token
     * @param balance - The balance of the user of the token being emitted to (fixed point)
     * @returns The estimated accrued emissions in fixed point
     */
    estimateAccrual(emissions: Emissions, decimals: number, balance: bigint): number;
}
