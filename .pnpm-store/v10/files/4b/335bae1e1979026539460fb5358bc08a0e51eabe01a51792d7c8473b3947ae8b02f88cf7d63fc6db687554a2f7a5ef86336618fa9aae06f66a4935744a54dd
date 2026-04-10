"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolMetadata = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const index_js_1 = require("../index.js");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class PoolMetadata {
    wasmHash;
    admin;
    name;
    backstop;
    backstopRate;
    maxPositions;
    minCollateral;
    oracle;
    status;
    reserveList;
    latestLedger;
    constructor(wasmHash, admin, name, backstop, backstopRate, maxPositions, minCollateral, oracle, status, reserveList, latestLedger) {
        this.wasmHash = wasmHash;
        this.admin = admin;
        this.name = name;
        this.backstop = backstop;
        this.backstopRate = backstopRate;
        this.maxPositions = maxPositions;
        this.minCollateral = minCollateral;
        this.oracle = oracle;
        this.status = status;
        this.reserveList = reserveList;
        this.latestLedger = latestLedger;
    }
    static async load(network, poolId) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const contractInstanceKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(poolId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvLedgerKeyContractInstance(),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        const reserveListDataKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(poolId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvSymbol('ResList'),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        let washHash;
        let admin;
        let name;
        let backstop;
        let poolConfig;
        let reserveList;
        const poolConfigEntries = await stellarRpc.getLedgerEntries(contractInstanceKey, reserveListDataKey);
        for (const entry of poolConfigEntries.entries ?? []) {
            const ledgerData = entry.val.contractData();
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.key());
            switch (key) {
                case 'ContractInstance': {
                    const instance = ledgerData.val().instance();
                    instance.storage()?.map((entry) => {
                        const instanceKey = (0, ledger_entry_helper_js_1.decodeEntryKey)(entry.key());
                        switch (instanceKey) {
                            case 'Admin':
                                admin = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                return;
                            case 'Backstop':
                                backstop = stellar_sdk_1.Address.fromScVal(entry.val()).toString();
                                return;
                            case 'BLNDTkn':
                                return;
                            case 'Config':
                                poolConfig = index_js_1.PoolConfig.fromScVal(entry.val());
                                return;
                            case 'Name':
                                name = entry.val().str().toString();
                                return;
                            case 'IsInit':
                                // do nothing
                                break;
                            default:
                                throw Error(`${index_js_1.ErrorTypes.LedgerEntryParseError}: pool instance storage key: should not contain ${instanceKey}`);
                        }
                    });
                    washHash = instance.executable()?.wasmHash()?.toString('hex');
                    break;
                }
                case 'ResList':
                    reserveList = (0, stellar_sdk_1.scValToNative)(ledgerData.val());
                    break;
                default:
                    throw Error(`${index_js_1.ErrorTypes.LedgerEntryParseError}: Invalid PoolConfig key: should not contain ${key}`);
            }
        }
        if (washHash == undefined ||
            admin == undefined ||
            name == undefined ||
            backstop == undefined ||
            poolConfig == undefined ||
            reserveList == undefined ||
            poolConfigEntries.entries.length == 0) {
            throw Error(`${index_js_1.ErrorTypes.LedgerEntryParseError}: Unable to parse data for pool config`);
        }
        return new PoolMetadata(washHash, admin, name, backstop, poolConfig.backstopRate, poolConfig.maxPositions, poolConfig.minCollateral ?? 0n, poolConfig.oracle, poolConfig.status, reserveList, poolConfigEntries.latestLedger);
    }
}
exports.PoolMetadata = PoolMetadata;
