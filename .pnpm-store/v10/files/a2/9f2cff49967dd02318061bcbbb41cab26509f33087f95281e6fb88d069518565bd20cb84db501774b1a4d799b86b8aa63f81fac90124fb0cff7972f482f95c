/// <reference types="node" resolution-mode="require"/>
import { xdr } from '@stellar/stellar-sdk';
export * from './pool_factory_config.js';
export * from './pool_factory_contract.js';
export * from './pool_factory_events.js';
export type PoolFactoryDataKey = {
    tag: 'Contracts';
    values: [string];
} | {
    tag: 'PoolInitMeta';
};
export declare function PoolFactoryDataKeyToXDR(poolFactoryDataKey?: PoolFactoryDataKey): xdr.ScVal;
export interface PoolInitMeta {
    backstop: string;
    blnd_id: string;
    pool_hash: Buffer;
}
