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
exports.EmitterDataKeyToXDR = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
__exportStar(require("./emitter_config.js"), exports);
__exportStar(require("./emitter_contract.js"), exports);
__exportStar(require("./emitter_events.js"), exports);
function EmitterDataKeyToXDR(emitterDataKey) {
    if (!emitterDataKey) {
        return stellar_sdk_1.xdr.ScVal.scvVoid();
    }
    const res = [];
    switch (emitterDataKey.tag) {
        case 'Dropped':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('Dropped'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(emitterDataKey.values));
            break;
        case 'LastDistro':
            res.push(((i) => stellar_sdk_1.xdr.ScVal.scvSymbol(i))('LastDistro'));
            res.push(...((i) => [((i) => stellar_sdk_1.Address.fromString(i).toScVal())(i[0])])(emitterDataKey.values));
            break;
    }
    return stellar_sdk_1.xdr.ScVal.scvVec(res);
}
exports.EmitterDataKeyToXDR = EmitterDataKeyToXDR;
