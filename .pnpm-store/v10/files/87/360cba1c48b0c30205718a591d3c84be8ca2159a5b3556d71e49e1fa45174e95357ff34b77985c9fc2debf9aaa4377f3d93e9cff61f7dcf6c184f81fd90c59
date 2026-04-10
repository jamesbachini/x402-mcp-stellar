/// <reference types="node" resolution-mode="require"/>
import { Address, Contract, contract } from '@stellar/stellar-sdk';
import { i128, u32, u64 } from '../index.js';
import { AuctionData, PoolConfig, ContractReserve, Positions, Request, ReserveConfig, ReserveEmissionMetadata, ReserveConfigV2, FlashLoan } from './index.js';
import { EmissionDataV2, UserEmissions } from '../emissions.js';
import { AuctionType } from './auction.js';
export interface SubmitArgs {
    from: Address | string;
    spender: Address | string;
    to: Address | string;
    requests: Array<Request>;
}
export interface PoolConstructorArgs {
    admin: Address | string;
    name: string;
    oracle: Address | string;
    bstop_rate: u32;
    max_positions: u32;
    backstop_id: Address | string;
    blnd_id: Address | string;
}
export interface PoolConstructorArgsV2 extends PoolConstructorArgs {
    min_collateral: i128;
}
export interface UpdatePoolV1Args {
    backstop_take_rate: u32;
    max_positions: u32;
}
export interface UpdatePoolV2Args {
    backstop_take_rate: u32;
    max_positions: u32;
    min_collateral: i128;
}
export interface SetReserveV1Args {
    asset: Address | string;
    metadata: ReserveConfig;
}
export interface SetReserveV2Args {
    asset: Address | string;
    metadata: ReserveConfigV2;
}
export interface PoolClaimArgs {
    from: Address | string;
    reserve_token_ids: Array<u32>;
    to: Address | string;
}
export interface NewLiqudiationAuctionArgs {
    user: Address | string;
    percent_liquidated: u64;
}
export interface NewAuctionArgs {
    auction_type: AuctionType;
    user: string;
    bid: Array<string>;
    lot: Array<string>;
    percent: u32;
}
export interface FlashLoanArgs {
    from: Address | string;
    flash_loan: FlashLoan;
    requests: Array<Request>;
}
export declare abstract class PoolContract extends Contract {
    static spec: contract.Spec;
    static readonly parsers: {
        setAdmin: () => void;
        updatePool: () => void;
        queueSetReserve: () => void;
        cancelSetReserve: () => void;
        setReserve: (result: string) => u32;
        getPositions: (result: string) => Positions;
        submit: (result: string) => Positions;
        badDebt: () => void;
        updateStatus: (result: string) => u32;
        setStatus: () => void;
        gulpEmissions: (result: string) => i128;
        setEmissionsConfig: () => void;
        claim: (result: string) => i128;
        getAuction: (result: string) => AuctionData;
    };
    /**
     * Sets a new address as the admin of this pool. Only callable by the current admin.
     *
     * @param new_admin - The new admin address.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    setAdmin(new_admin: Address | string): string;
    /**
     * Cancels the queued set of a reserve in the pool. Only callable by the admin.
     *
     * @param asset - The underlying asset address to cancel initialization for.
     *
     * @throws Will throw an error if the caller is not the admin or the reserve is not queued for initialization.
     *
     * @returns A base64-encoded string representing the operation.
     */
    cancelSetReserve(asset: Address | string): string;
    /**
     * Executes the queued set of a reserve in the pool.
     *
     * @param asset - The underlying asset address to setup.
     *
     * @throws Will throw an error if the reserve is not queued for initialization, is already setup, or has invalid metadata.
     *
     * @returns A base64-encoded string representing the operation.
     */
    setReserve(asset: Address | string): string;
    /**
     * Submits a set of requests to the pool where 'from' takes on the position, 'sender' sends any required tokens to the pool
     * and 'to' receives any tokens sent from the pool.
     *
     * @param contractArgs - The arguments required for the submit operation.
     * @param contractArgs.from - The address of the user whose positions are being modified.
     * @param contractArgs.spender - The address of the user who is sending tokens to the pool.
     * @param contractArgs.to - The address of the user who is receiving tokens from the pool.
     * @param contractArgs.requests - A list of requests to be processed.
     *
     * @throws Will throw an error if the request cannot be completed due to insufficient funds or invalid health factor.
     *
     * @returns A base64-encoded string representing the operation.
     */
    submit(contractArgs: SubmitArgs): string;
    /**
     * Manages bad debt. Debt is considered "bad" if there is no longer any collateral posted.
     *
     * @param user - The user who currently possesses bad debt.
     *
     * @throws Will throw an error if the user has collateral posted.
     *
     * @returns A base64-encoded string representing the operation.
     */
    badDebt(user: Address | string): string;
    /**
     * Updates the pool status based on the backstop state.
     *
     * @throws Will throw an error if the pool is currently on status 4, "admin-freeze",
     * where only the admin can perform a status update via `setStatus`.
     *
     * @returns A base64-encoded string representing the operation.
     */
    updateStatus(): string;
    /**
     * Sets the pool status. Only callable by the admin.
     *
     * @param pool_status - The pool status to be set: 0 (active), 2 (on-ice), or 4 (frozen).
     *
     * @throws Will throw an error if the caller is not the admin or if the specified conditions are not met for the status to be set.
     *
     * @returns A base64-encoded string representing the operation.
     */
    setStatus(pool_status: u32): string;
    /**
     * Consumes emissions from the backstop and distributes to the reserves based on the reserve emission configuration.
     *
     * @returns A base64-encoded string representing the operation.
     */
    gulpEmissions(): string;
    /**
     * Sets the emission configuration for the pool. Only callable by the admin.
     *
     * @param res_emission_metadata - A vector of ReserveEmissionMetadata to update metadata to.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    setEmissionsConfig(res_emission_metadata: Array<ReserveEmissionMetadata>): string;
    /**
     * Claims outstanding emissions for the caller for the given reserve tokens.
     *
     * @param contractArgs - The arguments required for claiming emissions.
     * @param contractArgs.from - The address claiming.
     * @param contractArgs.reserve_token_ids - List of reserve token IDs.
     * @param contractArgs.to - The address to send the claimed tokens to.
     *
     * @returns A base64-encoded string representing the operation.
     */
    claim(contractArgs: PoolClaimArgs): string;
    /**
     * Fetches an auction from the ledger. Returns a quote based on the current block.
     *
     * @param auction_id - The ID of the auction.
     *
     * @throws Will throw an error if the auction does not exist.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getAuction(auction_id: number): string;
    /**
     * Fetches the positions for an address.
     *
     * @param user - The address to fetch positions for.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getPositions(user: Address | string): string;
}
export declare class PoolContractV1 extends PoolContract {
    constructor(address: string);
    static readonly spec: contract.Spec;
    static readonly parsers: {
        initialize: () => void;
        newLiquidationAuction: (result: string) => AuctionData;
        newBadDebtAuction: (result: string) => AuctionData;
        newInterestAuction: (result: string) => AuctionData;
        setAdmin: () => void;
        updatePool: () => void;
        queueSetReserve: () => void;
        cancelSetReserve: () => void;
        setReserve: (result: string) => number;
        getPositions: (result: string) => Positions;
        submit: (result: string) => Positions;
        badDebt: () => void;
        updateStatus: (result: string) => number;
        setStatus: () => void;
        gulpEmissions: (result: string) => bigint;
        setEmissionsConfig: () => void;
        claim: (result: string) => bigint;
        getAuction: (result: string) => AuctionData;
    };
    /**
     * Initializes the pool.
     *
     * @param contractArgs - The arguments required for pool initialization.
     * @param contractArgs.admin - The address for the admin.
     * @param contractArgs.name - The name of the pool.
     * @param contractArgs.oracle - The contract address of the oracle.
     * @param contractArgs.bstop_rate - The take rate for the backstop (7 decimals).
     * @param contractArgs.max_positions - The maximum number of positions a user is permitted to have.
     * @param contractArgs.backstop_id - The contract address of the pool's backstop module.
     * @param contractArgs.blnd_id - The contract ID of the BLND token.
     *
     * @returns A base64-encoded string representing the operation.
     */
    initialize(contractArgs: PoolConstructorArgs): string;
    /**
     * Updates the pool configuration. Only callable by the admin.
     *
     * @param contractArgs - The arguments required to update the pool.
     * @param contractArgs.backstop_take_rate - The new take rate for the backstop (7 decimals).
     * @param contractArgs.max_positions - The new maximum number of allowed positions for a single user's account.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    updatePool(contractArgs: UpdatePoolV1Args): string;
    /**
     * Queues setting data for a reserve in the pool. Only callable by the admin.
     *
     * @param contractArgs - The arguments required for queuing a reserve.
     * @param contractArgs.asset - The underlying asset to add as a reserve.
     * @param contractArgs.metadata - The ReserveConfig for the reserve.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    queueSetReserve(contractArgs: SetReserveV1Args): string;
    /**
     * Creates a new user liquidation auction.
     *
     * @param contractArgs - The arguments required to create a liquidation auction.
     * @param contractArgs.user - The user getting liquidated through the auction.
     * @param contractArgs.percent_liquidated - The percent of the user's position being liquidated as a percentage (15 => 15%).
     *
     * @throws Will throw an error if the user liquidation auction was unable to be created.
     *
     * @returns A base64-encoded string representing the operation.
     */
    newLiquidationAuction(contractArgs: NewLiqudiationAuctionArgs): string;
    /**
     * Creates a new bad debt auction.
     *
     * @throws Will throw an error if the auction was unable to be created.
     *
     * @returns A base64-encoded string representing the operation.
     */
    newBadDebtAuction(): string;
    /**
     * Creates a new interest auction.
     *
     * @param assets - The assets interest is being auctioned off for.
     *
     * @throws Will throw an error if the auction was unable to be created.
     *
     * @returns A base64-encoded string representing the operation.
     */
    newInterestAuction(assets: Array<Address | string>): string;
}
export declare class PoolContractV2 extends PoolContract {
    constructor(address: string);
    static readonly spec: contract.Spec;
    static readonly parsers: {
        deploy: (result: string) => string;
        submitWithAllowance: (result: string) => Positions;
        flashLoan: (result: string) => Positions;
        gulp: (result: string) => i128;
        newAuction: (result: string) => AuctionData;
        proposeAdmin: () => void;
        acceptAdmin: () => void;
        getConfig: (result: string) => PoolConfig;
        getAdmin: (result: string) => string;
        getReserve: (result: string) => ContractReserve;
        getReserveEmissions: (result: string) => EmissionDataV2 | undefined;
        getUserEmissions: (result: string) => UserEmissions | undefined;
        getReserveList: (result: string) => string[];
        delAuction: () => void;
        setAdmin: () => void;
        updatePool: () => void;
        queueSetReserve: () => void;
        cancelSetReserve: () => void;
        setReserve: (result: string) => number;
        getPositions: (result: string) => Positions;
        submit: (result: string) => Positions;
        badDebt: () => void;
        updateStatus: (result: string) => number;
        setStatus: () => void;
        gulpEmissions: (result: string) => bigint;
        setEmissionsConfig: () => void;
        claim: (result: string) => bigint;
        getAuction: (result: string) => AuctionData;
    };
    /**
     * Deploys a new instance of the Pool V2 contract.
     *
     * @param deployer - The address of the deployer.
     * @param wasmHash - The hash of the WASM contract code.
     * @param args - The constructor arguments for the contract.
     * @param args.admin - The address for the admin.
     * @param args.name - The name of the pool.
     * @param args.oracle - The contract address of the oracle.
     * @param args.bstop_rate - The take rate for the backstop (7 decimals).
     * @param args.max_positions - The maximum number of positions a user is permitted to have.
     * @param args.min_collateral - The minimum collateral required to open a borrow position, specified in the oracle's base asset decimals.
     * @param args.backstop_id - The contract address of the pool's backstop module.
     * @param args.blnd_id - The contract ID of the BLND token.
     * @param salt - Optional salt for the contract deployment.
     * @param format - Optional format for the WASM hash (hex or base64).
     *
     * @returns A base64-encoded string representing the operation.
     */
    static deploy(deployer: string, wasmHash: Buffer | string, args: PoolConstructorArgsV2, salt?: Buffer, format?: 'hex' | 'base64'): string;
    /**
     * Updates the pool configuration. Only callable by the admin.
     *
     * @param contractArgs - The arguments required to update the pool.
     * @param contractArgs.backstop_take_rate - The new take rate for the backstop (7 decimals).
     * @param contractArgs.max_positions - The new maximum number of allowed positions for a single user's account.
     * @param contractArgs.min_collateral - The new minimum collateral required to open a borrow position,
     *                                      specified in the oracle's base asset decimals.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    updatePool(contractArgs: UpdatePoolV2Args): string;
    /**
     * Queues setting data for a reserve in the pool. Only callable by the admin.
     *
     * @param contractArgs - The arguments required for queuing a reserve.
     * @param contractArgs.asset - The underlying asset to add as a reserve.
     * @param contractArgs.metadata - The ReserveConfig for the reserve.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    queueSetReserve(contractArgs: SetReserveV2Args): string;
    /**
     * Submits a set of requests to the pool using transfer_from for allowances.
     *
     * @param contractArgs - The arguments required for the submit operation.
     * @param contractArgs.from - The address of the user whose positions are being modified.
     * @param contractArgs.spender - The address of the user who is sending tokens to the pool.
     * @param contractArgs.to - The address of the user who is receiving tokens from the pool.
     * @param contractArgs.requests - A list of requests to be processed.
     *
     * @throws Will throw an error if the request cannot be completed due to insufficient funds, insufficient allowance, or invalid health factor.
     *
     * @returns A base64-encoded string representing the operation.
     */
    submitWithAllowance(contractArgs: SubmitArgs): string;
    /**
     * Executes a flash loan and submits a set of requests to the pool.
     *
     * @param contractArgs - The arguments required for the flash loan.
     * @param contractArgs.from - The address of the user executing the flash loan and whose positions will be modified.
     * @param contractArgs.contract - The contract that will receive the flash loan callback.
     * @param contractArgs.asset - The asset to be borrowed in the flash loan.
     * @param contractArgs.amount - The amount to be borrowed in the flash loan.
     *
     * @returns A base64-encoded string representing the operation.
     */
    flashLoan(contractArgs: FlashLoanArgs): string;
    /**
     * Gulps unaccounted for tokens to the backstop credit so they aren't lost.
     * This is most relevant for rebasing tokens where the token balance can increase without any corresponding transfer.
     *
     * @param asset - The address of the asset to gulp.
     *
     * @returns A base64-encoded string representing the operation.
     */
    gulp(asset: string): string;
    /**
     * Creates a new auction. Auctions are used to process liquidations, bad debt, and interest.
     *
     * @param contractArgs - The arguments required to create an auction.
     * @param contractArgs.auction_type - The type of auction: 0 (liquidation), 1 (bad debt), or 2 (interest).
     * @param contractArgs.user - The address involved in the auction.
     * @param contractArgs.bid - The set of assets to include in the auction bid.
     * @param contractArgs.lot - The set of assets to include in the auction lot.
     * @param contractArgs.percent - The percent of the assets to be auctioned off as a percentage (15 => 15%).
     *
     * @returns A base64-encoded string representing the operation.
     */
    newAuction(contractArgs: NewAuctionArgs): string;
    /**
     * Deletes a stale auction. A stale auction is one that has been running for 500 blocks without being filled.
     *
     * @param auction_type - The type of auction: 0 (liquidation), 1 (bad debt), or 2 (interest).
     * @param user - The address involved in the auction.
     *
     * @throws Will throw an error if the auction does not exist or if the auction is not stale.
     *
     * @returns A base64-encoded string representing the operation.
     */
    delAuction(auction_type: number, user: Address | string): string;
    /**
     * Proposes a new admin for the pool. Only callable by the current admin.
     *
     * @param new_admin - The new admin address.
     *
     * @throws Will throw an error if the caller is not the admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    proposeAdmin(new_admin: Address | string): string;
    /**
     * Accepts the admin role. Only callable by the proposed admin.
     *
     * @throws Will throw an error if the caller is not the proposed admin.
     *
     * @returns A base64-encoded string representing the operation.
     */
    acceptAdmin(): string;
    /**
     * Fetches the pool configuration.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getConfig(): string;
    /**
     * Fetches the admin address of the pool.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getAdmin(): string;
    /**
     * Fetches information about a reserve, updated to the current ledger.
     *
     * @param asset - The address of the reserve asset.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getReserve(asset: Address | string): string;
    /**
     * Fetches the emissions data for a reserve token.
     *
     * @param reserve_token_id - The reserve token ID.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getReserveEmissions(reserve_token_id: number): string;
    /**
     * Fetches the emissions data for a user's position in a reserve.
     *
     * @param user - The address of the user.
     * @param reserve_token_id - The reserve token ID.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getUserEmissions(user: Address | string, reserve_token_id: number): string;
    /**
     * Fetches the list of all reserve addresses in the pool.
     *
     * @returns A base64-encoded string representing the operation.
     */
    getReserveList(): string;
}
