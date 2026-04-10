"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackstopPoolUser = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
const backstop_user_types_js_1 = require("./backstop_user_types.js");
class BackstopPoolUser {
    userId;
    poolId;
    balance;
    emissions;
    constructor(userId, poolId, balance, emissions) {
        this.userId = userId;
        this.poolId = poolId;
        this.balance = balance;
        this.emissions = emissions;
    }
    /**
     * Load the backstop pool user data from the ledger
     * @param network - The network information
     * @param backstopId - The contract address of the backstop
     * @param poolId - The contract address of the pool
     * @param userId - The address of the user
     * @param timestamp - The timestamp manage withdrawals for (in seconds since epoch), defaults to now
     * @returns
     */
    static async load(network, backstopId, poolId, userId, timestamp) {
        if (timestamp === undefined) {
            timestamp = Math.floor(Date.now() / 1000);
        }
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const ledgerKeys = [];
        ledgerKeys.push(backstop_user_types_js_1.UserBalance.ledgerKey(backstopId, poolId, userId));
        ledgerKeys.push(backstop_user_types_js_1.BackstopUserEmissions.ledgerKey(backstopId, poolId, userId));
        const ledgerEntries = await stellarRpc.getLedgerEntries(...ledgerKeys);
        let balances = new backstop_user_types_js_1.UserBalance(BigInt(0), [], BigInt(0), BigInt(0));
        let emissions;
        for (const entry of ledgerEntries.entries) {
            const ledgerData = entry.val;
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.contractData().key());
            switch (key) {
                case 'UserBalance': {
                    balances = backstop_user_types_js_1.UserBalance.fromLedgerEntryData(ledgerData, timestamp);
                    break;
                }
                case 'UEmisData': {
                    emissions = backstop_user_types_js_1.BackstopUserEmissions.fromLedgerEntryData(ledgerData);
                    break;
                }
                default:
                    throw new Error(`Invalid BackstopPoolUser key: should not contain ${key}`);
            }
        }
        return new BackstopPoolUser(userId, poolId, balances, emissions);
    }
}
exports.BackstopPoolUser = BackstopPoolUser;
