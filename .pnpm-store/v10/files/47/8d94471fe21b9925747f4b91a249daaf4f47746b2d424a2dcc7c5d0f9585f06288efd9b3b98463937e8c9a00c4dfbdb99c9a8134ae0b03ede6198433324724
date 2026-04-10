"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeEntryKey = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
function decodeEntryKey(entryKey) {
    let key;
    switch (entryKey.switch()) {
        // Key is a ScVec[ScvSym, ScVal]
        case stellar_sdk_1.xdr.ScValType.scvVec():
            key = entryKey.vec().at(0).sym().toString();
            break;
        case stellar_sdk_1.xdr.ScValType.scvSymbol():
            key = entryKey.sym().toString();
            break;
        case stellar_sdk_1.xdr.ScValType.scvLedgerKeyContractInstance():
            key = 'ContractInstance';
            break;
        default:
            throw Error(`Invalid ledger entry key type: should not contain type ${entryKey.switch()}`);
    }
    return key;
}
exports.decodeEntryKey = decodeEntryKey;
