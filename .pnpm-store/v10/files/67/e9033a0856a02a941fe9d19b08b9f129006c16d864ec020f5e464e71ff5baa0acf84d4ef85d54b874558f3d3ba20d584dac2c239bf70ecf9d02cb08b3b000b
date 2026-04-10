"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backstopEventV2FromEventResponse = exports.backstopEventV1FromEventResponse = exports.BackstopEventType = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const base_event_js_1 = require("../base_event.js");
var BackstopEventType;
(function (BackstopEventType) {
    BackstopEventType["Deposit"] = "deposit";
    BackstopEventType["QueueWithdrawal"] = "queue_withdrawal";
    BackstopEventType["DequeueWithdrawal"] = "dequeue_withdrawal";
    BackstopEventType["Withdraw"] = "withdraw";
    BackstopEventType["GulpEmissions"] = "gulp_emissions";
    BackstopEventType["RewardZone"] = "rw_zone";
    BackstopEventType["Claim"] = "claim";
    BackstopEventType["Draw"] = "draw";
    BackstopEventType["Donate"] = "donate";
    BackstopEventType["Distribute"] = "distribute";
    BackstopEventType["RewardZoneAdd"] = "rw_zone_add";
    BackstopEventType["RewardZoneRemove"] = "rw_zone_remove";
})(BackstopEventType || (exports.BackstopEventType = BackstopEventType = {}));
/**
 * Create a BackstopEventV1 from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The BackstopV1Event or undefined if the EventResponse is not a BackstopEvent
 */
function backstopEventV1FromEventResponse(eventResponse) {
    if (eventResponse.type !== 'contract' ||
        eventResponse.topic.length === 0 ||
        eventResponse.contractId === undefined) {
        return undefined;
    }
    const baseEvent = backstopEventFromEventResponse(eventResponse);
    if (baseEvent === undefined) {
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
                eventType: eventString,
                ledger: eventResponse.ledger,
                ledgerClosedAt: eventResponse.ledgerClosedAt,
                txHash: eventResponse.txHash,
            };
            switch (eventString) {
                case BackstopEventType.GulpEmissions: {
                    if (topic_scval.length !== 1) {
                        return undefined;
                    }
                    const newBLND = BigInt((0, stellar_sdk_1.scValToNative)(value_scval));
                    return {
                        ...baseEvent,
                        contractType: base_event_js_1.BlendContractType.Backstop,
                        eventType: BackstopEventType.GulpEmissions,
                        newBLND: newBLND,
                    };
                }
                case BackstopEventType.RewardZone: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 1 || valueAsVec.length !== 2) {
                        return undefined;
                    }
                    const toAdd = stellar_sdk_1.Address.fromScVal(valueAsVec[0]).toString();
                    const toRemove = stellar_sdk_1.Address.fromScVal(valueAsVec[1]).toString();
                    return {
                        ...baseEvent,
                        contractType: base_event_js_1.BlendContractType.Backstop,
                        eventType: BackstopEventType.RewardZone,
                        toAdd: toAdd,
                        toRemove: toRemove,
                    };
                }
                default:
                    return undefined;
            }
        }
        catch (e) {
            // conversion functions throw on a malformed (or non-backstop) events
            // return undefined in this case
            return undefined;
        }
    }
    else {
        return baseEvent;
    }
}
exports.backstopEventV1FromEventResponse = backstopEventV1FromEventResponse;
/**
 * Create a BackstopEventV2 from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The BackstopV2Event or undefined if the EventResponse is not a BackstopEvent
 */
function backstopEventV2FromEventResponse(eventResponse) {
    if (eventResponse.type !== 'contract' ||
        eventResponse.topic.length === 0 ||
        eventResponse.contractId === undefined) {
        return undefined;
    }
    const baseEvent = backstopEventFromEventResponse(eventResponse);
    if (baseEvent === undefined) {
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
                eventType: eventString,
                ledger: eventResponse.ledger,
                ledgerClosedAt: eventResponse.ledgerClosedAt,
                txHash: eventResponse.txHash,
            };
            switch (eventString) {
                case BackstopEventType.GulpEmissions: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 1 && valueAsVec.length != 2) {
                        return undefined;
                    }
                    const newBackstopEmissions = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[0]));
                    const newPoolEmissions = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[1]));
                    return {
                        ...baseEvent,
                        contractType: base_event_js_1.BlendContractType.Backstop,
                        eventType: BackstopEventType.GulpEmissions,
                        newBackstopEmissions: newBackstopEmissions,
                        newPoolEmissions: newPoolEmissions,
                    };
                }
                case BackstopEventType.Distribute: {
                    if (topic_scval.length !== 1) {
                        return undefined;
                    }
                    const newEmissions = BigInt((0, stellar_sdk_1.scValToNative)(value_scval));
                    return {
                        ...baseEvent,
                        contractType: base_event_js_1.BlendContractType.Backstop,
                        eventType: BackstopEventType.Distribute,
                        newEmissions: newEmissions,
                    };
                }
                case BackstopEventType.RewardZoneAdd: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 1 || valueAsVec.length !== 2) {
                        return undefined;
                    }
                    const toAdd = stellar_sdk_1.Address.fromScVal(valueAsVec[0]).toString();
                    const toRemove = (0, stellar_sdk_1.scValToNative)(valueAsVec[1]);
                    return {
                        ...baseEvent,
                        contractType: base_event_js_1.BlendContractType.Backstop,
                        eventType: BackstopEventType.RewardZoneAdd,
                        toAdd: toAdd,
                        toRemove: toRemove,
                    };
                }
                case BackstopEventType.RewardZoneRemove: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 1) {
                        return undefined;
                    }
                    const toRemove = stellar_sdk_1.Address.fromScVal(valueAsVec[0]).toString();
                    return {
                        ...baseEvent,
                        contractType: base_event_js_1.BlendContractType.Backstop,
                        eventType: BackstopEventType.RewardZoneRemove,
                        toRemove: toRemove,
                    };
                }
                default:
                    return undefined;
            }
        }
        catch (e) {
            // conversion functions throw on a malformed (or non-backstop) events
            // return undefined in this case
            return undefined;
        }
    }
    else {
        return baseEvent;
    }
}
exports.backstopEventV2FromEventResponse = backstopEventV2FromEventResponse;
/**
 * Create a base BackstopEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The BackstopEvent or undefined if the EventResponse is not a BackstopEvent
 */
