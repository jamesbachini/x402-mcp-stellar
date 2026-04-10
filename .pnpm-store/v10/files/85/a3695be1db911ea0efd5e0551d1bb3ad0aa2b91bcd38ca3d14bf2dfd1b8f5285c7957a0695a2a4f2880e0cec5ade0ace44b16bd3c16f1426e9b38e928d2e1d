"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolDataKeyToXDR = exports.AuctionType = exports.PoolConfig = exports.AuctionData = exports.RequestType = exports.UserReserveKeyToXDR = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
__exportStar(require("./pool.js"), exports);
__exportStar(require("./pool_metadata.js"), exports);
__exportStar(require("./pool_contract.js"), exports);
__exportStar(require("./pool_est.js"), exports);
__exportStar(require("./pool_events.js"), exports);
__exportStar(require("./pool_oracle.js"), exports);
__exportStar(require("./pool_user.js"), exports);
__exportStar(require("./reserve.js"), exports);
__exportStar(require("./reserve_types.js"), exports);
__exportStar(require("./user_positions_est.js"), exports);
__exportStar(require("./user_types.js"), exports);
__exportStar(require("./auction.js"), exports);
function UserReserveKeyToXDR(userReserveKey) {
    if (!userReserveKey) {
        return stellar_sdk_1.xdr.ScVal.scvVoid();
    }
    const arr = [
        new stellar_sdk_1.xdr.ScMapEntry({
            key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('reserve_id'),
            val: ((i) => stellar_sdk_1.xdr.ScVal.scvU32(i))(userReserveKey.reserve_id),
        }),
        new stellar_sdk_1.xdr.ScMapEntry({
            key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('user'),
            val: ((i) => stellar_sdk_1.Address.fromString(i).toScVal())(userReserveKey.user),
        }),
    ];
    return stellar_sdk_1.xdr.ScVal.scvMap(arr);
}
exports.UserReserveKeyToXDR = UserReserveKeyToXDR;
/**
 * RequestType for specifying submit action
 */
var RequestType;
(function (RequestType) {
    RequestType[RequestType["Supply"] = 0] = "Supply";
    RequestType[RequestType["Withdraw"] = 1] = "Withdraw";
    RequestType[RequestType["SupplyCollateral"] = 2] = "SupplyCollateral";
    RequestType[RequestType["WithdrawCollateral"] = 3] = "WithdrawCollateral";
    RequestType[RequestType["Borrow"] = 4] = "Borrow";
    RequestType[RequestType["Repay"] = 5] = "Repay";
    RequestType[RequestType["FillUserLiquidationAuction"] = 6] = "FillUserLiquidationAuction";
    RequestType[RequestType["FillBadDebtAuction"] = 7] = "FillBadDebtAuction";
    RequestType[RequestType["FillInterestAuction"] = 8] = "FillInterestAuction";
    RequestType[RequestType["DeleteLiquidationAuction"] = 9] = "DeleteLiquidationAuction";
})(RequestType || (exports.RequestType = RequestType = {}));
function AuctionKeyToXDR(auctionKey) {
    if (!auctionKey) {
        return stellar_sdk_1.xdr.ScVal.scvVoid();
    }
    const arr = [
        new stellar_sdk_1.xdr.ScMapEntry({
            key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('auct_type'),
            val: ((i) => stellar_sdk_1.xdr.ScVal.scvU32(i))(auctionKey.auct_type),
        }),
        new stellar_sdk_1.xdr.ScMapEntry({
            key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('user'),
            val: ((i) => stellar_sdk_1.Address.fromString(i).toScVal())(auctionKey.user),
        }),
    ];
    return stellar_sdk_1.xdr.ScVal.scvMap(arr);
}
class AuctionData {
    bid;
    block;
    lot;
    constructor(bid, block, lot) {
        this.bid = bid;
        this.block = block;
        this.lot = lot;
    }
    static ledgerKey(poolId, auctionKey) {
        const res = [
            stellar_sdk_1.xdr.ScVal.scvSymbol('Auction'),
            stellar_sdk_1.xdr.ScVal.scvMap([
                new stellar_sdk_1.xdr.ScMapEntry({
                    key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('auct_type'),
                    val: ((i) => stellar_sdk_1.xdr.ScVal.scvU32(i))(auctionKey.auct_type),
                }),
                new stellar_sdk_1.xdr.ScMapEntry({
                    key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('user'),
                    val: ((i) => stellar_sdk_1.Address.fromString(i).toScVal())(auctionKey.user),
                }),
            ]),
        ];
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(poolId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec(res),
            durability: stellar_sdk_1.xdr.ContractDataDurability.temporary(),
        }));
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        return AuctionData.fromScVal(ledger_entry_data.contractData().val());
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = stellar_sdk_1.xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('UserPositions contract data value is not a map');
        }
        let bid_map;
        let lot_map;
        let block;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'bid': {
                    bid_map = new Map();
                    const bid = map_entry.val().map();
                    if (bid) {
                        for (const asset of bid) {
                            bid_map.set((0, stellar_sdk_1.scValToNative)(asset.key()), (0, stellar_sdk_1.scValToNative)(asset.val()));
                        }
                    }
                    break;
                }
                case 'lot': {
                    lot_map = new Map();
                    const lot = map_entry.val().map();
                    if (lot) {
                        for (const asset of lot) {
                            lot_map.set((0, stellar_sdk_1.scValToNative)(asset.key()), (0, stellar_sdk_1.scValToNative)(asset.val()));
                        }
                    }
                    break;
                }
                case 'block': {
                    block = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                }
                default:
                    throw Error(`Invalid UserPositions key: should not contain ${key}`);
            }
        }
        if (!bid_map || !lot_map || !block) {
            throw Error('User positions xdr_string is malformed');
        }
        return new AuctionData(bid_map, block, lot_map);
    }
}
exports.AuctionData = AuctionData;
/*
 * The pool contracts config object
 */
