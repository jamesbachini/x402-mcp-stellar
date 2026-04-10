import { Address, Contract, contract } from '@stellar/stellar-sdk';
import { Option, Swap, i128, u64 } from '../index.js';
export interface EmitterInitializeArgs {
    blnd_token: Address | string;
    backstop: Address | string;
    backstop_token: Address | string;
}
export interface QueueSwapBackstopArgs {
    new_backstop: Address | string;
    new_backstop_token: Address | string;
}
export declare class EmitterContract extends Contract {
    static spec: contract.Spec;
    static readonly parsers: {
        initialize: () => void;
        distribute: (result: string) => i128;
        getLastDistro: (result: string) => u64;
        getBackstop: (result: string) => string;
        queueSwapBackstop: () => void;
        getQueuedSwap: (result: string) => Option<Swap>;
        cancelSwapBackstop: () => void;
        swapBackstop: () => void;
        drop: () => void;
    };
    /**
     * Initializes the Emitter contract.
     *
     * @param contractArgs - The arguments required for initialization.
     * @param contractArgs.blnd_token - The Blend token Address the Emitter will distribute.
     * @param contractArgs.backstop - The backstop module address to emit to.
     * @param contractArgs.backstop_token - The token the backstop takes deposits in.
     *
     * @returns A base64-encoded string representing the operation.
     */
    initialize(contractArgs: EmitterInitializeArgs): string;
    /**
     * Distributes BLND tokens to the current backstop module.
     *
     * @returns A base64-encoded string representing the operation.
     */
    distribute(): string;
    /**
     * Fetches the last time the Emitter distributed to the specified backstop module.
     *
     * @param backstop_id - The backstop module Address ID.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getLastDistro(backstop_id: Address | string): string;
    /**
     * Fetches the current backstop module address.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getBackstop(): string;
    /**
     * Queues up a swap of the current backstop module and token to new addresses.
     *
     * @param contractArgs - The arguments required for queuing a backstop swap.
     * @param contractArgs.new_backstop - The Address of the new backstop module.
     * @param contractArgs.new_backstop_token - The address of the new backstop token.
     *
     * @throws Will throw an error if the input contract does not have more backstop deposits than
     * the listed backstop module of the current backstop token.
     *
     * @returns A base64-encoded string representing the operation.
     */
    queueSwapBackstop(contractArgs: QueueSwapBackstopArgs): string;
    /**
     * Fetches the queued backstop swap, or None if nothing is queued.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getQueuedSwap(): string;
    /**
     * Verifies that a queued swap still meets the requirements to be executed.
     * If not, the queued swap is cancelled and must be recreated.
     *
     * @throws Will throw an error if the queued swap is still valid.
     *
     * @returns A base64-encoded string representing the operation.
     */
    cancelSwapBackstop(): string;
    /**
     * Executes a queued swap of the current backstop module to one with more effective backstop deposits.
     *
     * @throws Will throw an error if the input contract does not have more backstop deposits than the
     * listed backstop module, or if the queued swap has not been unlocked.
     *
     * @returns A base64-encoded string representing the operation.
     */
    swapBackstop(): string;
}