function backstopEventFromEventResponse(eventResponse) {
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
            eventType: eventString,
            ledger: eventResponse.ledger,
            ledgerClosedAt: eventResponse.ledgerClosedAt,
            txHash: eventResponse.txHash,
        };
        switch (eventString) {
            case BackstopEventType.Deposit: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 3 || valueAsVec.length !== 2) {
                    return undefined;
                }
                const pool_address = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const from = stellar_sdk_1.Address.fromScVal(topic_scval[2]).toString();
                const amount = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[0]));
                const shares = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[1]));
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.Deposit,
                    poolAddress: pool_address,
                    from: from,
                    amount: amount,
                    sharesMinted: shares,
                };
            }
            case BackstopEventType.QueueWithdrawal: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 3 || valueAsVec.length !== 2) {
                    return undefined;
                }
                const pool_address = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const from = stellar_sdk_1.Address.fromScVal(topic_scval[2]).toString();
                const shares = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[0]));
                const expiration = Number((0, stellar_sdk_1.scValToNative)(valueAsVec[1]));
                if (isNaN(expiration)) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.QueueWithdrawal,
                    poolAddress: pool_address,
                    from: from,
                    shares: shares,
                    expiration: expiration,
                };
            }
            case BackstopEventType.DequeueWithdrawal: {
                if (topic_scval.length !== 3) {
                    return undefined;
                }
                const pool_address = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const from = stellar_sdk_1.Address.fromScVal(topic_scval[2]).toString();
                const shares = BigInt((0, stellar_sdk_1.scValToNative)(value_scval));
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.DequeueWithdrawal,
                    poolAddress: pool_address,
                    from: from,
                    shares: shares,
                };
            }
            case BackstopEventType.Withdraw: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 3 || valueAsVec.length !== 2) {
                    return undefined;
                }
                const pool_address = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const from = stellar_sdk_1.Address.fromScVal(topic_scval[2]).toString();
                const shares = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[0]));
                const tokensWithdrawn = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[1]));
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.Withdraw,
                    poolAddress: pool_address,
                    from: from,
                    shares: shares,
                    tokensWithdrawn: tokensWithdrawn,
                };
            }
            case BackstopEventType.Claim: {
                if (topic_scval.length !== 2) {
                    return undefined;
                }
                const from = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const amount = BigInt((0, stellar_sdk_1.scValToNative)(value_scval));
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.Claim,
                    from: from,
                    amount: amount,
                };
            }
            case BackstopEventType.Draw: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 2 || valueAsVec.length !== 2) {
                    return undefined;
                }
                const pool_address = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const to = stellar_sdk_1.Address.fromScVal(valueAsVec[0]).toString();
                const amount = BigInt((0, stellar_sdk_1.scValToNative)(valueAsVec[1]));
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.Draw,
                    poolAddress: pool_address,
                    to: to,
                    amount: amount,
                };
            }
            case BackstopEventType.Donate: {
                if (topic_scval.length !== 3) {
                    return undefined;
                }
                const pool_address = stellar_sdk_1.Address.fromScVal(topic_scval[1]).toString();
                const from = stellar_sdk_1.Address.fromScVal(topic_scval[2]).toString();
                const amount = BigInt((0, stellar_sdk_1.scValToNative)(value_scval));
                return {
                    ...baseEvent,
                    contractType: base_event_js_1.BlendContractType.Backstop,
                    eventType: BackstopEventType.Donate,
                    poolAddress: pool_address,
                    from: from,
                    amount: amount,
                };
            }
            default:
                return undefined;
        }
    }
    catch (e) {
        // conversion functions throw on a malformed (or non-backstop) events
        // return undefined in this case
        return undefined;
    }
}
