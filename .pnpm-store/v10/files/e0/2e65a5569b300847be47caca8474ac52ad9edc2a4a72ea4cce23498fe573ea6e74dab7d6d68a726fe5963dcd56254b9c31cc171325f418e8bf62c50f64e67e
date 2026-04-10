/// <reference types="node" />
import { Address, Contract, contract } from '@stellar/stellar-sdk';
import { i128, PoolBackstopDataV2 } from '../index.js';
import { PoolBackstopDataV1, Q4W, UserBalance } from './index.js';
export interface BackstopConstructorArgs {
    backstop_token: Address | string;
    emitter: Address | string;
    usdc_token: Address | string;
    blnd_token: Address | string;
    pool_factory: Address | string;
    drop_list: Array<readonly [string, i128]>;
}
export interface PoolBackstopActionArgs {
    from: Address | string;
    pool_address: Address | string;
    amount: i128;
}
export interface BackstopClaimV1Args {
    from: Address | string;
    pool_addresses: Array<Address | string>;
    to: Address | string;
}
export interface BackstopClaimV2Args {
    from: Address | string;
    pool_addresses: Array<Address | string>;
    min_lp_tokens_out: i128;
}
export interface DrawArgs {
    to: Address | string;
    pool_address: Address | string;
    amount: i128;
}
export declare abstract class BackstopContract extends Contract {
    static spec: contract.Spec;
    static readonly parsers: {
        deposit: (result: string) => i128;
        queueWithdrawal: (result: string) => Q4W;
        dequeueWithdrawal: () => void;
        withdraw: (result: string) => i128;
        userBalance: (result: string) => UserBalance;
        backstopToken: (result: string) => string;
        addReward: () => void;
        claim: (result: string) => i128;
        drop: () => void;
        draw: () => void;
        donate: () => void;
    };
    /**
     * Deposits backstop tokens from an address into the backstop of a pool.
     *
     * @param contractArgs - The arguments required for the deposit.
     * @param contractArgs.from - The address depositing into the backstop.
     * @param contractArgs.pool_address - The address of the pool.
     * @param contractArgs.amount - The amount of tokens to deposit.
     *
     * @returns A base64-encoded string representing the operation that must be submitted in a transaction.
     */
    deposit(contractArgs: PoolBackstopActionArgs): string;
    /**
     * Queues deposited pool shares for withdrawal from a backstop of a pool.
     *
     * @param contractArgs - The arguments required for queuing a withdrawal.
     * @param contractArgs.from - The address whose deposits are being queued for withdrawal.
     * @param contractArgs.pool_address - The address of the pool.
     * @param contractArgs.amount - The amount of shares to queue for withdrawal.
     *
     * @returns A base64-encoded string representing the operation.
     */
    queueWithdrawal(contractArgs: PoolBackstopActionArgs): string;
    /**
     * Dequeues a currently queued pool share withdrawal from the backstop of a pool.
     *
     * @param contractArgs - The arguments required for dequeuing a withdrawal.
     * @param contractArgs.from - The address whose deposits are being dequeued.
     * @param contractArgs.pool_address - The address of the pool.
     * @param contractArgs.amount - The amount of shares to dequeue.
     *
     * @returns A base64-encoded string representing the operation.
     */
    dequeueWithdrawal(contractArgs: PoolBackstopActionArgs): string;
    /**
     * Withdraws shares from a user's withdraw queue for a backstop of a pool.
     *
     * @param contractArgs - The arguments required for withdrawing shares.
     * @param contractArgs.from - The address whose shares are being withdrawn.
     * @param contractArgs.pool_address - The address of the pool.
     * @param contractArgs.amount - The amount of shares to withdraw.
     *
     * @returns A base64-encoded string representing the operation.
     */
    withdraw(contractArgs: PoolBackstopActionArgs): string;
    /**
     * Sends backstop tokens from an address to a pool's backstop. Can only be called by the pool.
     * Note: This is not a deposit, and the sender will permanently lose access to the funds.
     *
     * @param contractArgs - The arguments required for donating to the backstop.
     * @param contractArgs.from - The address donating tokens to the backstop.
     * @param contractArgs.pool_address - The address of the pool.
     * @param contractArgs.amount - The amount of tokens to donate.
     *
     * @throws Will throw an error if the pool_address is not valid or if the pool does not authorize the call.
     *
     * @returns A base64-encoded string representing the operation.
     */
    donate(contractArgs: PoolBackstopActionArgs): string;
    /**
     * Drops initial BLND to a list of addresses through the emitter.
     *
     * @returns A base64-encoded string representing the operation.
     */
    drop(): string;
    /**
     * Fetches the balance of backstop shares of a pool for a user.
     *
     * @param pool - The address of the pool.
     * @param user - The user to fetch the balance for.
     *
     * @returns A base64-encoded string representing the operation.
     */
    userBalance(pool: Address | string, user: Address | string): string;
    /**
     * Fetches the backstop token for the backstop.
     *
     * @returns A base64-encoded string representing the operation.
     */
    backstopToken(): string;
}
export declare class BackstopContractV1 extends BackstopContract {
    constructor(address: string);
    static readonly spec: contract.Spec;
    static readonly parsers: {
        initialize: () => void;
        gulpEmissions: () => void;
        addReward: () => void;
        poolData: (result: string) => PoolBackstopDataV1;
        gulpPoolEmissions: (result: string) => i128;
        updateTknVal: (result: string) => [i128, i128];
        deposit: (result: string) => bigint;
        queueWithdrawal: (result: string) => Q4W;
        dequeueWithdrawal: () => void;
        withdraw: (result: string) => bigint;
        userBalance: (result: string) => UserBalance;
        backstopToken: (result: string) => string;
        claim: (result: string) => bigint;
        drop: () => void;
        draw: () => void;
        donate: () => void;
    };
    /**
     * Initializes the backstop contract. This function requires that the Emitter has already been initialized.
     *
     * @param contractArgs - The arguments required for initialization.
     * @param contractArgs.backstop_token - The backstop token ID - an LP token with the pair BLND:USDC.
     * @param contractArgs.emitter - The Emitter contract ID.
     * @param contractArgs.usdc_token - The USDC token ID.
     * @param contractArgs.blnd_token - The BLND token ID.
     * @param contractArgs.pool_factory - The pool factory ID.
     * @param contractArgs.drop_list - The list of addresses to distribute initial BLND to and the percent of the distribution they should receive.
     *
     * @throws Will throw an error if initialize has already been called.
     *
     * @returns A base64-encoded string representing the operation.
     */
    initialize(contractArgs: BackstopConstructorArgs): string;
    /**
     * Consumes emissions from the Emitter and distributes them to backstops and pools in the reward zone.
     *
     * @returns A base64-encoded string representing the operation.
     */
    gulpEmissions(): string;
    /**
     * Adds a pool to the reward zone, and if the reward zone is full, removes another pool.
     *
     * @param to_add - The address of the pool to add.
     * @param to_remove - The address of the pool to remove.
     *
     * @throws Will throw an error if the pool to remove has more tokens, or if distribution occurred in the last 48 hours.
     *
     * @returns A base64-encoded string representing the operation.
     */
    addReward(to_add: string, to_remove: string): string;
    /**
     * Updates the underlying value of 1 backstop token.
     *
     * @returns A base64-encoded string representing the operation.
     */
    updateTokenValue(): string;
    /**
     * Claims backstop deposit emissions from a list of pools for a user.
     *
     * @param contractArgs - The arguments required for claiming emissions.
     * @param contractArgs.from - The address of the user claiming emissions.
     * @param contractArgs.pool_addresses - The list of addresses to claim backstop deposit emissions from.
     * @param contractArgs.to - The address to send the emissions to.
     *
     * @throws Will throw an error if an invalid pool address is included.
     *
     * @returns A base64-encoded string representing the operation.
     */
    claim(contractArgs: BackstopClaimV1Args): string;
}
export declare class BackstopContractV2 extends BackstopContract {
    constructor(address: string);
    static readonly spec: contract.Spec;
    static readonly parsers: {
        deploy: (result: string) => string;
        poolData: (result: string) => PoolBackstopDataV2;
        distribute: (result: string) => i128;
        removeReward: () => void;
        deposit: (result: string) => bigint;
        queueWithdrawal: (result: string) => Q4W;
        dequeueWithdrawal: () => void;
        withdraw: (result: string) => bigint;
        userBalance: (result: string) => UserBalance;
        backstopToken: (result: string) => string;
        addReward: () => void;
        claim: (result: string) => bigint;
        drop: () => void;
        draw: () => void;
        donate: () => void;
    };
    /**
     * Deploys a new instance of the Backstop V2 contract.
     *
     * @param deployer - The address of the deployer.
     * @param wasmHash - The hash of the WASM contract code.
     * @param args - The constructor arguments for the contract.
     * @param args.backstop_token - The backstop token ID - an LP token with the pair BLND:USDC.
     * @param args.emitter - The Emitter contract ID.
     * @param args.blnd_token - The BLND token ID.
     * @param args.usdc_token - The USDC token ID.
     * @param args.pool_factory - The pool factory ID.
     * @param args.drop_list - The list of addresses to distribute initial BLND to and the percent of the distribution they should receive.
     * @param salt - Optional salt for the contract deployment.
     * @param format - Optional format for the WASM hash (hex or base64).
     *
     * @returns A base64-encoded string representing the contract deployment operation.
     */
    static deploy(deployer: string, wasmHash: Buffer | string, args: BackstopConstructorArgs, salt?: Buffer, format?: 'hex' | 'base64'): string;
    /**
     * Updates the backstop with new emissions for all reward zone pools.
     *
     * @returns A base64-encoded string representing the operation.
     */
    distribute(): string;
    /**
     * Adds a pool to the reward zone, and if the reward zone is full, can optionally remove another pool.
     *
     * @param to_add - The address of the pool to add.
     * @param to_remove - The address of the pool to remove (Optional - Used if the reward zone is full).
     *
     * @throws Will throw an error if the pool to remove has more tokens, or if distribution occurred in the last 48 hours.
     *
     * @returns A base64-encoded string representing the operation.
     */
    addReward(to_add: string, to_remove: string | undefined): string;
    /**
     * Removes a pool from the reward zone.
     *
     * @param poolToRemove - The address of the pool to remove.
     *
     * @throws Will throw an error if the pool is not below the threshold or if the pool is not in the reward zone.
     *
     * @returns A base64-encoded string representing the operation.
     */
    removeReward(poolToRemove: string): string;
    /**
     * Claims backstop deposit emissions from a list of pools for a user.
     *
     * @param contractArgs - The arguments required for claiming emissions.
     * @param contractArgs.from - The address of the user claiming emissions.
     * @param contractArgs.pool_addresses - The list of addresses to claim backstop deposit emissions from.
     * @param contractArgs.min_lp_tokens_out - The minimum amount of LP tokens to mint with the claimed BLND.
     *
     * @throws Will throw an error if an invalid pool address is included.
     *
     * @returns A base64-encoded string representing the operation.
     */
    claim(contractArgs: BackstopClaimV2Args): string;
    /**
     * Fetches the reward zone for the backstop.
     *
     * @returns A base64-encoded string representing the operation.
     */
    rewardZone(): string;
}
