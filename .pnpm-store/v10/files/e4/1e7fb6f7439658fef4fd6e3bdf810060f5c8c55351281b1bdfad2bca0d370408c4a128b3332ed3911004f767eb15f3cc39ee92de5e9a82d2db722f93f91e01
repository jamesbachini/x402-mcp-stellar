"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolUserEmissionData = exports.Positions = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const emissions_js_1 = require("../emissions.js");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class Positions {
    liabilities;
    collateral;
    supply;
    constructor(liabilities, collateral, supply) {
        this.liabilities = liabilities;
        this.collateral = collateral;
        this.supply = supply;
    }
    static ledgerKey(poolId, userId) {
        const res = [
            stellar_sdk_1.xdr.ScVal.scvSymbol('Positions'),
            stellar_sdk_1.Address.fromString(userId).toScVal(),
        ];
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(poolId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec(res),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
    static async load(network, poolId, userId) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const userPositionsKey = Positions.ledgerKey(poolId, userId);
        const positionResp = await stellarRpc.getLedgerEntries(userPositionsKey);
        // if entry does not exist assume empty
        if (positionResp.entries == undefined || positionResp.entries.length == 0) {
            return new Positions(new Map(), new Map(), new Map());
        }
        let userPositions = undefined;
        for (const entry of positionResp.entries ?? []) {
            const ledgerData = entry.val;
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.contractData().key());
            switch (key) {
                case 'Positions':
                    userPositions = Positions.fromLedgerEntryData(ledgerData);
                    break;
                default:
                    throw Error(`Invalid user positions key: should not contain: ${key}`);
            }
        }
        if (userPositions == undefined) {
            throw Error("Unable to load user's positions");
        }
        return userPositions;
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        return Positions.fromScVal(ledger_entry_data.contractData().val());
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = stellar_sdk_1.xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('UserPositions contract data value is not a map');
        }
        let liability_map;
        let collateral_map;
        let supply_map;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'liabilities': {
                    liability_map = new Map();
                    const liabilities = map_entry.val().map();
                    if (liabilities) {
                        for (const liability of liabilities) {
                            liability_map.set(liability.key().u32(), (0, stellar_sdk_1.scValToNative)(liability.val()));
                        }
                    }
                    break;
                }
                case 'collateral': {
                    collateral_map = new Map();
                    const collaterals = map_entry.val().map();
                    if (collaterals) {
                        for (const collateral of collaterals) {
                            collateral_map.set(collateral.key().u32(), (0, stellar_sdk_1.scValToNative)(collateral.val()));
                        }
                    }
                    break;
                }
                case 'supply': {
                    supply_map = new Map();
                    const supplies = map_entry.val().map();
                    if (supplies) {
                        for (const supply of supplies) {
                            supply_map.set(supply.key().u32(), (0, stellar_sdk_1.scValToNative)(supply.val()));
                        }
                    }
                    break;
                }
                default:
                    throw Error(`Invalid UserPositions key: should not contain ${key}`);
            }
        }
        if (!liability_map || !collateral_map || !supply_map) {
            throw Error('User positions xdr_string is malformed');
        }
        return new Positions(liability_map, collateral_map, supply_map);
    }
}
exports.Positions = Positions;
class PoolUserEmissionData extends emissions_js_1.UserEmissions {
    static ledgerKey(poolId, userId, reserveTokenIndex) {
        const res = [
            stellar_sdk_1.xdr.ScVal.scvSymbol('UserEmis'),
            stellar_sdk_1.xdr.ScVal.scvMap([
                new stellar_sdk_1.xdr.ScMapEntry({
                    key: stellar_sdk_1.xdr.ScVal.scvSymbol('reserve_id'),
                    val: stellar_sdk_1.xdr.ScVal.scvU32(reserveTokenIndex),
                }),
                new stellar_sdk_1.xdr.ScMapEntry({
                    key: stellar_sdk_1.xdr.ScVal.scvSymbol('user'),
                    val: stellar_sdk_1.Address.fromString(userId).toScVal(),
                }),
            ]),
        ];
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(poolId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec(res),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
    static getEmissionIndexFromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const emission_index = ledger_entry_data
            ?.contractData()
            ?.key()
            ?.vec()
            ?.at(1)
            ?.map()
            ?.at(0)
            ?.val()
            ?.u32();
        if (emission_index == undefined) {
            throw new Error("Invalid userEmissionData: should contain 'reserve_id'");
        }
        return emission_index;
    }
}
exports.PoolUserEmissionData = PoolUserEmissionData;
