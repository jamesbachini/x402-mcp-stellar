"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = exports.getAuctionsfromV2Events = exports.getAuctionsfromV1Events = exports.AuctionType = void 0;
const index_js_1 = require("../index.js");
const index_js_2 = require("./index.js");
var AuctionType;
(function (AuctionType) {
    AuctionType[AuctionType["Liquidation"] = 0] = "Liquidation";
    AuctionType[AuctionType["BadDebt"] = 1] = "BadDebt";
    AuctionType[AuctionType["Interest"] = 2] = "Interest";
})(AuctionType || (exports.AuctionType = AuctionType = {}));
/**
 * Creates an Auctions object from events representing the ongoing and filled auctions
 * @param events - The events to create the scaled auctions from
 * @param backstopId - The address of the backstop
 * @returns An array of scaled auctions sorted by filled status and block
 */
function getAuctionsfromV1Events(events, backstopId) {
    const auctions = { filled: [], ongoing: [] };
    for (const event of events ?? []) {
        switch (event.eventType) {
            case index_js_2.PoolEventType.NewLiquidationAuction:
                auctions.ongoing.push(new Auction(event.user, AuctionType.Liquidation, event.auctionData));
                break;
            case index_js_2.PoolEventType.NewAuction:
                auctions.ongoing.push(new Auction(backstopId, event.auctionType, event.auctionData));
                break;
            case index_js_2.PoolEventType.FillAuction: {
                const index = auctions.ongoing.findIndex((auction) => auction.user === event.user && auction.type === event.auctionType);
                if (index !== -1) {
                    const auction = auctions.ongoing[index];
                    const [filledAuction, remainingAuction] = auction.scale(event.ledger, Number(event.fillAmount));
                    filledAuction.filled = true;
                    filledAuction.fillHash = event.txHash;
                    auctions.filled.push(filledAuction);
                    if (remainingAuction !== undefined) {
                        auctions.ongoing[index] = remainingAuction;
                    }
                    else {
                        auctions.ongoing.splice(index, 1);
                    }
                }
                break;
            }
            case index_js_2.PoolEventType.DeleteLiquidationAuction: {
                const deleteIndex = auctions.ongoing.findIndex((auction) => auction.user === event.user);
                if (deleteIndex !== -1) {
                    auctions.ongoing.splice(deleteIndex, 1);
                }
                break;
            }
        }
    }
    return auctions;
}
exports.getAuctionsfromV1Events = getAuctionsfromV1Events;
function getAuctionsfromV2Events(events) {
    const auctions = { filled: [], ongoing: [] };
    for (const event of events ?? []) {
        switch (event.eventType) {
            case index_js_2.PoolEventType.NewAuction:
                auctions.ongoing.push(new Auction(event.user, event.auctionType, event.auctionData));
                break;
            case index_js_2.PoolEventType.FillAuction: {
                const index = auctions.ongoing.findIndex((auction) => auction.user === event.user && auction.type === event.auctionType);
                if (index !== -1) {
                    const filledAuction = {
                        type: event.auctionType,
                        user: event.user,
                        data: event.filledAuctionData,
                        scaleBlock: event.ledger,
                        filled: true,
                        fillHash: event.txHash,
                    };
                    auctions.filled.push(filledAuction);
                    if (event.fillAmount === 100n) {
                        auctions.ongoing.splice(index, 1);
                    }
                    else {
                        const auction = auctions.ongoing[index];
                        for (const [asset, filledAmount] of event.filledAuctionData.lot) {
                            const preFillAmount = auction.data.lot.get(asset) ?? 0n;
                            auction.data.lot.set(asset, preFillAmount - filledAmount);
                        }
                        for (const [asset, filledAmount] of event.filledAuctionData.bid) {
                            const preFillAmount = auction.data.bid.get(asset) ?? 0n;
                            auction.data.bid.set(asset, preFillAmount - filledAmount);
                        }
                        auctions.ongoing[index] = auction;
                    }
                }
                break;
            }
            case index_js_2.PoolEventType.DeleteAuction: {
                const deleteIndex = auctions.ongoing.findIndex((auction) => auction.user === event.user);
                if (deleteIndex !== -1) {
                    auctions.ongoing.splice(deleteIndex, 1);
                }
                break;
            }
            case index_js_2.PoolEventType.DeleteLiquidationAuction: {
                const deleteIndex = auctions.ongoing.findIndex((auction) => auction.user === event.user);
                if (deleteIndex !== -1) {
                    auctions.ongoing.splice(deleteIndex, 1);
                }
                break;
            }
        }
    }
    return auctions;
}
exports.getAuctionsfromV2Events = getAuctionsfromV2Events;
class Auction {
    user;
    type;
    data;
    constructor(user, type, data) {
        this.user = user;
        this.type = type;
        this.data = data;
    }
    /**
     * Scale the auction to a given block and percentage filled
     * @dev Rescaling a scaled auction will result in incorrect values
     * @param scaleBlock - The block to scale the auction to
     * @param scalePercent - The percentage of the auction to scale to (default 100)
     * @returns Returns a tuple of the scaled auction and the remaining auction in that order
     */
    scale(scaleBlock, scalePercent = 100) {
        const scaledAuctionData = {
            block: this.data.block,
            bid: new Map(),
            lot: new Map(),
        };
        const remainingAuctionData = {
            block: this.data.block,
            bid: new Map(),
            lot: new Map(),
        };
        let lotModifier;
        let bidModifier;
        const fillBlockDelta = BigInt(scaleBlock - this.data.block);
        const perBlockScaler = BigInt(50000);
        const percentFillScaled = BigInt(scalePercent * 100000);
        if (fillBlockDelta <= 200n) {
            lotModifier = fillBlockDelta * perBlockScaler;
            bidModifier = index_js_1.FixedMath.SCALAR_7;
        }
        else {
            lotModifier = index_js_1.FixedMath.SCALAR_7;
            if (fillBlockDelta < 400n) {
                bidModifier = index_js_1.FixedMath.SCALAR_7 - (fillBlockDelta - 200n) * perBlockScaler;
            }
            else {
                bidModifier = 0n;
            }
        }
        for (const [assetId, amount] of Array.from(this.data.lot)) {
            const baseFill = index_js_1.FixedMath.mulFloor(amount, percentFillScaled, index_js_1.FixedMath.SCALAR_7);
            const remainingBase = amount - baseFill;
            if (remainingBase > 0n) {
                remainingAuctionData.lot.set(assetId, remainingBase);
            }
            const scaledLot = index_js_1.FixedMath.mulFloor(baseFill, lotModifier, index_js_1.FixedMath.SCALAR_7);
            scaledAuctionData.lot.set(assetId, BigInt(scaledLot));
        }
        for (const [assetId, amount] of Array.from(this.data.bid)) {
            const baseFill = index_js_1.FixedMath.mulCeil(amount, percentFillScaled, index_js_1.FixedMath.SCALAR_7);
            const remainingBase = amount - baseFill;
            if (remainingBase > 0n) {
                remainingAuctionData.bid.set(assetId, remainingBase);
            }
            const scaledBid = index_js_1.FixedMath.mulCeil(baseFill, bidModifier, index_js_1.FixedMath.SCALAR_7);
            scaledAuctionData.bid.set(assetId, BigInt(scaledBid));
        }
        let remainingAuction = undefined;
        const scaledAuction = {
            type: this.type,
            user: this.user,
            data: scaledAuctionData,
            scaleBlock: scaleBlock,
            filled: false,
            fillHash: undefined,
        };
        if (remainingAuctionData.lot.size > 0 || remainingAuctionData.bid.size > 0) {
            remainingAuction = new Auction(this.user, this.type, remainingAuctionData);
        }
        return [scaledAuction, remainingAuction];
    }
}
exports.Auction = Auction;
