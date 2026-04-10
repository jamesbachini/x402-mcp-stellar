"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolFromBackstopLedgerData = exports.BackstopUserEmissions = exports.UserBalance = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const emissions_js_1 = require("../emissions.js");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class UserBalance {
    shares;
    q4w;
    unlockedQ4W;
    totalQ4W;
    constructor(shares, q4w, unlockedQ4W, totalQ4W) {
        this.shares = shares;
        this.q4w = q4w;
        this.unlockedQ4W = unlockedQ4W;
        this.totalQ4W = totalQ4W;
    }
    static ledgerKey(backstopId, poolId, userId) {
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('UserBalance'),
                stellar_sdk_1.xdr.ScVal.scvMap([
                    new stellar_sdk_1.xdr.ScMapEntry({
                        key: stellar_sdk_1.xdr.ScVal.scvSymbol('pool'),
                        val: stellar_sdk_1.Address.fromString(poolId).toScVal(),
                    }),
                    new stellar_sdk_1.xdr.ScMapEntry({
                        key: stellar_sdk_1.xdr.ScVal.scvSymbol('user'),
                        val: stellar_sdk_1.Address.fromString(userId).toScVal(),
                    }),
                ]),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
    static fromLedgerEntryData(ledger_entry_data, timestamp) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const data_entry_map = ledger_entry_data.contractData().val().map();
        if (data_entry_map == undefined) {
            throw Error('UserBalance contract data value is not a map');
        }
        let shares = BigInt(0);
        const q4w = [];
        let unlockedQ4W = BigInt(0);
        let totalQ4W = BigInt(0);
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'shares':
                    shares = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'q4w':
                    map_entry
                        .val()
                        .vec()
                        ?.map((entry) => {
                        const q4w_array = entry.map();
                        let amount;
                        let exp;
                        for (const q4wEntry of q4w_array ?? []) {
                            const q4wKey = q4wEntry.key().sym().toString();
                            switch (q4wKey) {
                                case 'amount':
                                    amount = (0, stellar_sdk_1.scValToNative)(q4wEntry.val());
                                    break;
                                case 'exp':
                                    exp = (0, stellar_sdk_1.scValToNative)(q4wEntry.val());
                                    break;
                                default:
                                    throw Error(`Invalid Q4W key: should not contain ${q4wKey}`);
                            }
                        }
                        if (amount == undefined || exp == undefined) {
                            throw Error(`Malformed Q4W scvMap`);
                        }
                        totalQ4W += amount;
                        if (BigInt(timestamp) > exp) {
                            unlockedQ4W += amount;
                        }
                        else {
                            q4w.push({ amount, exp });
                        }
                    });
                    break;
                default:
                    throw Error(`Invalid backstop UserBalance key: should not contain ${key}`);
            }
        }
        return new UserBalance(shares, q4w, unlockedQ4W, totalQ4W);
    }
}
exports.UserBalance = UserBalance;
class BackstopUserEmissions extends emissions_js_1.UserEmissions {
    static ledgerKey(backstopId, poolId, userId) {
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('UEmisData'),
                stellar_sdk_1.xdr.ScVal.scvMap([
                    new stellar_sdk_1.xdr.ScMapEntry({
                        key: stellar_sdk_1.xdr.ScVal.scvSymbol('pool'),
                        val: stellar_sdk_1.Address.fromString(poolId).toScVal(),
                    }),
                    new stellar_sdk_1.xdr.ScMapEntry({
                        key: stellar_sdk_1.xdr.ScVal.scvSymbol('user'),
                        val: stellar_sdk_1.Address.fromString(userId).toScVal(),
                    }),
                ]),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
}
exports.BackstopUserEmissions = BackstopUserEmissions;
function getPoolFromBackstopLedgerData(ledger_entry_data) {
    if (typeof ledger_entry_data == 'string') {
        ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
    }
    const pool_address = ledger_entry_data
        ?.contractData()
        ?.key()
        ?.vec()
        ?.at(1)
        ?.map()
        ?.at(0)
        ?.val()
        ?.address();
    if (pool_address == undefined) {
        throw new Error("Invalid userEmissionData: should contain 'reserve_id'");
    }
    return stellar_sdk_1.Address.fromScAddress(pool_address).toString();
}
exports.getPoolFromBackstopLedgerData = getPoolFromBackstopLedgerData;
