import { xdr } from '@stellar/stellar-sdk';
import { UserEmissions } from '../emissions.js';
import { Network, i128, u32 } from '../index.js';
export declare class Positions {
    liabilities: Map<u32, i128>;
    collateral: Map<u32, i128>;
    supply: Map<u32, i128>;
    constructor(liabilities: Map<u32, i128>, collateral: Map<u32, i128>, supply: Map<u32, i128>);
    static ledgerKey(poolId: string, userId: string): xdr.LedgerKey;
    static load(network: Network, poolId: string, userId: string): Promise<Positions>;
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): Positions;
    static fromScVal(sc_val: xdr.ScVal | string): Positions;
}
export declare class PoolUserEmissionData extends UserEmissions {
    static ledgerKey(poolId: string, userId: string, reserveTokenIndex: number): xdr.LedgerKey;
    static getEmissionIndexFromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): number;
}
