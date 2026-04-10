import { Address, scValToNative, xdr } from '@stellar/stellar-sdk';
import { BlendContractType } from '../base_event.js';
import { AuctionData } from './index.js';
import { ReserveConfig, ReserveConfigV2 } from './reserve_types.js';
export var PoolEventType;
(function (PoolEventType) {
    PoolEventType["SetAdmin"] = "set_admin";
    PoolEventType["UpdatePool"] = "update_pool";
    PoolEventType["QueueSetReserve"] = "queue_set_reserve";
    PoolEventType["CancelSetReserve"] = "cancel_set_reserve";
    PoolEventType["SetReserve"] = "set_reserve";
    PoolEventType["SetStatus"] = "set_status";
    PoolEventType["UpdateEmissions"] = "update_emissions";
    PoolEventType["ReserveEmissionUpdate"] = "reserve_emission_update";
    PoolEventType["Claim"] = "claim";
    PoolEventType["NewLiquidationAuction"] = "new_liquidation_auction";
    PoolEventType["NewAuction"] = "new_auction";
    PoolEventType["BadDebt"] = "bad_debt";
    PoolEventType["Supply"] = "supply";
    PoolEventType["Withdraw"] = "withdraw";
    PoolEventType["SupplyCollateral"] = "supply_collateral";
    PoolEventType["WithdrawCollateral"] = "withdraw_collateral";
    PoolEventType["Borrow"] = "borrow";
    PoolEventType["Repay"] = "repay";
    PoolEventType["FillAuction"] = "fill_auction";
    PoolEventType["DeleteLiquidationAuction"] = "delete_liquidation_auction";
    PoolEventType["GulpEmissions"] = "gulp_emissions";
    PoolEventType["Gulp"] = "gulp";
    PoolEventType["DefaultedDebt"] = "defaulted_debt";
    PoolEventType["DeleteAuction"] = "delete_auction";
    PoolEventType["FlashLoan"] = "flash_loan";
})(PoolEventType || (PoolEventType = {}));
/**
 * Create a PoolV1Event from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolV1Event or undefined if the EventResponse is not a PoolV1Event
 */
