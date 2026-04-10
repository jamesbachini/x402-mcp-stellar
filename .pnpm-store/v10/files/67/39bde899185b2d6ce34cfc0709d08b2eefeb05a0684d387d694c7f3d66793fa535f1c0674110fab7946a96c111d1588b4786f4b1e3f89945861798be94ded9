import { rpc } from '@stellar/stellar-sdk';
import { BaseBlendEvent, BlendContractType } from '../base_event.js';
import { Swap } from './index.js';
export declare enum EmitterEventType {
    Distribute = "distribute",
    QueueSwap = "q_swap",
    DeleteSwap = "del_swap",
    Swap = "swap",
    Drop = "drop"
}
export interface BaseEmitterEvent extends BaseBlendEvent {
    contractType: BlendContractType.Emitter;
}
export interface EmitterDistributeEvent extends BaseEmitterEvent {
    eventType: EmitterEventType.Distribute;
    backstop: string;
    amount: bigint;
}
export interface EmitterQueueSwapEvent extends BaseEmitterEvent {
    eventType: EmitterEventType.QueueSwap;
    swap: Swap;
}
export interface EmitterDeleteSwapEvent extends BaseEmitterEvent {
    eventType: EmitterEventType.DeleteSwap;
    swap: Swap;
}
export interface EmitterSwapEvent extends BaseEmitterEvent {
    eventType: EmitterEventType.Swap;
    swap: Swap;
}
export interface EmitterDropEvent extends BaseEmitterEvent {
    eventType: EmitterEventType.Drop;
    list: any;
}
export type EmitterEvent = EmitterDistributeEvent | EmitterQueueSwapEvent | EmitterDeleteSwapEvent | EmitterSwapEvent | EmitterDropEvent;
/**
 * Create an EmitterEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The EmitterEvent or undefined if the EventResponse is not an EmitterEvent
 */
export declare function emitterEventFromEventResponse(eventResponse: rpc.Api.RawEventResponse): EmitterEvent | undefined;
