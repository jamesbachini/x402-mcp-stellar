import { Address, rpc, scValToNative, xdr } from '@stellar/stellar-sdk';
import { EmissionConfig, EmissionData } from '../emissions.js';
import { decodeEntryKey } from '../ledger_entry_helper.js';
export class ReserveConfig {
    index;
    decimals;
    c_factor;
    l_factor;
    util;
    max_util;
    r_base;
    r_one;
    r_two;
    r_three;
    reactivity;
    constructor(index, decimals, c_factor, l_factor, util, max_util, r_base, r_one, r_two, r_three, reactivity) {
        this.index = index;
        this.decimals = decimals;
        this.c_factor = c_factor;
        this.l_factor = l_factor;
        this.util = util;
        this.max_util = max_util;
        this.r_base = r_base;
        this.r_one = r_one;
        this.r_two = r_two;
        this.r_three = r_three;
        this.reactivity = reactivity;
    }
    static async load(network, poolId, assetId) {
        const stellarRpc = new rpc.Server(network.rpc, network.opts);
        const ledger_key = this.ledgerKey(poolId, assetId);
        const result = await stellarRpc.getLedgerEntries(ledger_key);
        if (result.entries.length > 0) {
            return this.fromLedgerEntryData(result.entries[0].val);
        }
        else {
            throw Error(`Unable to find ReserveConfig with key: ${ledger_key.toXDR('base64')}`);
        }
    }
    static ledgerKey(poolId, assetId) {
        const res = [
            xdr.ScVal.scvSymbol('ResConfig'),
            Address.fromString(assetId).toScVal(),
        ];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.persistent(),
        }));
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const as_scval = ledger_entry_data.contractData().val();
        if (as_scval === undefined) {
            throw Error('ReserveConfig contract data value invalid');
        }
        return this.fromScVal(as_scval);
    }
    static fromScVal(scval_data) {
        if (typeof scval_data == 'string') {
            scval_data = xdr.ScVal.fromXDR(scval_data, 'base64');
        }
        const data_entry_map = scval_data.map();
        if (data_entry_map == undefined) {
            throw Error('ReserveConfig contract data value is not a map');
        }
        let index;
        let decimals;
        let c_factor;
        let l_factor;
        let util;
        let max_util;
        let r_base;
        let r_one;
        let r_two;
        let r_three;
        let reactivity;
        for (const map_entry of data_entry_map) {
            const key = decodeEntryKey(map_entry.key());
            switch (key) {
                case 'index':
                    index = scValToNative(map_entry.val());
                    break;
                case 'decimals':
                    decimals = scValToNative(map_entry.val());
                    break;
                case 'c_factor':
                    c_factor = scValToNative(map_entry.val());
                    break;
                case 'l_factor':
                    l_factor = scValToNative(map_entry.val());
                    break;
                case 'util':
                    util = scValToNative(map_entry.val());
                    break;
                case 'max_util':
                    max_util = scValToNative(map_entry.val());
                    break;
                case 'r_base':
                    r_base = scValToNative(map_entry.val());
                    break;
                case 'r_one':
                    r_one = scValToNative(map_entry.val());
                    break;
                case 'r_two':
                    r_two = scValToNative(map_entry.val());
                    break;
                case 'r_three':
                    r_three = scValToNative(map_entry.val());
                    break;
                case 'reactivity':
                    reactivity = scValToNative(map_entry.val());
                    break;
                default:
                    throw Error(`Invalid ReserveConfig key should not contain ${key}`);
            }
        }
        if (index == undefined ||
            c_factor == undefined ||
            decimals == undefined ||
            index == undefined ||
            l_factor == undefined ||
            max_util == undefined ||
            r_one == undefined ||
            r_three == undefined ||
            r_two == undefined ||
            reactivity == undefined ||
            util == undefined) {
            throw Error('ReserveConfig scvMap value malformed');
        }
        return new ReserveConfig(index, decimals, c_factor, l_factor, util, max_util, r_base, r_one, r_two, r_three, reactivity);
    }
}
export class ReserveConfigV2 extends ReserveConfig {
    index;
    decimals;
    c_factor;
    l_factor;
    util;
    max_util;
    r_base;
    r_one;
    r_two;
    r_three;
    reactivity;
    supply_cap;
    enabled;
    constructor(index, decimals, c_factor, l_factor, util, max_util, r_base, r_one, r_two, r_three, reactivity, supply_cap, enabled) {
        super(index, decimals, c_factor, l_factor, util, max_util, r_base, r_one, r_two, r_three, reactivity);
        this.index = index;
        this.decimals = decimals;
        this.c_factor = c_factor;
        this.l_factor = l_factor;
        this.util = util;
        this.max_util = max_util;
        this.r_base = r_base;
        this.r_one = r_one;
        this.r_two = r_two;
        this.r_three = r_three;
        this.reactivity = reactivity;
        this.supply_cap = supply_cap;
        this.enabled = enabled;
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const as_scval = ledger_entry_data.contractData().val();
        if (as_scval === undefined) {
            throw Error('ReserveConfig contract data value invalid');
        }
        return this.fromScVal(as_scval);
    }
    static fromScVal(scval_data) {
        if (typeof scval_data == 'string') {
            scval_data = xdr.ScVal.fromXDR(scval_data, 'base64');
        }
        const data_entry_map = scval_data.map();
        if (data_entry_map == undefined) {
            throw Error('ReserveConfig contract data value is not a map');
        }
        let index;
        let decimals;
        let c_factor;
        let l_factor;
        let util;
        let max_util;
        let r_base;
        let r_one;
        let r_two;
        let r_three;
        let reactivity;
        let supply_cap;
        let enabled;
        for (const map_entry of data_entry_map) {
            const key = decodeEntryKey(map_entry.key());
            switch (key) {
                case 'index':
                    index = scValToNative(map_entry.val());
                    break;
                case 'decimals':
                    decimals = scValToNative(map_entry.val());
                    break;
                case 'c_factor':
                    c_factor = scValToNative(map_entry.val());
                    break;
                case 'l_factor':
                    l_factor = scValToNative(map_entry.val());
                    break;
                case 'util':
                    util = scValToNative(map_entry.val());
                    break;
                case 'max_util':
                    max_util = scValToNative(map_entry.val());
                    break;
                case 'r_base':
                    r_base = scValToNative(map_entry.val());
                    break;
                case 'r_one':
                    r_one = scValToNative(map_entry.val());
                    break;
                case 'r_two':
                    r_two = scValToNative(map_entry.val());
                    break;
                case 'r_three':
                    r_three = scValToNative(map_entry.val());
                    break;
                case 'reactivity':
                    reactivity = scValToNative(map_entry.val());
                    break;
                case 'supply_cap':
                    supply_cap = scValToNative(map_entry.val());
                    break;
                case 'enabled':
                    enabled = scValToNative(map_entry.val());
                    break;
                default:
                    throw Error(`Invalid ReserveConfig key should not contain ${key}`);
            }
        }
        if (index == undefined ||
            c_factor == undefined ||
            decimals == undefined ||
            index == undefined ||
            l_factor == undefined ||
            max_util == undefined ||
            r_one == undefined ||
            r_three == undefined ||
            r_two == undefined ||
            reactivity == undefined ||
            util == undefined ||
            supply_cap == undefined ||
            enabled == undefined) {
            throw Error('ReserveConfig scvMap value malformed');
        }
        return new ReserveConfigV2(index, decimals, c_factor, l_factor, util, max_util, r_base, r_one, r_two, r_three, reactivity, supply_cap, enabled);
    }
}
export class ReserveData {
    dRate;
    bRate;
    interestRateModifier;
    dSupply;
    bSupply;
    backstopCredit;
    lastTime;
    constructor(dRate, bRate, interestRateModifier, dSupply, bSupply, backstopCredit, lastTime) {
        this.dRate = dRate;
        this.bRate = bRate;
        this.interestRateModifier = interestRateModifier;
        this.dSupply = dSupply;
        this.bSupply = bSupply;
        this.backstopCredit = backstopCredit;
        this.lastTime = lastTime;
    }
    static async load(network, poolId, assetId) {
        const stellarRpc = new rpc.Server(network.rpc, network.opts);
        const ledger_key = this.ledgerKey(poolId, assetId);
        const result = await stellarRpc.getLedgerEntries(ledger_key);
        if (result.entries.length > 0) {
            return this.fromLedgerEntryData(result.entries[0].val);
        }
        else {
            throw Error(`Unable to find ReserveData with key: ${ledger_key.toXDR('base64')}`);
        }
    }
    static ledgerKey(poolId, assetId) {
        const res = [
            xdr.ScVal.scvSymbol('ResData'),
            Address.fromString(assetId).toScVal(),
        ];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.persistent(),
        }));
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const reserve_scval = ledger_entry_data.contractData().val();
        const reserveData = ReserveData.fromScVal(reserve_scval);
        return reserveData;
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('ReserveData contract data value is not a map');
        }
        let d_rate;
        let b_rate;
        let ir_mod;
        let d_supply;
        let b_supply;
        let backstop_credit;
        let last_time;
        for (const map_entry of data_entry_map) {
            const key = decodeEntryKey(map_entry.key());
            switch (key) {
                case 'd_rate':
                    d_rate = scValToNative(map_entry.val());
                    break;
                case 'b_rate':
                    b_rate = scValToNative(map_entry.val());
                    break;
                case 'ir_mod':
                    ir_mod = scValToNative(map_entry.val());
                    break;
                case 'd_supply':
                    d_supply = scValToNative(map_entry.val());
                    break;
                case 'b_supply':
                    b_supply = scValToNative(map_entry.val());
                    break;
                case 'backstop_credit':
                    backstop_credit = scValToNative(map_entry.val());
                    break;
                case 'last_time':
                    last_time = Number(scValToNative(map_entry.val()));
                    break;
                default:
                    throw Error(`Invalid ReserveData key should not contain ${key}`);
            }
        }
        if (d_rate == undefined ||
            b_rate == undefined ||
            ir_mod == undefined ||
            d_supply == undefined ||
            b_supply == undefined ||
            backstop_credit == undefined ||
            last_time == undefined) {
            throw Error('Error: ReserveData scvMap value malformed');
        }
        return new ReserveData(d_rate, b_rate, ir_mod, d_supply, b_supply, backstop_credit, last_time);
    }
}
export class ReserveEmissionConfig extends EmissionConfig {
    static ledgerKey(poolId, reserveIndex) {
        const res = [xdr.ScVal.scvSymbol('EmisConfig'), xdr.ScVal.scvU32(reserveIndex)];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.persistent(),
        }));
    }
}
export class ReserveEmissionData extends EmissionData {
    static ledgerKey(poolId, reserveIndex) {
        const res = [xdr.ScVal.scvSymbol('EmisData'), xdr.ScVal.scvU32(reserveIndex)];
        return xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
            contract: Address.fromString(poolId).toScAddress(),
            key: xdr.ScVal.scvVec(res),
            durability: xdr.ContractDataDurability.persistent(),
        }));
    }
}
/**
 * A object representing the reserve object on the contract
 */
