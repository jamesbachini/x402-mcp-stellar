"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterContract = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
class EmitterContract extends stellar_sdk_1.Contract {
    // @dev: Generated from soroban-cli Typescript bindings
    static spec = new stellar_sdk_1.contract.Spec([
        // Function initialize
        'AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAwAAAAAAAAAKYmxuZF90b2tlbgAAAAAAEwAAAAAAAAAIYmFja3N0b3AAAAATAAAAAAAAAA5iYWNrc3RvcF90b2tlbgAAAAAAEwAAAAA=',
        // Function distribute
        'AAAAAAAAAAAAAAAKZGlzdHJpYnV0ZQAAAAAAAAAAAAEAAAAL',
        // Function get_last_distro
        'AAAAAAAAAAAAAAAPZ2V0X2xhc3RfZGlzdHJvAAAAAAEAAAAAAAAAC2JhY2tzdG9wX2lkAAAAABMAAAABAAAABg==',
        // Function get_backstop
        'AAAAAAAAAAAAAAAMZ2V0X2JhY2tzdG9wAAAAAAAAAAEAAAAT',
        // Function queue_swap_backstop
        'AAAAAAAAAAAAAAATcXVldWVfc3dhcF9iYWNrc3RvcAAAAAACAAAAAAAAAAxuZXdfYmFja3N0b3AAAAATAAAAAAAAABJuZXdfYmFja3N0b3BfdG9rZW4AAAAAABMAAAAA',
        // Function get_queued_swap
        'AAAAAAAAAAAAAAAPZ2V0X3F1ZXVlZF9zd2FwAAAAAAAAAAABAAAD6AAAB9AAAAAEU3dhcA==',
        // Function cancel_swap_backstop
        'AAAAAAAAAAAAAAAUY2FuY2VsX3N3YXBfYmFja3N0b3AAAAAAAAAAAA==',
        // Function swap_backstop
        'AAAAAAAAAAAAAAANc3dhcF9iYWNrc3RvcAAAAAAAAAAAAAAA',
        // Function drop
        'AAAAAAAAAAAAAAAEZHJvcAAAAAEAAAAAAAAABGxpc3QAAAPqAAAD7QAAAAIAAAATAAAACwAAAAA=',
        // Struct Swap
        'AAAAAQAAAAAAAAAAAAAABFN3YXAAAAADAAAAAAAAAAxuZXdfYmFja3N0b3AAAAATAAAAAAAAABJuZXdfYmFja3N0b3BfdG9rZW4AAAAAABMAAAAAAAAAC3VubG9ja190aW1lAAAAAAY=',
        // Enum EmitterError
        'AAAABAAAAJ9FcnJvciBjb2RlcyBmb3IgdGhlIGVtaXR0ZXIgY29udHJhY3QuIENvbW1vbiBlcnJvcnMgYXJlIGNvZGVzIHRoYXQgbWF0Y2ggdXAgd2l0aCB0aGUgYnVpbHQtaW4KY29udHJhY3RzIGVycm9yIHJlcG9ydGluZy4gRW1pdHRlciBzcGVjaWZpYyBlcnJvcnMgc3RhcnQgYXQgMTEwMC4AAAAAAAAAAAxFbWl0dGVyRXJyb3IAAAAJAAAAAAAAAA1JbnRlcm5hbEVycm9yAAAAAAAAAQAAAAAAAAAXQWxyZWFkeUluaXRpYWxpemVkRXJyb3IAAAAAAwAAAAAAAAARVW5hdXRob3JpemVkRXJyb3IAAAAAAAAEAAAAAAAAABhJbnN1ZmZpY2llbnRCYWNrc3RvcFNpemUAAARMAAAAAAAAAAdCYWREcm9wAAAABE0AAAAAAAAADVN3YXBOb3RRdWV1ZWQAAAAAAAROAAAAAAAAABFTd2FwQWxyZWFkeUV4aXN0cwAAAAAABE8AAAAAAAAAD1N3YXBOb3RVbmxvY2tlZAAAAARQAAAAAAAAABRTd2FwQ2Fubm90QmVDYW5jZWxlZAAABFE=',
        // Union EmitterDataKey
        'AAAAAgAAAAAAAAAAAAAADkVtaXR0ZXJEYXRhS2V5AAAAAAACAAAAAQAAAAAAAAAKTGFzdERpc3RybwAAAAAAAQAAABMAAAABAAAAAAAAAAdEcm9wcGVkAAAAAAEAAAAT',
    ]);
    static parsers = {
        initialize: () => { },
        distribute: (result) => EmitterContract.spec.funcResToNative('distribute', result),
        getLastDistro: (result) => EmitterContract.spec.funcResToNative('get_last_distro', result),
        getBackstop: (result) => EmitterContract.spec.funcResToNative('get_backstop', result),
        queueSwapBackstop: () => { },
        getQueuedSwap: (result) => EmitterContract.spec.funcResToNative('get_queued_swap', result),
        cancelSwapBackstop: () => { },
        swapBackstop: () => { },
        drop: () => { },
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
    initialize(contractArgs) {
        return this.call('initialize', ...EmitterContract.spec.funcArgsToScVals('initialize', contractArgs)).toXDR('base64');
    }
    /**
     * Distributes BLND tokens to the current backstop module.
     *
     * @returns A base64-encoded string representing the operation.
     */
    distribute() {
        return this.call('distribute', ...EmitterContract.spec.funcArgsToScVals('distribute', {})).toXDR('base64');
    }
    /**
     * Fetches the last time the Emitter distributed to the specified backstop module.
     *
     * @param backstop_id - The backstop module Address ID.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getLastDistro(backstop_id) {
        return this.call('get_last_distro', ...EmitterContract.spec.funcArgsToScVals('get_last_distro', { backstop_id })).toXDR('base64');
    }
    /**
     * Fetches the current backstop module address.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getBackstop() {
        return this.call('get_backstop', ...EmitterContract.spec.funcArgsToScVals('get_backstop', {})).toXDR('base64');
    }
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
    queueSwapBackstop(contractArgs) {
        return this.call('queue_swap_backstop', ...EmitterContract.spec.funcArgsToScVals('queue_swap_backstop', contractArgs)).toXDR('base64');
    }
    /**
     * Fetches the queued backstop swap, or None if nothing is queued.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getQueuedSwap() {
        return this.call('get_queued_swap', ...EmitterContract.spec.funcArgsToScVals('get_queued_swap', {})).toXDR('base64');
    }
    /**
     * Verifies that a queued swap still meets the requirements to be executed.
     * If not, the queued swap is cancelled and must be recreated.
     *
     * @throws Will throw an error if the queued swap is still valid.
     *
     * @returns A base64-encoded string representing the operation.
     */
    cancelSwapBackstop() {
        return this.call('cancel_swap_backstop', ...EmitterContract.spec.funcArgsToScVals('cancel_swap_backstop', {})).toXDR('base64');
    }
    /**
     * Executes a queued swap of the current backstop module to one with more effective backstop deposits.
     *
     * @throws Will throw an error if the input contract does not have more backstop deposits than the
     * listed backstop module, or if the queued swap has not been unlocked.
     *
     * @returns A base64-encoded string representing the operation.
     */
    swapBackstop() {
        return this.call('swap_backstop', ...EmitterContract.spec.funcArgsToScVals('swap_backstop', {})).toXDR('base64');
    }
}
exports.EmitterContract = EmitterContract;
