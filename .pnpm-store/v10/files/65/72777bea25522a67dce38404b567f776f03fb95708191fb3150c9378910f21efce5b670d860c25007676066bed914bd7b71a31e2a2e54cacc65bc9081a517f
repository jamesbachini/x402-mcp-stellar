import { rpc } from '@stellar/stellar-sdk';
import { BaseBlendEvent, BlendContractType } from '../base_event.js';
export declare enum PoolFactoryEventType {
    Deploy = "deploy"
}
export interface PoolFactoryDeployEvent extends BaseBlendEvent {
    contractType: BlendContractType.PoolFactory;
    eventType: PoolFactoryEventType.Deploy;
    poolAddress: string;
}
export type PoolFactoryEvent = PoolFactoryDeployEvent;
/**
 * Create a PoolFactoryEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolFactoryEvent or undefined if the EventResponse is not a PoolFactoryEvent
 */
export declare function poolFactoryEventFromEventResponse(eventResponse: rpc.Api.RawEventResponse): PoolFactoryEvent | undefined;
