import { Address, scValToNative, xdr } from '@stellar/stellar-sdk';
import { decodeEntryKey } from '../ledger_entry_helper.js';
export * from './pool.js';
export * from './pool_metadata.js';
export * from './pool_contract.js';
export * from './pool_est.js';
export * from './pool_events.js';
export * from './pool_oracle.js';
export * from './pool_user.js';
export * from './reserve.js';
export * from './reserve_types.js';
export * from './user_positions_est.js';
export * from './user_types.js';
export * from './auction.js';
export function UserReserveKeyToXDR(userReserveKey) {
    if (!userReserveKey) {
        return xdr.ScVal.scvVoid();
    }
    const arr = [
        new xdr.ScMapEntry({
            key: ((i) => xdr.ScVal.scvSymbol(i))('reserve_id'),
            val: ((i) => xdr.ScVal.scvU32(i))(userReserveKey.reserve_id),
        }),
        new xdr.ScMapEntry({
            key: ((i) => xdr.ScVal.scvSymbol(i))('user'),
            val: ((i) => Address.fromString(i).toScVal())(userReserveKey.user),
        }),
    ];
    return xdr.ScVal.scvMap(arr);
}
/**
 * RequestType for specifying submit action
 */
export var RequestType;
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
})(RequestType || (RequestType = {}));
function AuctionKeyToXDR(auctionKey) {
    if (!auctionKey) {
        return xdr.ScVal.scvVoid();
    }
    const arr = [
        new xdr.ScMapEntry({
            key: ((i) => xdr.ScVal.scvSymbol(i))('auct_type'),
            val: ((i) => xdr.ScVal.scvU32(i))(auctionKey.auct_type),
        }),
        new xdr.ScMapEntry({
            key: ((i) => xdr.ScVal.scvSymbol(i))('user'),
            val: ((i) => Address.fromString(i).toScVal())(auctionKey.user),
        }),
    ];
    return xdr.ScVal.scvMap(arr);
}
export class AuctionData {
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
            xdr.ScVal.scvSymbol('Auction'),
            xdr.ScVal.scvMap([
                new xdr.ScMapEntry({
                    key: ((i) => xdr.ScVal.scvSymbol(i))('auct_type'),
                    val: ((i) => xdr.ScVal.scvU32(i))(auctionKey.auct_type),
                }),
                new xdr.ScMapEntry({
                    key: ((i) => xdr.ScVal.scvSymbol(i))('user'),
                    val: ((i) => Address.fromString(i).toScVal())(auctionKey.user),
                }),
            ]),
        ];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.temporary(),
        }));
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        return AuctionData.fromScVal(ledger_entry_data.contractData().val());
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('UserPositions contract data value is not a map');
        }
        let bid_map;
        let lot_map;
        let block;
        for (const map_entry of data_entry_map) {
            const key = decodeEntryKey(map_entry.key());
            switch (key) {
                case 'bid': {
                    bid_map = new Map();
                    const bid = map_entry.val().map();
                    if (bid) {
                        for (const asset of bid) {
                            bid_map.set(scValToNative(asset.key()), scValToNative(asset.val()));
                        }
                    }
                    break;
                }
                case 'lot': {
                    lot_map = new Map();
                    const lot = map_entry.val().map();
                    if (lot) {
                        for (const asset of lot) {
                            lot_map.set(scValToNative(asset.key()), scValToNative(asset.val()));
                        }
                    }
                    break;
                }
                case 'block': {
                    block = scValToNative(map_entry.val());
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
/*
 * The pool contracts config object
 */
export class PoolConfig {
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
            sc_val = xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        let backstopRate;
        let oracle;
        let status;
        let maxPositions;
        let minCollateral;
        sc_val.map()?.map((config_entry) => {
            const poolConfigKey = decodeEntryKey(config_entry.key());
            switch (poolConfigKey) {
                case 'bstop_rate':
                    backstopRate = Number(config_entry.val().u32().toString());
                    return;
                case 'oracle':
                    oracle = Address.fromScVal(config_entry.val()).toString();
                    return;
                case 'status':
                    status = scValToNative(config_entry.val());
                    return;
                case 'max_positions':
                    maxPositions = Number(config_entry.val().u32().toString());
                    return;
                case 'min_collateral':
                    minCollateral = scValToNative(config_entry.val());
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
export var AuctionType;
(function (AuctionType) {
    AuctionType[AuctionType["Liquidation"] = 0] = "Liquidation";
    AuctionType[AuctionType["BadDebt"] = 1] = "BadDebt";
    AuctionType[AuctionType["Interest"] = 2] = "Interest";
})(AuctionType || (AuctionType = {}));
export function PoolDataKeyToXDR(poolDataKey) {
    if (!poolDataKey) {
        return xdr.ScVal.scvVoid();
    }
    const res = [];
    switch (poolDataKey.tag) {
        case 'Admin':
            return ((i) => xdr.ScVal.scvSymbol(i))('Admin');
        case 'Name':
            return ((i) => xdr.ScVal.scvSymbol(i))('Name');
        case 'Backstop':
            return ((i) => xdr.ScVal.scvSymbol(i))('Backstop');
        case 'BLNDTkn':
            return ((i) => xdr.ScVal.scvSymbol(i))('BLNDTkn');
        case 'Config':
            return ((i) => xdr.ScVal.scvSymbol(i))('Config');
        case 'PoolEmis':
            return ((i) => xdr.ScVal.scvSymbol(i))('PoolEmis');
        case 'ResList':
            return ((i) => xdr.ScVal.scvSymbol(i))('ResList');
        case 'Positions':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('Positions'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'ResConfig':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('ResConfig'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'ResData':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('ResData'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'EmisConfig':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('EmisConfig'));
            res.push(...((i) => [((i) => xdr.ScVal.scvU32(i))(i[0])])(poolDataKey.values));
            break;
        case 'EmisData':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('EmisData'));
            res.push(...((i) => [((i) => xdr.ScVal.scvU32(i))(i[0])])(poolDataKey.values));
            break;
        case 'UserEmis':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('UserEmis'));
            res.push(...((i) => [((i) => UserReserveKeyToXDR(i))(i[0])])(poolDataKey.values));
            break;
        case 'Auction':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('Auction'));
            res.push(...((i) => [((i) => AuctionKeyToXDR(i))(i[0])])(poolDataKey.values));
            break;
        case 'AuctData':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('AuctData'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
        case 'ResInit':
            res.push(((i) => xdr.ScVal.scvSymbol(i))('ResInit'));
            res.push(...((i) => [((i) => Address.fromString(i).toScVal())(i[0])])(poolDataKey.values));
            break;
    }
    return xdr.ScVal.scvVec(res);
}
