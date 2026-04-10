import { AuctionData, PoolV1Event, PoolV2Event } from './index.js';
export declare enum AuctionType {
    Liquidation = 0,
    BadDebt = 1,
    Interest = 2
}
export interface Auctions {
    /**
     * Represents the filled auctions
     */
    filled: ScaledAuction[];
    /**
     * Represents the ongoing auctions
     * @DEV The auctions must be scaled to the current block to accurately represent the ongoing auctions
     */
    ongoing: Auction[];
}
export interface ScaledAuction {
    type: AuctionType;
    user: string;
    data: AuctionData;
    scaleBlock: number;
    filled: boolean;
    fillHash: string | undefined;
}
/**
 * Creates an Auctions object from events representing the ongoing and filled auctions
 * @param events - The events to create the scaled auctions from
 * @param backstopId - The address of the backstop
 * @returns An array of scaled auctions sorted by filled status and block
 */
export declare function getAuctionsfromV1Events(events: PoolV1Event[], backstopId: string): Auctions;
export declare function getAuctionsfromV2Events(events: PoolV2Event[]): Auctions;
export declare class Auction {
    user: string;
    type: AuctionType;
    data: AuctionData;
    constructor(user: string, type: AuctionType, data: AuctionData);
    /**
     * Scale the auction to a given block and percentage filled
     * @dev Rescaling a scaled auction will result in incorrect values
     * @param scaleBlock - The block to scale the auction to
     * @param scalePercent - The percentage of the auction to scale to (default 100)
     * @returns Returns a tuple of the scaled auction and the remaining auction in that order
     */
    scale(scaleBlock: number, scalePercent?: number): [ScaledAuction, Auction | undefined];
}
