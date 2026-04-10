"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitterConfig = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class EmitterConfig {
    blndTkn;
    backstop;
    constructor(blndTkn, backstop) {
        this.blndTkn = blndTkn;
        this.backstop = backstop;
    }
    static async load(network, emitterId) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const contractInstanceKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(emitterId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvLedgerKeyContractInstance(),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        let blndTkn;
        let backstop;
        const emitterConfigEntries = (await stellarRpc.getLedgerEntries(contractInstanceKey)).entries ?? [];
        for (const entry of emitterConfigEntries) {
            const ledgerData = entry.val.contractData();
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.key());
            switch (key) {
                case 'ContractInstance':
                    ledgerData
                        .val()
                        .instance()
                        .storage()
                        ?.map((entry) => {
                        const instanceKey = (0, ledger_entry_helper_js_1.decodeEntryKey)(entry.key());
                        switch (instanceKey) {
                            case 'BlendId':
                                blndTkn = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                return;
                            case 'Backstop':
                                backstop = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                return;
                            case 'IsInit':
                                // do nothing
                                break;
                            default:
                                throw Error(`invalid emitter instance storage key: should not contain ${instanceKey}`);
                        }
                    });
                    break;
                default:
                    throw Error(`Invalid emitter config key: should not contain ${key}`);
            }
        }
        if (emitterConfigEntries.length == 0 || blndTkn == undefined || backstop == undefined) {
            throw Error('Unable to load emitter config');
        }
        return new EmitterConfig(blndTkn, backstop);
    }
}
exports.EmitterConfig = EmitterConfig;
