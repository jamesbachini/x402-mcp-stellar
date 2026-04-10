import { xdr } from '@stellar/stellar-sdk';
import { UserEmissions } from '../emissions.js';
import { i128 } from '../index.js';
import { Q4W } from './index.js';
export declare class UserBalance {
    shares: i128;
    q4w: Q4W[];
    unlockedQ4W: i128;
    totalQ4W: i128;
    constructor(shares: i128, q4w: Q4W[], unlockedQ4W: i128, totalQ4W: i128);
    static ledgerKey(backstopId: string, poolId: string, userId: string): xdr.LedgerKey;
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string, timestamp: number): UserBalance;
}
export declare class BackstopUserEmissions extends UserEmissions {
    static ledgerKey(backstopId: string, poolId: string, userId: string): xdr.LedgerKey;
}
export declare function getPoolFromBackstopLedgerData(ledger_entry_data: xdr.LedgerEntryData | string): string;
