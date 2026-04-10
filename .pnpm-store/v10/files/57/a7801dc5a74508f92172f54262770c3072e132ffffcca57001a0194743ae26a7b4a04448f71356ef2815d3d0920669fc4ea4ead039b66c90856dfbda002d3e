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
exports.BackstopDataKeyToXDR = exports.PoolUserKeyToXDR = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
__exportStar(require("./backstop.js"), exports);
__exportStar(require("./backstop_config.js"), exports);
__exportStar(require("./backstop_contract.js"), exports);
__exportStar(require("./backstop_events.js"), exports);
__exportStar(require("./backstop_pool.js"), exports);
__exportStar(require("./backstop_pool_est.js"), exports);
__exportStar(require("./backstop_pool_user.js"), exports);
__exportStar(require("./backstop_pool_user_est.js"), exports);
__exportStar(require("./backstop_token.js"), exports);
__exportStar(require("./backstop_user_types.js"), exports);
function PoolUserKeyToXDR(poolUserKey) {
    if (!poolUserKey) {
        return stellar_sdk_1.xdr.ScVal.scvVoid();
    }
    const arr = [
        new stellar_sdk_1.xdr.ScMapEntry({
            key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('pool'),
            val: ((i) => stellar_sdk_1.Address.fromString(i).toScVal())(poolUserKey.pool),
        }),
        new stellar_sdk_1.xdr.ScMapEntry({
            key: ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('user'),
            val: ((i) => stellar_sdk_1.Address.fromString(i).toScVal())(poolUserKey.user),
        }),
    ];
    return stellar_sdk_1.xdr.ScVal.scvMap(arr);
}
exports.PoolUserKeyToXDR = PoolUserKeyToXDR;
function BackstopDataKeyToXDR(backstopDataKey) {
    if (!backstopDataKey) {
        return stellar_sdk_1.xdr.ScVal.scvVoid();
    }
    const res = [];
    switch (backstopDataKey.tag) {
        case 'Emitter':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Emitter');
        case 'BToken':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('BToken');
        case 'PoolFact':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('PoolFact');
        case 'BLNDTkn':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('BLNDTkn');
        case 'USDCTkn':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('USDCTkn');
        case 'RZ':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('RZ');
        case 'RZEmissionIndex':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('RZEmissionIndex');
        case 'BackfillEmis':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('BackfillEmis');
        case 'Backfill':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Backfill');
        case 'LastDist':
            return ((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('LastDist');
        case 'UserBalance':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('UserBalance'));
            res.push(...((i) => [((i) => PoolUserKeyToXDR(i))(i[0])])(backstopDataKey.values));
            break;
        case 'PoolBalance':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('PoolBalance'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(backstopDataKey.values));
            break;
        case 'PoolUSDC':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('PoolUSDC'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(backstopDataKey.values));
            break;
        case 'RzEmisData':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('RzEmisData'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(backstopDataKey.values));
            break;
        case 'PoolEPS':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('PoolEPS'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(backstopDataKey.values));
            break;
        case 'BEmisCfg':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('BEmisCfg'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(backstopDataKey.values));
            break;
        case 'BEmisData':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('BEmisData'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(backstopDataKey.values));
            break;
        case 'UEmisData':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('UEmisData'));
            res.push(...((i) => [((i) => PoolUserKeyToXDR(i))(i[0])])(backstopDataKey.values));
            break;
    }
    return stellar_sdk_1.xdr.ScVal.scvVec(res);
}
exports.BackstopDataKeyToXDR = BackstopDataKeyToXDR;
