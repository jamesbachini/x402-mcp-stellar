import { xdr } from '@stellar/stellar-sdk';
import { u64 } from '../index.js';
export * from './emitter_config.js';
export * from './emitter_contract.js';
export * from './emitter_events.js';
export interface Swap {
    /**
      
      */
    new_backstop: string;
    /**
      
      */
    new_backstop_token: string;
    /**
      
      */
    unlock_time: u64;
}
export type EmitterDataKey = {
    tag: 'LastDistro';
    values: readonly [string];
} | {
    tag: 'Dropped';
    values: readonly [string];
};
export declare function EmitterDataKeyToXDR(emitterDataKey?: EmitterDataKey): xdr.ScVal;
