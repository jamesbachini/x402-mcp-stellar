import { Address, Contract, contract, Operation, scValToNative, xdr } from '@stellar/stellar-sdk';
export class PoolFactoryContract extends Contract {
    // @dev: Generated from soroban-cli Typescript bindings
    static spec = new contract.Spec([
        // Enum PoolFactoryError
        'AAAABAAAAKlFcnJvciBjb2RlcyBmb3IgdGhlIHBvb2wgZmFjdG9yeSBjb250cmFjdC4gQ29tbW9uIGVycm9ycyBhcmUgY29kZXMgdGhhdCBtYXRjaCB1cCB3aXRoIHRoZSBidWlsdC1pbgpjb250cmFjdHMgZXJyb3IgcmVwb3J0aW5nLiBQb29sIGZhY3Rvcnkgc3BlY2lmaWMgZXJyb3JzIHN0YXJ0IGF0IDEzMDAuAAAAAAAAAAAAABBQb29sRmFjdG9yeUVycm9yAAAAAwAAAAAAAAANSW50ZXJuYWxFcnJvcgAAAAAAAAEAAAAAAAAAF0FscmVhZHlJbml0aWFsaXplZEVycm9yAAAAAAMAAAAAAAAAE0ludmFsaWRQb29sSW5pdEFyZ3MAAAAFFA==',
        // Function is_pool
        'AAAAAAAAAAAAAAAHaXNfcG9vbAAAAAABAAAAAAAAAAxwb29sX2FkZHJlc3MAAAATAAAAAQAAAAE=',
        // Union PoolFactoryDataKey
        'AAAAAgAAAAAAAAAAAAAAElBvb2xGYWN0b3J5RGF0YUtleQAAAAAAAQAAAAEAAAAAAAAACUNvbnRyYWN0cwAAAAAAAAEAAAAT',
        // Struct PoolInitMeta
        'AAAAAQAAAAAAAAAAAAAADFBvb2xJbml0TWV0YQAAAAMAAAAAAAAACGJhY2tzdG9wAAAAEwAAAAAAAAAHYmxuZF9pZAAAAAATAAAAAAAAAAlwb29sX2hhc2gAAAAAAAPuAAAAIA==',
    ]);
    static parsers = {
        isPool: (result) => PoolFactoryContract.spec.funcResToNative('is_pool', result),
    };
    /**
     * Checks if a contract address was deployed by the factory.
     *
     * @param pool_address - The contract address to be checked.
     *
     * @returns A base64-encoded string representing the operation.
     */
    isPool(pool_address) {
        return this.call('deploy', ...PoolFactoryContract.spec.funcArgsToScVals('deploy', { pool_address })).toXDR('base64');
    }
}
export class PoolFactoryContractV1 extends PoolFactoryContract {
    constructor(address) {
        super(address);
    }
    static spec = new contract.Spec([
        ...PoolFactoryContract.spec.entries,
        ...new contract.Spec([
            // Function initialize
            'AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAOcG9vbF9pbml0X21ldGEAAAAAB9AAAAAMUG9vbEluaXRNZXRhAAAAAA==',
            // Function Deploy
            'AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAGAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAAAAAARzYWx0AAAD7gAAACAAAAAAAAAABm9yYWNsZQAAAAAAEwAAAAAAAAASYmFja3N0b3BfdGFrZV9yYXRlAAAAAAAEAAAAAAAAAA1tYXhfcG9zaXRpb25zAAAAAAAABAAAAAEAAAAT',
        ]).entries,
    ]);
    static parsers = {
        ...PoolFactoryContract.parsers,
        deployPool: (result) => PoolFactoryContractV1.spec.funcResToNative('deploy', result),
        initialize: () => { },
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
    initialize(pool_init_meta) {
        return this.call('initialize', ...PoolFactoryContractV1.spec.funcArgsToScVals('initialize', { pool_init_meta })).toXDR('base64');
    }
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
    deployPool(contractArgs) {
        return this.call('deploy', ...PoolFactoryContractV1.spec.funcArgsToScVals('deploy', contractArgs)).toXDR('base64');
    }
}
export class PoolFactoryContractV2 extends PoolFactoryContract {
    constructor(address) {
        super(address);
    }
    static spec = new contract.Spec([
        ...PoolFactoryContract.spec.entries,
        ...new contract.Spec([
            // Function constructor
            'AAAAAAAAAGhDb25zdHJ1Y3QgdGhlIHBvb2wgZmFjdG9yeSBjb250cmFjdAoKIyMjIEFyZ3VtZW50cwoqIGBwb29sX2luaXRfbWV0YWAgLSBUaGUgcG9vbCBpbml0aWFsaXphdGlvbiBtZXRhZGF0YQAAAA1fX2NvbnN0cnVjdG9yAAAAAAAAAQAAAAAAAAAOcG9vbF9pbml0X21ldGEAAAAAB9AAAAAMUG9vbEluaXRNZXRhAAAAAA==',
            // Function deploy
            'AAAAAAAAAAAAAAAGZGVwbG95AAAAAAAHAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAAAAAARzYWx0AAAD7gAAACAAAAAAAAAABm9yYWNsZQAAAAAAEwAAAAAAAAASYmFja3N0b3BfdGFrZV9yYXRlAAAAAAAEAAAAAAAAAA1tYXhfcG9zaXRpb25zAAAAAAAABAAAAAAAAAAObWluX2NvbGxhdGVyYWwAAAAAAAsAAAABAAAAEw==',
        ]).entries,
    ]);
    static parsers = {
        ...PoolFactoryContract.parsers,
        constructor: (result) => scValToNative(xdr.ScVal.fromXDR(result, 'base64')),
        deployPool: (result) => PoolFactoryContractV2.spec.funcResToNative('deploy', result),
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
    static deploy(deployer, wasmHash, pool_init_meta, salt, format) {
        return Operation.createCustomContract({
            address: Address.fromString(deployer),
            wasmHash: typeof wasmHash === 'string'
                ? Buffer.from(wasmHash, format ?? 'hex')
                : wasmHash,
            salt,
            constructorArgs: this.spec.funcArgsToScVals('__constructor', { pool_init_meta }),
        }).toXDR('base64');
    }
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
    deployPool(contractArgs) {
        return this.call('deploy', ...PoolFactoryContractV2.spec.funcArgsToScVals('deploy', contractArgs)).toXDR('base64');
    }
}
