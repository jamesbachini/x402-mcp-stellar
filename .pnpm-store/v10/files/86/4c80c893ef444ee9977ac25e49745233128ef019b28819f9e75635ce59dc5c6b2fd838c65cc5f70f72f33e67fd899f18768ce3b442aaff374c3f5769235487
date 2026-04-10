import { xdr } from '@stellar/stellar-sdk';
import { i128, u64 } from '../index.js';
export * from './backstop.js';
export * from './backstop_config.js';
export * from './backstop_contract.js';
export * from './backstop_events.js';
export * from './backstop_pool.js';
export * from './backstop_pool_est.js';
export * from './backstop_pool_user.js';
export * from './backstop_pool_user_est.js';
export * from './backstop_token.js';
export * from './backstop_user_types.js';
export interface PoolUserKey {
    pool: string;
    user: string;
}
export declare function PoolUserKeyToXDR(poolUserKey?: PoolUserKey): xdr.ScVal;
/**
 * The pool's backstop data
 */
export interface PoolBackstopDataV1 {
    blnd: i128;
    q4w_percent: i128;
    tokens: i128;
    usdc: i128;
}
export interface PoolBackstopDataV2 {
    blnd: i128;
    q4w_percent: i128;
    tokens: i128;
    shares: i128;
    usdc: i128;
    token_spot_price: i128;
}
export interface Q4W {
    amount: i128;
    exp: u64;
}
export type BackstopDataKey = {
    tag: 'Emitter';
    values: void;
} | {
    tag: 'BToken';
    values: void;
} | {
    tag: 'PoolFact';
    values: void;
} | {
    tag: 'BLNDTkn';
    values: void;
} | {
    tag: 'USDCTkn';
    values: void;
} | {
    tag: 'RZ';
    values: void;
} | {
    tag: 'RZEmissionIndex';
    values: void;
} | {
    tag: 'BackfillEmis';
    values: void;
} | {
    tag: 'Backfill';
    values: void;
} | {
    tag: 'LastDist';
    values: void;
} | {
    tag: 'DropList';
    values: void;
} | {
    tag: 'LPTknVal';
    values: void;
} | {
    tag: 'UserBalance';
    values: readonly [PoolUserKey];
} | {
    tag: 'PoolBalance';
    values: readonly [string];
} | {
    tag: 'PoolUSDC';
    values: readonly [string];
} | {
    tag: 'RzEmisData';
    values: readonly [string];
} | {
    tag: 'PoolEPS';
    values: readonly [string];
} | {
    tag: 'BEmisCfg';
    values: readonly [string];
} | {
    tag: 'BEmisData';
    values: readonly [string];
} | {
    tag: 'UEmisData';
    values: readonly [PoolUserKey];
};
export declare function BackstopDataKeyToXDR(backstopDataKey?: BackstopDataKey): xdr.ScVal;
