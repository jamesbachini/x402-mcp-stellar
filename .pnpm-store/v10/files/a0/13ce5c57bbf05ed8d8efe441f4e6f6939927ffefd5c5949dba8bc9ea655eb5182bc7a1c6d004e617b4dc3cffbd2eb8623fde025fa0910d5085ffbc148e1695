import { rpc } from '@stellar/stellar-sdk';
import { BaseBlendEvent, BlendContractType } from '../base_event.js';
import { AuctionData } from './index.js';
import { ReserveConfig, ReserveConfigV2 } from './reserve_types.js';
export declare enum PoolEventType {
    SetAdmin = "set_admin",
    UpdatePool = "update_pool",
    QueueSetReserve = "queue_set_reserve",
    CancelSetReserve = "cancel_set_reserve",
    SetReserve = "set_reserve",
    SetStatus = "set_status",
    UpdateEmissions = "update_emissions",
    ReserveEmissionUpdate = "reserve_emission_update",
    Claim = "claim",
    NewLiquidationAuction = "new_liquidation_auction",
    NewAuction = "new_auction",
    BadDebt = "bad_debt",
    Supply = "supply",
    Withdraw = "withdraw",
    SupplyCollateral = "supply_collateral",
    WithdrawCollateral = "withdraw_collateral",
    Borrow = "borrow",
    Repay = "repay",
    FillAuction = "fill_auction",
    DeleteLiquidationAuction = "delete_liquidation_auction",
    GulpEmissions = "gulp_emissions",
    Gulp = "gulp",
    DefaultedDebt = "defaulted_debt",
    DeleteAuction = "delete_auction",
    FlashLoan = "flash_loan"
}
export interface BasePoolEvent extends BaseBlendEvent {
    contractType: BlendContractType.Pool;
}
export interface PoolSetAdminEvent extends BasePoolEvent {
    eventType: PoolEventType.SetAdmin;
    oldAdmin: string;
    newAdmin: string;
}
export interface PoolUpdatePoolV1Event extends BasePoolEvent {
    eventType: PoolEventType.UpdatePool;
    admin: string;
    backstopTakeRate: number;
    maxPositions: number;
}
export interface PoolUpdatePoolV2Event extends BasePoolEvent {
    eventType: PoolEventType.UpdatePool;
    admin: string;
    backstopTakeRate: number;
    maxPositions: number;
    minCollateral: bigint;
}
export interface PoolQueueSetReserveV1Event extends BasePoolEvent {
    eventType: PoolEventType.QueueSetReserve;
    admin: string;
    assetId: string;
    reserveConfig: ReserveConfig;
}
export interface PoolQueueSetReserveV2Event extends BasePoolEvent {
    eventType: PoolEventType.QueueSetReserve;
    admin: string;
    assetId: string;
    reserveConfig: ReserveConfigV2;
}
export interface PoolCancelSetReserveEvent extends BasePoolEvent {
    eventType: PoolEventType.CancelSetReserve;
    admin: string;
    assetId: string;
}
export interface PoolSetReserveEvent extends BasePoolEvent {
    eventType: PoolEventType.SetReserve;
    assetId: string;
    assetIndex: number;
}
export interface PoolSetStatusEvent extends BasePoolEvent {
    eventType: PoolEventType.SetStatus;
    admin: string | undefined;
    status: number;
}
export interface PoolUpdateEmissionsEvent extends BasePoolEvent {
    eventType: PoolEventType.UpdateEmissions;
    newBLND: bigint;
}
export interface PoolReserveEmissionUpdateEvent extends BasePoolEvent {
    eventType: PoolEventType.ReserveEmissionUpdate;
    reserveTokenId: number;
    eps: number;
    expiration: number;
}
export interface PoolClaimEvent extends BasePoolEvent {
    eventType: PoolEventType.Claim;
    from: string;
    reserveTokenIds: number[];
    amount: bigint;
}
export interface PoolNewLiquidationAuctionEvent extends BasePoolEvent {
    eventType: PoolEventType.NewLiquidationAuction;
    user: string;
    auctionData: AuctionData;
}
export interface PoolNewAuctionV1Event extends BasePoolEvent {
    eventType: PoolEventType.NewAuction;
    auctionType: number;
    auctionData: AuctionData;
}
export interface PoolBadDebtEvent extends BasePoolEvent {
    eventType: PoolEventType.BadDebt;
    user: string;
    assetId: string;
    dTokens: bigint;
}
export interface PoolSupplyEvent extends BasePoolEvent {
    eventType: PoolEventType.Supply;
    assetId: string;
    from: string;
    amount: bigint;
    bTokensMinted: bigint;
}
export interface PoolWithdrawEvent extends BasePoolEvent {
    eventType: PoolEventType.Withdraw;
    assetId: string;
    from: string;
    amount: bigint;
    bTokensBurned: bigint;
}
export interface PoolSupplyCollateralEvent extends BasePoolEvent {
    eventType: PoolEventType.SupplyCollateral;
    assetId: string;
    from: string;
    amount: bigint;
    bTokensMinted: bigint;
}
export interface PoolWithdrawCollateralEvent extends BasePoolEvent {
    eventType: PoolEventType.WithdrawCollateral;
    assetId: string;
    from: string;
    amount: bigint;
    bTokensBurned: bigint;
}
export interface PoolBorrowEvent extends BasePoolEvent {
    eventType: PoolEventType.Borrow;
    assetId: string;
    from: string;
    amount: bigint;
    dTokensMinted: bigint;
}
export interface PoolRepayEvent extends BasePoolEvent {
    eventType: PoolEventType.Repay;
    assetId: string;
    from: string;
    amount: bigint;
    dTokensBurned: bigint;
}
export interface PoolFillAuctionV1Event extends BasePoolEvent {
    eventType: PoolEventType.FillAuction;
    user: string;
    auctionType: number;
    from: string;
    fillAmount: bigint;
}
export interface PoolDeleteLiquidationAuctionEvent extends BasePoolEvent {
    eventType: PoolEventType.DeleteLiquidationAuction;
    user: string;
}
export interface PoolGulpEmissionsEvent extends BasePoolEvent {
    eventType: PoolEventType.GulpEmissions;
    newBLND: bigint;
}
export interface PoolDefaultedDebtEvent extends BasePoolEvent {
    eventType: PoolEventType.DefaultedDebt;
    assetId: string;
    dTokens: bigint;
}
export interface PoolGulpEvent extends BasePoolEvent {
    eventType: PoolEventType.Gulp;
    assetId: string;
    tokenDelta: bigint;
    newBRate: bigint;
}
export interface PoolNewAuctionV2Event extends BasePoolEvent {
    eventType: PoolEventType.NewAuction;
    auctionType: number;
    user: string;
    percent: number;
    auctionData: AuctionData;
}
export interface PoolFillAuctionV2Event extends BasePoolEvent {
    eventType: PoolEventType.FillAuction;
    user: string;
    auctionType: number;
    filler: string;
    fillAmount: bigint;
    filledAuctionData: AuctionData;
}
export interface PoolDeleteAuctionEvent extends BasePoolEvent {
    eventType: PoolEventType.DeleteAuction;
    user: string;
    auctionType: number;
}
export interface PoolFlashLoanEvent extends BasePoolEvent {
    eventType: PoolEventType.FlashLoan;
    asset: string;
    from: string;
    contract: string;
    tokensOut: bigint;
    dTokensMinted: bigint;
}
export type BasePoolEvents = PoolSetAdminEvent | PoolCancelSetReserveEvent | PoolSetReserveEvent | PoolSetStatusEvent | PoolReserveEmissionUpdateEvent | PoolClaimEvent | PoolBadDebtEvent | PoolSupplyEvent | PoolWithdrawEvent | PoolSupplyCollateralEvent | PoolWithdrawCollateralEvent | PoolBorrowEvent | PoolRepayEvent | PoolDeleteLiquidationAuctionEvent;
export type PoolV1Event = BasePoolEvents | PoolUpdatePoolV1Event | PoolQueueSetReserveV1Event | PoolNewAuctionV1Event | PoolFillAuctionV1Event | PoolUpdateEmissionsEvent | PoolNewLiquidationAuctionEvent;
export type PoolV2Event = BasePoolEvents | PoolUpdatePoolV2Event | PoolQueueSetReserveV2Event | PoolNewAuctionV2Event | PoolFillAuctionV2Event | PoolDeleteAuctionEvent | PoolGulpEmissionsEvent | PoolGulpEvent | PoolDefaultedDebtEvent | PoolFlashLoanEvent;
/**
 * Create a PoolV1Event from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolV1Event or undefined if the EventResponse is not a PoolV1Event
 */
export declare function poolEventV1FromEventResponse(eventResponse: rpc.Api.RawEventResponse): PoolV1Event | undefined;
/**
 * Create a PoolV2Event from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The PoolV2Event or undefined if the EventResponse is not a PoolV2Event
 */
export declare function poolEventV2FromEventResponse(eventResponse: rpc.Api.RawEventResponse): PoolV2Event | undefined;
