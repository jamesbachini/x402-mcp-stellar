import { xdr } from '@stellar/stellar-sdk';
import { EmissionConfig, EmissionData } from '../emissions.js';
import { i128, Network, u32 } from '../index.js';
export declare class ReserveConfig {
    index: number;
    decimals: number;
    c_factor: number;
    l_factor: number;
    util: number;
    max_util: number;
    r_base: number;
    r_one: number;
    r_two: number;
    r_three: number;
    reactivity: number;
    constructor(index: number, decimals: number, c_factor: number, l_factor: number, util: number, max_util: number, r_base: number, r_one: number, r_two: number, r_three: number, reactivity: number);
    static load(network: Network, poolId: string, assetId: string): Promise<ReserveConfig>;
    static ledgerKey(poolId: string, assetId: string): xdr.LedgerKey;
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): ReserveConfig;
    static fromScVal(scval_data: xdr.ScVal | string): ReserveConfig;
}
export declare class ReserveConfigV2 extends ReserveConfig {
    index: number;
    decimals: number;
    c_factor: number;
    l_factor: number;
    util: number;
    max_util: number;
    r_base: number;
    r_one: number;
    r_two: number;
    r_three: number;
    reactivity: number;
    supply_cap: bigint;
    enabled: boolean;
    constructor(index: number, decimals: number, c_factor: number, l_factor: number, util: number, max_util: number, r_base: number, r_one: number, r_two: number, r_three: number, reactivity: number, supply_cap: bigint, enabled: boolean);
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): ReserveConfigV2;
    static fromScVal(scval_data: xdr.ScVal | string): ReserveConfigV2;
}
export declare class ReserveData {
    dRate: bigint;
    bRate: bigint;
    interestRateModifier: bigint;
    dSupply: bigint;
    bSupply: bigint;
    backstopCredit: bigint;
    lastTime: number;
    constructor(dRate: bigint, bRate: bigint, interestRateModifier: bigint, dSupply: bigint, bSupply: bigint, backstopCredit: bigint, lastTime: number);
    static load(network: Network, poolId: string, assetId: string): Promise<ReserveData>;
    static ledgerKey(poolId: string, assetId: string): xdr.LedgerKey;
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): ReserveData;
    static fromScVal(sc_val: xdr.ScVal | string): ReserveData;
}
export declare class ReserveEmissionConfig extends EmissionConfig {
    static ledgerKey(poolId: string, reserveIndex: u32): xdr.LedgerKey;
}
export declare class ReserveEmissionData extends EmissionData {
    static ledgerKey(poolId: string, reserveIndex: u32): xdr.LedgerKey;
}
/**
 * A object representing the reserve object on the contract
 */
export declare class ContractReserve {
    asset: string;
    config: ReserveConfigV2;
    data: ReserveData;
    scalar: i128;
    constructor(asset: string, config: ReserveConfigV2, data: ReserveData, scalar: i128);
    static fromScVal(sc_val: xdr.ScVal | string): ContractReserve;
}
/**
 * Decode the reserve token type (0 = dToken, 1 = bToken) from a Reserve Emission LedgerEntryData
 */
export declare function getEmissionIndex(ledger_entry_data: xdr.LedgerEntryData | string): number;
export declare function getReserveId(ledger_entry_data: xdr.LedgerEntryData | string): string;
