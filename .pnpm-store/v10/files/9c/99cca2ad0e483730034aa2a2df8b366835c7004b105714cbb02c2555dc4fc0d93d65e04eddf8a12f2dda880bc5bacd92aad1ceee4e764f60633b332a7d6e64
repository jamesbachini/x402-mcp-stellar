"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolFactoryEventFromEventResponse = exports.PoolFactoryEventType = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const base_event_js_1 = require("../base_event.js");
var PoolFactoryEventType;
(function (PoolFactoryEventType) {
    PoolFactoryEventType["Deploy"] = "deploy";
})(PoolFactoryEventType || (exports.PoolFactoryEventType = PoolFactoryEventType = {}));
/**
 * Create a PoolFactoryEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolFactoryEvent or undefined if the EventResponse is not a PoolFactoryEvent
 */
function poolFactoryEventFromEventResponse(eventResponse) {
    if (eventResponse.type !== 'contract' ||
        eventResponse.topic.length === 0 ||
        eventResponse.contractId === undefined) {
        return undefined;
    }
    try {
        // NOTE: Decode RawEventResponse to ScVals. Do not update to `rpc.Api.EventResponse`. This
        // will cause failures in the conversion functions due to the requirement that the exact same
        // `js-xdr` code is used. (the same version from two different sources does not work)
        const topic_scval = eventResponse.topic.map((topic) => stellar_sdk_1.xdr.ScVal.fromXDR(topic, 'base64'));
        const value_scval = stellar_sdk_1.xdr.ScVal.fromXDR(eventResponse.value, 'base64');
        // The first topic is the event name as a symbol
        const eventString = (0, stellar_sdk_1.scValToNative)(topic_scval[0]);
        const baseEvent = {
            id: eventResponse.id,
            contractId: eventResponse.contractId,
            contractType: base_event_js_1.BlendContractType.PoolFactory,
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
                const pool_address = stellar_sdk_1.Address.fromScVal(value_scval).toString();
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
exports.poolFactoryEventFromEventResponse = poolFactoryEventFromEventResponse;