export function poolEventV1FromEventResponse(eventResponse) {
    if (eventResponse.type !== 'contract' ||
        eventResponse.topic.length === 0 ||
        eventResponse.contractId === undefined) {
        return undefined;
    }
    const baseEvent = poolEventFromEventResponse(eventResponse);
    if (baseEvent === undefined) {
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
                contractType: BlendContractType.Pool,
                ledger: eventResponse.ledger,
                ledgerClosedAt: eventResponse.ledgerClosedAt,
                txHash: eventResponse.txHash,
            };
            switch (eventString) {
                case PoolEventType.UpdatePool: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 2 || valueAsVec?.length !== 2) {
                        return undefined;
                    }
                    const admin = Address.fromScVal(topic_scval[1]).toString();
                    const backstopTakeRate = Number(scValToNative(valueAsVec[0]));
                    const maxPositions = Number(scValToNative(valueAsVec[1]));
                    if (isNaN(backstopTakeRate) || isNaN(maxPositions)) {
                        return undefined;
                    }
                    return {
                        ...baseEvent,
                        eventType: PoolEventType.UpdatePool,
                        admin: admin,
                        backstopTakeRate: backstopTakeRate,
                        maxPositions: maxPositions,
                    };
                }
                case PoolEventType.QueueSetReserve: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 2 || valueAsVec?.length !== 2) {
                        return undefined;
                    }
                    const admin = Address.fromScVal(topic_scval[1]).toString();
                    const asset_id = Address.fromScVal(valueAsVec[0]).toString();
                    const reserve_config = ReserveConfig.fromScVal(valueAsVec[1]);
                    return {
                        ...baseEvent,
                        eventType: PoolEventType.QueueSetReserve,
                        admin: admin,
                        assetId: asset_id,
                        reserveConfig: reserve_config,
                    };
                }
                case PoolEventType.UpdateEmissions: {
                    if (topic_scval.length !== 1) {
                        return undefined;
                    }
                    const new_blnd = BigInt(scValToNative(value_scval));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.UpdateEmissions,
                        newBLND: new_blnd,
                    };
                }
                case PoolEventType.NewLiquidationAuction: {
                    if (topic_scval.length !== 2) {
                        return undefined;
                    }
                    const user = Address.fromScVal(topic_scval[1]).toString();
                    const auctionData = AuctionData.fromScVal(value_scval);
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.NewLiquidationAuction,
                        user: user,
                        auctionData: auctionData,
                    };
                }
                case PoolEventType.NewAuction: {
                    if (topic_scval.length !== 2) {
                        return undefined;
                    }
                    const auctionType = Number(scValToNative(topic_scval[1]));
                    const auctionData = AuctionData.fromScVal(value_scval);
                    if (isNaN(auctionType)) {
                        return undefined;
                    }
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.NewAuction,
                        auctionType: auctionType,
                        auctionData: auctionData,
                    };
                }
                case PoolEventType.FillAuction: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 3 && valueAsVec.length == 2) {
                        return undefined;
                    }
                    const user = Address.fromScVal(topic_scval[1]).toString();
                    const auctionType = Number(scValToNative(topic_scval[2]));
                    if (isNaN(auctionType)) {
                        return undefined;
                    }
                    const from = Address.fromScVal(valueAsVec[0]).toString();
                    const fillAmount = BigInt(scValToNative(valueAsVec[1]));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.FillAuction,
                        user: user,
                        auctionType: auctionType,
                        from: from,
                        fillAmount: fillAmount,
                    };
                }
                default:
                    return undefined;
            }
        }
        catch (e) {
            // conversion functions throw on a malformed (or non-pool) events
            // return undefined in this case
            return undefined;
        }
    }
    else {
        return baseEvent;
    }
}
/**
 * Create a PoolV2Event from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolV2Event or undefined if the EventResponse is not a PoolV2Event
 */
