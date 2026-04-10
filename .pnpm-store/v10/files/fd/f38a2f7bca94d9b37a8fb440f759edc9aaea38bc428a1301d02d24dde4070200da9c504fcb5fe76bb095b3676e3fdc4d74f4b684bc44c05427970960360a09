"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitterEventFromEventResponse = exports.EmitterEventType = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const base_event_js_1 = require("../base_event.js");
var EmitterEventType;
(function (EmitterEventType) {
    EmitterEventType["Distribute"] = "distribute";
    EmitterEventType["QueueSwap"] = "q_swap";
    EmitterEventType["DeleteSwap"] = "del_swap";
    EmitterEventType["Swap"] = "swap";
    EmitterEventType["Drop"] = "drop";
})(EmitterEventType || (exports.EmitterEventType = EmitterEventType = {}));
/**
 * Create an EmitterEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The EmitterEvent or undefined if the EventResponse is not an EmitterEvent
 */
function emitterEventFromEventResponse(eventResponse) {
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
            contractType: base_event_js_1.BlendContractType.Emitter,
            eventType: eventString,
            ledger: eventResponse.ledger,
            ledgerClosedAt: eventResponse.ledgerClosedAt,
            txHash: eventResponse.txHash,
        };
        switch (eventString) {
            case EmitterEventType.Distribute: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 1 || valueAsVec.length !== 2) {
                    return undefined;
                }
                const backstop = stellar_sdk_1.Address.fromScVal(valueAsVec[0]).toString();
                const amount = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[1]));
                return {
                    ...baseEvent,
                    eventType: EmitterEventType.Distribute,
                    backstop: backstop,
                    amount: amount,
                };
            }
            case EmitterEventType.QueueSwap: {
                if (topic_scval.length !== 1) {
                    return undefined;
                }
                const swap = (0, stellar_sdk_1.scValToNative)(value_scval);
                if (swap.new_backstop === undefined ||
                    swap.new_backstop_token === undefined ||
                    swap.unlock_time === undefined) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    eventType: EmitterEventType.QueueSwap,
                    swap: swap,
                };
            }
            case EmitterEventType.DeleteSwap: {
                if (topic_scval.length !== 1) {
                    return undefined;
                }
                const swap = (0, stellar_sdk_1.scValToNative)(value_scval);
                if (swap.new_backstop === undefined ||
                    swap.new_backstop_token === undefined ||
                    swap.unlock_time === undefined) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    eventType: EmitterEventType.DeleteSwap,
                    swap: swap,
                };
            }
            case EmitterEventType.Swap: {
                if (topic_scval.length !== 1) {
                    return undefined;
                }
                const swap = (0, stellar_sdk_1.scValToNative)(value_scval);
                if (swap.new_backstop === undefined ||
                    swap.new_backstop_token === undefined ||
                    swap.unlock_time === undefined) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    eventType: EmitterEventType.Swap,
                    swap: swap,
                };
            }
            case EmitterEventType.Drop: {
                if (topic_scval.length !== 1) {
                    return undefined;
                }
                const list = (0, stellar_sdk_1.scValToNative)(value_scval);
                return {
                    ...baseEvent,
                    eventType: EmitterEventType.Drop,
                    list: list,
                };
            }
            default:
                return undefined;
        }
    }
    catch (e) {
        // conversion functions throw on a malformed (or non-emitter) events
        // return undefined in this case
        return undefined;
    }
}
exports.emitterEventFromEventResponse = emitterEventFromEventResponse;
