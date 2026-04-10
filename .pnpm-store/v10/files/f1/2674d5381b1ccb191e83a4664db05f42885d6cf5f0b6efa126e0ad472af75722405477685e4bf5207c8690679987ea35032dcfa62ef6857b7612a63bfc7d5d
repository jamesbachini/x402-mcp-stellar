"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackstopConfig = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class BackstopConfig {
    emitter;
    blndTkn;
    usdcTkn;
    backstopTkn;
    poolFactory;
    rewardZone;
    latestLedger;
    constructor(emitter, blndTkn, usdcTkn, backstopTkn, poolFactory, rewardZone, latestLedger) {
        this.emitter = emitter;
        this.blndTkn = blndTkn;
        this.usdcTkn = usdcTkn;
        this.backstopTkn = backstopTkn;
        this.poolFactory = poolFactory;
        this.rewardZone = rewardZone;
        this.latestLedger = latestLedger;
    }
    static async load(network, backstopId) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const contractInstanceDataKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvLedgerKeyContractInstance(),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        const rewardZoneDataKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvSymbol('RZ'),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        let emitter;
        let blndTkn;
        let usdcTkn;
        let backstopTkn;
        let poolFactory;
        const rewardZone = [];
        const backstopConfigEntries = await stellarRpc.getLedgerEntries(contractInstanceDataKey, rewardZoneDataKey);
        for (const entry of backstopConfigEntries.entries) {
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
                            case 'BLNDTkn':
                                blndTkn = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                break;
                            case 'BToken':
                                backstopTkn = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                break;
                            case 'USDCTkn':
                                usdcTkn = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                break;
                            case 'PoolFact':
                                poolFactory = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                break;
                            case 'Emitter':
                                emitter = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                break;
                            case 'IsInit':
                                // do nothing
                                break;
                            default:
                                throw Error(`Invalid backstop instance storage key: should not contain ${instanceKey}`);
                        }
                    });
                    break;
                case 'RZ':
                    ledgerData
                        .val()
                        .vec()
                        .map((address) => {
                        rewardZone.push(stellar_sdk_1.Address.fromScVal(address).toString());
                    });
                    break;
                default:
                    throw Error(`Invalid backstop config key: should not contain ${key}`);
            }
        }
        if (emitter == undefined ||
            blndTkn == undefined ||
            usdcTkn == undefined ||
            backstopTkn == undefined ||
            poolFactory == undefined) {
            throw Error('Unable to load backstop config undefined values');
        }
        return new BackstopConfig(emitter, blndTkn, usdcTkn, backstopTkn, poolFactory, rewardZone, backstopConfigEntries.latestLedger);
    }
}
exports.BackstopConfig = BackstopConfig;
