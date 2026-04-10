"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolFactoryConfig = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class PoolFactoryConfig {
    blndTkn;
    backstop;
    poolHash;
    constructor(blndTkn, backstop, poolHash) {
        this.blndTkn = blndTkn;
        this.backstop = backstop;
        this.poolHash = poolHash;
    }
    static async load(network, poolFactoryId) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const contractInstanceKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(poolFactoryId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvLedgerKeyContractInstance(),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        let blndTkn;
        let backstop;
        let poolHash;
        const poolFactoryConfigEntries = (await stellarRpc.getLedgerEntries(contractInstanceKey)).entries ?? [];
        for (const entry of poolFactoryConfigEntries) {
            const ledgerData = entry.val.contractData();
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.key());
            switch (key) {
                case 'ContractInstance': {
                    ledgerData
                        .val()
                        .instance()
                        .storage()
                        ?.map((entry) => {
                        const instanceKey = (0, ledger_entry_helper_js_1.decodeEntryKey)(entry.key());
                        switch (instanceKey) {
                            case 'PoolMeta':
                                entry
                                    .val()
                                    .map()
                                    .map((mapEntry) => {
                                    const poolMetaKey = mapEntry.key().sym().toString();
                                    switch (poolMetaKey) {
                                        case 'backstop':
                                            backstop = stellar_sdk_1.Address.fromScVal(mapEntry.val()).toString();
                                            break;
                                        case 'blnd_id':
                                            blndTkn = stellar_sdk_1.Address.fromScVal(mapEntry.val()).toString();
                                            break;
                                        case 'pool_hash':
                                            poolHash = mapEntry.val().bytes().toString('hex');
                                            break;
                                        case 'IsInit':
                                            // do nothing
                                            break;
                                        default:
                                            throw Error(`Invalid PoolMeta key: should not contain ${poolMetaKey}`);
                                    }
                                });
                                break;
                            default:
                                throw Error(`Invalid pool factory instance key: should not contain ${instanceKey}`);
                        }
                    });
                    break;
                }
                default:
                    throw Error(`Invalid pool factory config key: should not contain ${key}`);
            }
        }
        if (blndTkn == undefined ||
            backstop == undefined ||
            poolHash == undefined ||
            poolFactoryConfigEntries.length == 0) {
            throw Error('Unable to load pool factory config');
        }
        return new PoolFactoryConfig(blndTkn, backstop, poolHash);
    }
}
exports.PoolFactoryConfig = PoolFactoryConfig;
