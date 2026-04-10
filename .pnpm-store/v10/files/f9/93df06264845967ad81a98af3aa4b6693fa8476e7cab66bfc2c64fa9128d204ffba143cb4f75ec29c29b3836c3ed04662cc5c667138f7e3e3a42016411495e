import { Address, xdr } from '@stellar/stellar-sdk';
import { i128, u32, u64 } from '../index.js';
export * from './pool.js';
export * from './pool_metadata.js';
export * from './pool_contract.js';
export * from './pool_est.js';
export * from './pool_events.js';
export * from './pool_oracle.js';
export * from './pool_user.js';
export * from './reserve.js';
export * from './reserve_types.js';
export * from './user_positions_est.js';
export * from './user_types.js';
export * from './auction.js';
/**
 * Metadata for a pool's reserve emission configuration
 */
export interface ReserveEmissionMetadata {
    res_index: u32;
    res_type: u32;
    share: u64;
}
export interface UserReserveKey {
    reserve_id: u32;
    user: string;
}
export declare function UserReserveKeyToXDR(userReserveKey?: UserReserveKey): xdr.ScVal;
/**
 * RequestType for specifying submit action
 */
export declare enum RequestType {
    Supply = 0,
    Withdraw = 1,
    SupplyCollateral = 2,
    WithdrawCollateral = 3,
    Borrow = 4,
    Repay = 5,
    FillUserLiquidationAuction = 6,
    FillBadDebtAuction = 7,
    FillInterestAuction = 8,
    DeleteLiquidationAuction = 9
}
/**
 * Request for submitting actions
 */
export interface Request {
    request_type: RequestType;
    address: string;
    amount: i128;
}
export interface FlashLoan {
    contract: Address | string;
    asset: Address | string;
    amount: i128;
}
export interface AuctionKey {
    auct_type: u32;
    user: string;
}
export declare class AuctionData {
    bid: Map<string, i128>;
    block: u32;
    lot: Map<string, i128>;
    constructor(bid: Map<string, i128>, block: u32, lot: Map<string, i128>);
    static ledgerKey(poolId: string, auctionKey: AuctionKey): xdr.LedgerKey;
    static fromLedgerEntryData(ledger_entry_data: xdr.LedgerEntryData | string): AuctionData;
    static fromScVal(sc_val: xdr.ScVal | string): AuctionData;
}
export declare class PoolConfig {
    backstopRate: number;
    maxPositions: number;
    oracle: string;
    status: number;
    minCollateral?: i128;
    constructor(backstopRate: number, maxPositions: number, oracle: string, status: number, minCollateral?: i128);
    static fromScVal(sc_val: xdr.ScVal | string): PoolConfig;
}
export declare enum AuctionType {
    Liquidation = 0,
    BadDebt = 1,
    Interest = 2
}
export type PoolDataKey = {
    tag: 'Admin';
} | {
    tag: 'Name';
} | {
    tag: 'Backstop';
} | {
    tag: 'BLNDTkn';
} | {
    tag: 'Config';
} | {
    tag: 'PoolEmis';
} | {
    tag: 'ResList';
} | {
    tag: 'Positions';
    values: [string];
} | {
    tag: 'ResConfig';
    values: [string];
} | {
    tag: 'ResData';
    values: [string];
} | {
    tag: 'EmisConfig';
    values: [u32];
} | {
    tag: 'EmisData';
    values: [u32];
} | {
    tag: 'UserEmis';
    values: [UserReserveKey];
} | {
    tag: 'Auction';
    values: [AuctionKey];
} | {
    tag: 'AuctData';
    values: [string];
} | {
    tag: 'ResInit';
    values: [string];
};
export declare function PoolDataKeyToXDR(poolDataKey?: PoolDataKey): xdr.ScVal;
