import { rpc } from '@stellar/stellar-sdk';
import { BaseBlendEvent, BlendContractType } from '../base_event.js';
export declare enum BackstopEventType {
    Deposit = "deposit",
    QueueWithdrawal = "queue_withdrawal",
    DequeueWithdrawal = "dequeue_withdrawal",
    Withdraw = "withdraw",
    GulpEmissions = "gulp_emissions",
    RewardZone = "rw_zone",
    Claim = "claim",
    Draw = "draw",
    Donate = "donate",
    Distribute = "distribute",
    RewardZoneAdd = "rw_zone_add",
    RewardZoneRemove = "rw_zone_remove"
}
export interface BaseBackstopEvent extends BaseBlendEvent {
    contractType: BlendContractType.Backstop;
}
export interface BackstopDepositEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.Deposit;
    poolAddress: string;
    from: string;
    amount: bigint;
    sharesMinted: bigint;
}
export interface BackstopQ4WEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.QueueWithdrawal;
    poolAddress: string;
    from: string;
    shares: bigint;
    expiration: number;
}
export interface BackstopDequeueEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.DequeueWithdrawal;
    poolAddress: string;
    from: string;
    shares: bigint;
}
export interface BackstopWithdrawEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.Withdraw;
    poolAddress: string;
    from: string;
    shares: bigint;
    tokensWithdrawn: bigint;
}
export interface BackstopGulpEmissionsV1Event extends BaseBackstopEvent {
    eventType: BackstopEventType.GulpEmissions;
    newBLND: bigint;
}
export interface BackstopRewardZoneEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.RewardZone;
    toAdd: string;
    toRemove: string;
}
export interface BackstopClaimEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.Claim;
    from: string;
    amount: bigint;
}
export interface BackstopDrawEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.Draw;
    poolAddress: string;
    to: string;
    amount: bigint;
}
export interface BackstopDonateEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.Donate;
    poolAddress: string;
    from: string;
    amount: bigint;
}
export interface BackstopGulpEmissionsV2Event extends BaseBackstopEvent {
    eventType: BackstopEventType.GulpEmissions;
    newBackstopEmissions: bigint;
    newPoolEmissions: bigint;
}
export interface BackstopDistributeEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.Distribute;
    newEmissions: bigint;
}
export interface BackstopRewardZoneAddEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.RewardZoneAdd;
    toAdd: string;
    toRemove: string | undefined;
}
export interface BackstopRewardZoneRemoveEvent extends BaseBackstopEvent {
    eventType: BackstopEventType.RewardZoneRemove;
    toRemove: string;
}
export type BackstopEvent = BackstopDepositEvent | BackstopQ4WEvent | BackstopDequeueEvent | BackstopWithdrawEvent | BackstopClaimEvent | BackstopDrawEvent | BackstopDonateEvent;
export type BackstopV1Event = BackstopEvent | BackstopGulpEmissionsV1Event | BackstopRewardZoneEvent;
export type BackstopV2Event = BackstopEvent | BackstopGulpEmissionsV2Event | BackstopDistributeEvent | BackstopRewardZoneAddEvent | BackstopRewardZoneRemoveEvent;
/**
 * Create a BackstopEventV1 from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The BackstopV1Event or undefined if the EventResponse is not a BackstopEvent
 */
export declare function backstopEventV1FromEventResponse(eventResponse: rpc.Api.RawEventResponse): BackstopV1Event | undefined;
/**
 * Create a BackstopEventV2 from a RawEventResponse.
 * @param eventResponse - The RawEventResponse from the RPC to convert
 * @returns The BackstopV2Event or undefined if the EventResponse is not a BackstopEvent
 */
export declare function backstopEventV2FromEventResponse(eventResponse: rpc.Api.RawEventResponse): BackstopV2Event | undefined;
