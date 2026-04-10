import { Address, rpc, scValToNative, xdr } from '@stellar/stellar-sdk';
import { UserEmissions } from '../emissions.js';
import { decodeEntryKey } from '../ledger_entry_helper.js';
export class Positions {
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
            xdr.ScVal.scvSymbol('Positions'),
            Address.fromString(userId).toScVal(),
        ];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.persistent(),
        }));
    }
    static async load(network, poolId, userId) {
        const stellarRpc = new rpc.Server(network.rpc, network.opts);
        const userPositionsKey = Positions.ledgerKey(poolId, userId);
        const positionResp = await stellarRpc.getLedgerEntries(userPositionsKey);
        // if entry does not exist assume empty
        if (positionResp.entries == undefined || positionResp.entries.length == 0) {
            return new Positions(new Map(), new Map(), new Map());
        }
        let userPositions = undefined;
        for (const entry of positionResp.entries ?? []) {
            const ledgerData = entry.val;
            const key = decodeEntryKey(ledgerData.contractData().key());
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
            ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        return Positions.fromScVal(ledger_entry_data.contractData().val());
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('UserPositions contract data value is not a map');
        }
        let liability_map;
        let collateral_map;
        let supply_map;
        for (const map_entry of data_entry_map) {
            const key = decodeEntryKey(map_entry.key());
            switch (key) {
                case 'liabilities': {
                    liability_map = new Map();
                    const liabilities = map_entry.val().map();
                    if (liabilities) {
                        for (const liability of liabilities) {
                            liability_map.set(liability.key().u32(), scValToNative(liability.val()));
                        }
                    }
                    break;
                }
                case 'collateral': {
                    collateral_map = new Map();
                    const collaterals = map_entry.val().map();
                    if (collaterals) {
                        for (const collateral of collaterals) {
                            collateral_map.set(collateral.key().u32(), scValToNative(collateral.val()));
                        }
                    }
                    break;
                }
                case 'supply': {
                    supply_map = new Map();
                    const supplies = map_entry.val().map();
                    if (supplies) {
                        for (const supply of supplies) {
                            supply_map.set(supply.key().u32(), scValToNative(supply.val()));
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
export class PoolUserEmissionData extends UserEmissions {
    static ledgerKey(poolId, userId, reserveTokenIndex) {
        const res = [
            xdr.ScVal.scvSymbol('UserEmis'),
            xdr.ScVal.scvMap([
                new xdr.ScMapEntry({
                    key: xdr.ScVal.scvSymbol('reserve_id'),
                    val: xdr.ScVal.scvU32(reserveTokenIndex),
                }),
                new xdr.ScMapEntry({
                    key: xdr.ScVal.scvSymbol('user'),
                    val: Address.fromString(userId).toScVal(),
                }),
            ]),
        ];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.persistent(),
        }));
    }
    static getEmissionIndexFromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
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
