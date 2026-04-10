import { rpc } from '@stellar/stellar-sdk';
import { decodeEntryKey } from '../ledger_entry_helper.js';
import { BackstopUserEmissions, UserBalance } from './backstop_user_types.js';
export class BackstopPoolUser {
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
        const stellarRpc = new rpc.Server(network.rpc, network.opts);
        const ledgerKeys = [];
        ledgerKeys.push(UserBalance.ledgerKey(backstopId, poolId, userId));
        ledgerKeys.push(BackstopUserEmissions.ledgerKey(backstopId, poolId, userId));
        const ledgerEntries = await stellarRpc.getLedgerEntries(...ledgerKeys);
        let balances = new UserBalance(BigInt(0), [], BigInt(0), BigInt(0));
        let emissions;
        for (const entry of ledgerEntries.entries) {
            const ledgerData = entry.val;
            const key = decodeEntryKey(ledgerData.contractData().key());
            switch (key) {
                case 'UserBalance': {
                    balances = UserBalance.fromLedgerEntryData(ledgerData, timestamp);
                    break;
                }
                case 'UEmisData': {
                    emissions = BackstopUserEmissions.fromLedgerEntryData(ledgerData);
                    break;
                }
                default:
                    throw new Error(`Invalid BackstopPoolUser key: should not contain ${key}`);
            }
        }
        return new BackstopPoolUser(userId, poolId, balances, emissions);
    }
}