export class ContractReserve {
    asset;
    config;
    data;
    scalar;
    constructor(asset, config, data, scalar) {
        this.asset = asset;
        this.config = config;
        this.data = data;
        this.scalar = scalar;
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('Reserve contract data value is not a map');
        }
        let asset;
        let config;
        let data;
        let scalar;
        for (const map_entry of data_entry_map) {
            const key = decodeEntryKey(map_entry.key());
            switch (key) {
                case 'asset':
                    asset = Address.fromScVal(map_entry.val()).toString();
                    break;
                case 'config':
                    config = ReserveConfigV2.fromScVal(map_entry.val());
                    break;
                case 'data':
                    data = ReserveData.fromScVal(map_entry.val());
                    break;
                case 'scalar':
                    scalar = scValToNative(map_entry.val());
                    break;
                default:
                    throw Error(`Invalid Reserve key: should not contain ${key}`);
            }
        }
        if (asset == undefined || config == undefined || data == undefined) {
            throw Error('Invalid Reserve: missing fields');
        }
        return new ContractReserve(asset, config, data, scalar);
    }
}
/**
 * Decode the reserve token type (0 = dToken, 1 = bToken) from a Reserve Emission LedgerEntryData
 */
export function getEmissionIndex(ledger_entry_data) {
    if (typeof ledger_entry_data == 'string') {
        ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
    }
    const ledgerEntryKey = ledger_entry_data.contractData()?.key()?.vec()?.at(1)?.u32();
    if (ledgerEntryKey == undefined) {
        throw new Error('Unable to parse emission entry token type');
    }
    return ledgerEntryKey;
}
export function getReserveId(ledger_entry_data) {
    if (typeof ledger_entry_data == 'string') {
        ledger_entry_data = xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
    }
    const ledgerEntryKey = Address.fromScAddress(ledger_entry_data.contractData()?.key()?.vec()?.at(1)?.address()).toString();
    if (ledgerEntryKey == undefined) {
        throw new Error('Unable to parse asset id from ledger entry data');
    }
    return ledgerEntryKey;
}