export function poolEventV2FromEventResponse(eventResponse) {
    if (eventResponse.type !== 'contract' ||
        eventResponse.topic.length === 0 ||
        eventResponse.contractId === undefined) {
        return undefined;
    }
    const baseEvent = poolEventFromEventResponse(eventResponse);
    if (baseEvent === undefined) {
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
                ledger: eventResponse.ledger,
                ledgerClosedAt: eventResponse.ledgerClosedAt,
                txHash: eventResponse.txHash,
            };
            switch (eventString) {
                case PoolEventType.UpdatePool: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 2 || valueAsVec?.length !== 3) {
                        return undefined;
                    }
                    const admin = Address.fromScVal(topic_scval[1]).toString();
                    const backstopTakeRate = Number(scValToNative(valueAsVec[0]));
                    const maxPositions = Number(scValToNative(valueAsVec[1]));
                    const minCollateral = scValToNative(valueAsVec[2]);
                    if (isNaN(backstopTakeRate) || isNaN(maxPositions) || typeof minCollateral !== 'bigint') {
                        return undefined;
                    }
                    return {
                        ...baseEvent,
                        eventType: PoolEventType.UpdatePool,
                        admin: admin,
                        backstopTakeRate: backstopTakeRate,
                        maxPositions: maxPositions,
                        minCollateral: BigInt(minCollateral),
                    };
                }
                case PoolEventType.QueueSetReserve: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 2 || valueAsVec?.length !== 2) {
                        return undefined;
                    }
                    const admin = Address.fromScVal(topic_scval[1]).toString();
                    const asset_id = Address.fromScVal(valueAsVec[0]).toString();
                    const reserve_config = ReserveConfigV2.fromScVal(valueAsVec[1]);
                    return {
                        ...baseEvent,
                        eventType: PoolEventType.QueueSetReserve,
                        admin: admin,
                        assetId: asset_id,
                        reserveConfig: reserve_config,
                    };
                }
                case PoolEventType.GulpEmissions: {
                    if (topic_scval.length !== 1) {
                        return undefined;
                    }
                    const new_blnd = BigInt(scValToNative(value_scval));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.GulpEmissions,
                        newBLND: new_blnd,
                    };
                }
                case PoolEventType.NewAuction: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 3 && valueAsVec.length !== 2) {
                        return undefined;
                    }
                    const auctionType = Number(scValToNative(topic_scval[1]));
                    if (isNaN(auctionType)) {
                        return undefined;
                    }
                    const auctionData = AuctionData.fromScVal(valueAsVec[1]);
                    const percent = Number(scValToNative(valueAsVec[0]));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.NewAuction,
                        user: Address.fromScVal(topic_scval[2]).toString(),
                        auctionType: auctionType,
                        auctionData: auctionData,
                        percent: percent,
                    };
                }
                case PoolEventType.FillAuction: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 3 && valueAsVec.length !== 3) {
                        return undefined;
                    }
                    const auctionType = Number(scValToNative(topic_scval[1]));
                    const user = Address.fromScVal(topic_scval[2]).toString();
                    if (isNaN(auctionType)) {
                        return undefined;
                    }
                    const filler = Address.fromScVal(valueAsVec[0]).toString();
                    const fillAmount = BigInt(scValToNative(valueAsVec[1]));
                    const filledAuctionData = AuctionData.fromScVal(valueAsVec[2]);
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.FillAuction,
                        user: user,
                        auctionType: auctionType,
                        filler: filler,
                        fillAmount: fillAmount,
                        filledAuctionData: filledAuctionData,
                    };
                }
                case PoolEventType.DeleteLiquidationAuction: {
                    if (topic_scval.length !== 2) {
                        return undefined;
                    }
                    const user = Address.fromScVal(topic_scval[1]).toString();
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.DeleteLiquidationAuction,
                        user: user,
                    };
                }
                case PoolEventType.DefaultedDebt: {
                    if (topic_scval.length !== 2) {
                        return undefined;
                    }
                    const assetId = Address.fromScVal(topic_scval[1]).toString();
                    const dTokens = BigInt(scValToNative(value_scval));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.DefaultedDebt,
                        assetId: assetId,
                        dTokens: dTokens,
                    };
                }
                case PoolEventType.Gulp: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 2 || valueAsVec?.length !== 2) {
                        return undefined;
                    }
                    const assetId = Address.fromScVal(topic_scval[1]).toString();
                    const tokenDelta = BigInt(scValToNative(valueAsVec[0]));
                    const newBRate = BigInt(scValToNative(valueAsVec[1]));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.Gulp,
                        assetId: assetId,
                        tokenDelta: tokenDelta,
                        newBRate: newBRate,
                    };
                }
                case PoolEventType.DeleteAuction: {
                    if (topic_scval.length !== 3) {
                        return undefined;
                    }
                    const auctionType = Number(scValToNative(topic_scval[1]));
                    const user = Address.fromScVal(topic_scval[2]).toString();
                    if (isNaN(auctionType)) {
                        return undefined;
                    }
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.DeleteAuction,
                        user: user,
                        auctionType: auctionType,
                    };
                }
                case PoolEventType.FlashLoan: {
                    const valueAsVec = value_scval.vec();
                    if (topic_scval.length !== 4 && valueAsVec?.length !== 2) {
                        return undefined;
                    }
                    const asset = Address.fromScVal(topic_scval[1]).toString();
                    const from = Address.fromScVal(topic_scval[2]).toString();
                    const contract = Address.fromScVal(topic_scval[3]).toString();
                    const tokensOut = BigInt(scValToNative(valueAsVec[0]));
                    const dTokensMinted = BigInt(scValToNative(valueAsVec[1]));
                    return {
                        ...baseEvent,
                        contractType: BlendContractType.Pool,
                        eventType: PoolEventType.FlashLoan,
                        asset: asset,
                        from: from,
                        contract: contract,
                        tokensOut: tokensOut,
                        dTokensMinted: dTokensMinted,
                    };
                }
                default:
                    return undefined;
            }
        }
        catch (e) {
            // conversion functions throw on a malformed (or non-pool) events
            // return undefined in this case
            return undefined;
        }
    }
    else {
        return baseEvent;
    }
}
/**
 * Create a base PoolEvent from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolEvent or undefined if the EventResponse is not a PoolEvent
 */
