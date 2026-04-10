import { Address, scValToNative, xdr } from '@stellar/stellar-sdk';
import { BlendContractType } from '../base_event.js';
export var PoolFactoryEventType;
(function (PoolFactoryEventType) {
    PoolFactoryEventType["Deploy"] = "deploy";
})(PoolFactoryEventType || (PoolFactoryEventType = {}));
/**
 * Create a PoolFactoryEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolFactoryEvent or undefined if the EventResponse is not a PoolFactoryEvent
 */
export function poolFactoryEventFromEventResponse(eventResponse) {
    if (eventResponse.type !== 'contract' ||
        eventResponse.topic.length === 0 ||
        eventResponse.contractId === undefined) {
        return undefined;
    }
    try {
        // NOTE: Decode RawEventResponse to ScVals. Do not update to `rpc.Api.EventResponse`. This
        // will cause failures in the conversion functions due to the requirement that the exact same
        // `js-xdr` code is used. (the same version from two different sources does not work)
        const topic_scval = eventResponse.topic.map((topic) => xdr.ScVal.fromXDR(topic, 'base64'));
        const value_scval = xdr.ScVal.fromXDR(eventResponse.value, 'base64');
        // The first topic is the event name as a symbol
        const eventString = scValToNative(topic_scval[0]);
        const baseEvent = {
            id: eventResponse.id,
            contractId: eventResponse.contractId,
            contractType: BlendContractType.PoolFactory,
            eventType: eventString,
            ledger: eventResponse.ledger,
            ledgerClosedAt: eventResponse.ledgerClosedAt,
            txHash: eventResponse.txHash,
        };
        switch (eventString) {
            case PoolFactoryEventType.Deploy: {
                if (topic_scval.length !== 1) {
                    return undefined;
                }
                const pool_address = Address.fromScVal(value_scval).toString();
                return {
                    ...baseEvent,
                    eventType: PoolFactoryEventType.Deploy,
                    poolAddress: pool_address,
                };
            }
            default:
                return undefined;
        }
    }
    catch (e) {
        // conversion functions throw on a malformed (or non-poolFactory) events
        // return undefined in this case
        return undefined;
    }
}