class PoolConfig {
    backstopRate;
    maxPositions;
    oracle;
    status;
    minCollateral;
    constructor(backstopRate, maxPositions, oracle, status, minCollateral) {
        this.backstopRate = backstopRate;
        this.maxPositions = maxPositions;
        this.oracle = oracle;
        this.status = status;
        this.minCollateral = minCollateral;
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = stellar_sdk_1.xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        let backstopRate;
        let oracle;
        let status;
        let maxPositions;
        let minCollateral;
        sc_val.map()?.map((config_entry) => {
            const poolConfigKey = (0, ledger_entry_helper_js_1.decodeEntryKey)(config_entry.key());
            switch (poolConfigKey) {
                case 'bstop_rate':
                    backstopRate = Number(config_entry.val().u32().toString());
                    return;
                case 'oracle':
                    oracle = stellar_sdk_1.Address.fromScVal(config_entry.val()).toString();
                    return;
                case 'status':
                    status = (0, stellar_sdk_1.scValToNative)(config_entry.val());
                    return;
                case 'max_positions':
                    maxPositions = Number(config_entry.val().u32().toString());
                    return;
                case 'min_collateral':
                    minCollateral = (0, stellar_sdk_1.scValToNative)(config_entry.val());
                    return;
                default:
                    throw Error(`Invalid pool config key: should not contain ${poolConfigKey}`);
            }
        });
        if (backstopRate == undefined ||
            oracle == undefined ||
            status == undefined ||
            maxPositions == undefined) {
            throw new Error();
        }
        return new PoolConfig(backstopRate, maxPositions, oracle, status, minCollateral);
    }
}
exports.PoolConfig = PoolConfig;
var AuctionType;
(function (AuctionType) {
    AuctionType[AuctionType["Liquidation"] = 0] = "Liquidation";
    AuctionType[AuctionType["BadDebt"] = 1] = "BadDebt";
    AuctionType[AuctionType["Interest"] = 2] = "Interest";
})(AuctionType || (exports.AuctionType = AuctionType = {}));
function PoolDataKeyToXDR(poolDataKey) {
    if (!poolDataKey) {
        return stellar_sdk_1.xdr.ScVal.scvVoid();
    }
    const res = [];
    switch (poolDataKey.tag) {
        case 'Admin':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Admin');
        case 'Name':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Name');
        case 'Backstop':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Backstop');
        case 'BLNDTkn':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('BLNDTkn');
        case 'Config':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Config');
        case 'PoolEmis':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('PoolEmis');
        case 'ResList':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('ResList');
        case 'Positions':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Positions'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'ResConfig':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('ResConfig'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'ResData':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('ResData'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'EmisConfig':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('EmisConfig'));
            res.push(...((i) => [((i) => stellar_sdk_1.xdr.ScVal.scvU32(i))(i[0])])(poolDataKey.values));
            break;
        case 'EmisData':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('EmisData'));
            res.push(...((i) => [((i) => stellar_sdk_1.xdr.ScVal.scvU32(i))(i[0])])(poolDataKey.values));
            break;
        case 'UserEmis':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('UserEmis'));
            res.push(...((i) => [((i) => UserReserveKeyToXDR(i))(i[0])])(poolDataKey.values));
            break;
        case 'Auction':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Auction'));
            res.push(...((i) => [((i) => AuctionKeyToXDR(i))(i[0])])(poolDataKey.values));
            break;
        case 'AuctData':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('AuctData'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'ResInit':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('ResInit'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
    }
    return stellar_sdk_1.xdr.ScVal.scvVec(res);
}
exports.PoolDataKeyToXDR = PoolDataKeyToXDR;