function poolEventFromEventResponse(eventResponse) {
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
            contractType: BlendContractType.Pool,
            ledger: eventResponse.ledger,
            ledgerClosedAt: eventResponse.ledgerClosedAt,
            txHash: eventResponse.txHash,
        };
        switch (eventString) {
            case PoolEventType.SetAdmin: {
                if (topic_scval.length !== 2) {
                    return undefined;
                }
                const old_admin = Address.fromScVal(topic_scval[1]).toString();
                const new_admin = Address.fromScVal(value_scval).toString();
                return {
                    ...baseEvent,
                    eventType: PoolEventType.SetAdmin,
                    oldAdmin: old_admin,
                    newAdmin: new_admin,
                };
            }
            case PoolEventType.CancelSetReserve: {
                if (topic_scval.length !== 2) {
                    return undefined;
                }
                const admin = Address.fromScVal(topic_scval[1]).toString();
                const asset_id = Address.fromScVal(value_scval).toString();
                return {
                    ...baseEvent,
                    eventType: PoolEventType.CancelSetReserve,
                    admin: admin,
                    assetId: asset_id,
                };
            }
            case PoolEventType.SetReserve: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 1 || valueAsVec?.length !== 2) {
                    return undefined;
                }
                const asset_id = Address.fromScVal(valueAsVec[0]).toString();
                const asset_index = Number(scValToNative(valueAsVec[1]));
                if (isNaN(asset_index)) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    eventType: PoolEventType.SetReserve,
                    assetId: asset_id,
                    assetIndex: asset_index,
                };
            }
            case PoolEventType.SetStatus: {
                if (topic_scval.length !== 1 && topic_scval.length !== 2) {
                    return undefined;
                }
                const admin = topic_scval.length === 2 ? Address.fromScVal(topic_scval[1]).toString() : undefined;
                const status = Number(scValToNative(value_scval));
                if (isNaN(status)) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    eventType: PoolEventType.SetStatus,
                    admin: admin,
                    status: status,
                };
            }
            case PoolEventType.ReserveEmissionUpdate: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 1 || valueAsVec?.length !== 3) {
                    return undefined;
                }
                const reserveTokenId = scValToNative(valueAsVec[0]);
                const eps = Number(scValToNative(valueAsVec[1]));
                const expiration = Number(scValToNative(valueAsVec[2]));
                if (isNaN(eps) || isNaN(expiration)) {
                    return undefined;
                }
                return {
                    ...baseEvent,
                    eventType: PoolEventType.ReserveEmissionUpdate,
                    reserveTokenId: reserveTokenId,
                    eps: eps,
                    expiration: expiration,
                };
            }
            case PoolEventType.Claim: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 2 || valueAsVec?.length !== 2) {
                    return undefined;
                }
                const from = Address.fromScVal(topic_scval[1]).toString();
                const reserveTokenIds = valueAsVec[0].vec().map((val) => {
                    const as_num = Number(scValToNative(val));
                    if (isNaN(as_num)) {
                        throw Error('Invalid event');
                    }
                    return as_num;
                });
                const amount = BigInt(scValToNative(valueAsVec[1]));
                return {
                    ...baseEvent,
                    eventType: PoolEventType.Claim,
                    from: from,
                    reserveTokenIds: reserveTokenIds,
                    amount: amount,
                };
            }
            case PoolEventType.BadDebt: {
                if (topic_scval.length == 2) {
                    const valueAsVec = value_scval.vec();
                    if (valueAsVec?.length !== 2) {
                        return undefined;
                    }
                    const backstop = Address.fromScVal(topic_scval[1]).toString();
                    const assetId = Address.fromScVal(valueAsVec[0]).toString();
                    const dTokens = BigInt(scValToNative(valueAsVec[1]));
                    return {
                        ...baseEvent,
                        eventType: PoolEventType.BadDebt,
                        user: backstop,
                        assetId: assetId,
                        dTokens: dTokens,
                    };
                }
                else if (topic_scval.length == 3) {
                    const user = Address.fromScVal(topic_scval[1]).toString();
                    const assetId = Address.fromScVal(topic_scval[2]).toString();
                    const dTokens = BigInt(scValToNative(value_scval));
                    return {
                        ...baseEvent,
                        eventType: PoolEventType.BadDebt,
                        user: user,
                        assetId: assetId,
                        dTokens: dTokens,
                    };
                }
                else {
                    return undefined;
                }
            }
            case PoolEventType.Supply:
            case PoolEventType.Withdraw:
            case PoolEventType.SupplyCollateral:
            case PoolEventType.WithdrawCollateral:
            case PoolEventType.Borrow:
            case PoolEventType.Repay: {
                const valueAsVec = value_scval.vec();
                if (topic_scval.length !== 3 || valueAsVec?.length !== 2) {
                    return undefined;
                }
                const assetId = Address.fromScVal(topic_scval[1]).toString();
                const from = Address.fromScVal(topic_scval[2]).toString();
                const amount = BigInt(scValToNative(valueAsVec[0]));
                const reserveTokens = BigInt(scValToNative(valueAsVec[1]));
                switch (eventString) {
                    case PoolEventType.Supply:
                        return {
                            ...baseEvent,
                            eventType: PoolEventType.Supply,
                            assetId: assetId,
                            from: from,
                            amount: amount,
                            bTokensMinted: reserveTokens,
                        };
                    case PoolEventType.Withdraw:
                        return {
                            ...baseEvent,
                            eventType: PoolEventType.Withdraw,
                            assetId: assetId,
                            from: from,
                            amount: amount,
                            bTokensBurned: reserveTokens,
                        };
                    case PoolEventType.SupplyCollateral:
                        return {
                            ...baseEvent,
                            eventType: PoolEventType.SupplyCollateral,
                            assetId: assetId,
                            from: from,
                            amount: amount,
                            bTokensMinted: reserveTokens,
                        };
                    case PoolEventType.WithdrawCollateral:
                        return {
                            ...baseEvent,
                            eventType: PoolEventType.WithdrawCollateral,
                            assetId: assetId,
                            from: from,
                            amount: amount,
                            bTokensBurned: reserveTokens,
                        };
                    case PoolEventType.Borrow:
                        return {
                            ...baseEvent,
                            eventType: PoolEventType.Borrow,
                            assetId: assetId,
                            from: from,
                            amount: amount,
                            dTokensMinted: reserveTokens,
                        };
                    case PoolEventType.Repay:
                        return {
                            ...baseEvent,
                            eventType: PoolEventType.Repay,
                            assetId: assetId,
                            from: from,
                            amount: amount,
                            dTokensBurned: reserveTokens,
                        };
                    default:
                        return undefined;
                }
            }
            case PoolEventType.DeleteLiquidationAuction: {
                if (topic_scval.length !== 2) {
                    return undefined;
                }
                const user = Address.fromScVal(topic_scval[1]).toString();
                return {
                    ...baseEvent,
                    eventType: PoolEventType.DeleteLiquidationAuction,
                    user: user,
                };
            }
            default:
                return undefined;
        }
    }
    catch (e) {
        // conversion functions throw on a malformed (or non-pool) events
        // return undefined in this case
        return undefined;
    }
}
