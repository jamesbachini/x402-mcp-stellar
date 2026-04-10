/// <reference types="node" />
import { Address, Contract, contract } from '@stellar/stellar-sdk';
import { PoolInitMeta } from './index.js';
import { i128 } from '../index.js';
export interface DeployV1Args {
    admin: Address | string;
    name: string;
    salt: Buffer;
    oracle: Address | string;
    backstop_take_rate: number;
    max_positions: number;
}
export interface DeployV2Args {
    admin: Address | string;
    name: string;
    salt: Buffer;
    oracle: Address | string;
    min_collateral: i128;
    backstop_take_rate: number;
    max_positions: number;
}
export declare abstract class PoolFactoryContract extends Contract {
    static spec: contract.Spec;
    static readonly parsers: {
        isPool: (result: string) => boolean;
    };
    /**
     * Checks if a contract address was deployed by the factory.
     *
     * @param pool_address - The contract address to be checked.
     *
     * @returns A base64-encoded string representing the operation.
     */
    isPool(pool_address: string): string;
}
export declare class PoolFactoryContractV1 extends PoolFactoryContract {
    constructor(address: string);
    static readonly spec: contract.Spec;
    static readonly parsers: {
        deployPool: (result: string) => string;
        initialize: () => void;
        isPool: (result: string) => boolean;
    };
    /**
     * Initializes the pool factory.
     *
     * @param pool_init_meta - The pool initialization metadata.
     * @param pool_init_meta.pool_hash - The hash of the pool contract code.
     * @param pool_init_meta.backstop - The address of the backstop contract.
     * @param pool_init_meta.blnd_id - The address of the BLND token contract.
     *
     * @returns A base64-encoded string representing the operation.
     */
    initialize(pool_init_meta: PoolInitMeta): string;
    /**
     * Deploys and initializes a lending pool.
     *
     * @param contractArgs - The arguments required for deploying a pool.
     * @param contractArgs.admin - The admin address for the pool.
     * @param contractArgs.name - The name of the pool.
     * @param contractArgs.salt - The salt for the pool address (32 bytes).
     * @param contractArgs.oracle - The oracle address for the pool.
     * @param contractArgs.backstop_take_rate - The backstop take rate for the pool (7 decimals).
     * @param contractArgs.max_positions - The maximum user positions supported by the pool.
     *
     * @returns A base64-encoded string representing the operation.
     */
    deployPool(contractArgs: DeployV1Args): string;
}
export declare class PoolFactoryContractV2 extends PoolFactoryContract {
    constructor(address: string);
    static readonly spec: contract.Spec;
    static readonly parsers: {
        constructor: (result: string) => string;
        deployPool: (result: string) => string;
        isPool: (result: string) => boolean;
    };
    /**
     * Deploys a new instance of the Pool Factory V2 contract.
     *
     * @param deployer - The address of the deployer.
     * @param wasmHash - The hash of the WASM contract code.
     * @param pool_init_meta - The pool initialization metadata.
     * @param pool_init_meta.pool_hash - The hash of the pool contract code.
     * @param pool_init_meta.backstop - The address of the backstop contract.
     * @param pool_init_meta.blnd_id - The address of the BLND token contract.
     * @param salt - Optional salt for the contract deployment.
     * @param format - Optional format for the WASM hash (hex or base64).
     *
     * @returns A base64-encoded string representing the contract deployment operation.
     */
    static deploy(deployer: string, wasmHash: Buffer | string, pool_init_meta: PoolInitMeta, salt?: Buffer, format?: 'hex' | 'base64'): string;
    /**
     * Deploys and initializes a lending pool with enhanced features like minimum collateral requirements.
     *
     * @param contractArgs - The arguments required for deploying a pool.
     * @param contractArgs.admin - The admin address for the pool.
     * @param contractArgs.name - The name of the pool.
     * @param contractArgs.salt - The salt for the pool address (32 bytes).
     * @param contractArgs.oracle - The oracle address for the pool.
     * @param contractArgs.backstop_take_rate - The backstop take rate for the pool (7 decimals).
     * @param contractArgs.max_positions - The maximum user positions supported by the pool.
     * @param contractArgs.min_collateral - The minimum collateral required for a borrow position (oracle decimals).
     *
     * @returns A base64-encoded string representing the operation.
     */
    deployPool(contractArgs: DeployV2Args): string;
}
