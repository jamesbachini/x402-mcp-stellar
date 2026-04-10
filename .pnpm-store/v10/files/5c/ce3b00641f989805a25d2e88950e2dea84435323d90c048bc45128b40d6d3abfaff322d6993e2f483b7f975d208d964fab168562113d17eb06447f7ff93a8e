"use strict";
//! Base classes for emission data
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmissions = exports.EmissionDataV2 = exports.EmissionData = exports.EmissionConfig = exports.EmissionsV2 = exports.EmissionsV1 = exports.Emissions = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("./ledger_entry_helper.js");
const FixedMath = require("./math.js");
/********** Emission Source **********/
class Emissions {
    expiration;
    eps;
    index;
    lastTime;
    latestLedger;
    constructor(expiration, eps, index, lastTime, latestLedger) {
        this.expiration = expiration;
        this.eps = eps;
        this.index = index;
        this.lastTime = lastTime;
        this.latestLedger = latestLedger;
    }
    /**
     * Accrue emissions to the provided timestamp
     * @param supply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to
     * @param timestamp - The timestamp to accrue to. Defaults to the current time if not provided
     */
    accrue(supply, decimals, timestamp) {
        if (timestamp == undefined) {
            timestamp = Math.floor(Date.now() / 1000);
        }
        if (this.lastTime >= this.expiration ||
            this.lastTime >= timestamp ||
            this.eps === BigInt(0) ||
            supply === BigInt(0)) {
            return;
        }
        const ledgerTimestamp = timestamp > this.expiration ? this.expiration : timestamp;
        const additionalIndex = FixedMath.divFloor(BigInt(ledgerTimestamp - this.lastTime) * this.eps, supply, FixedMath.toFixed(1, decimals));
        this.index += additionalIndex;
    }
    /**
     * Calculate the emissions per year per token as a float.
     * @param supply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to. Defaults to 7.
     * @returns The emissions per year per token as a float
     */
    emissionsPerYearPerToken(supply, decimals) {
        if (this.expiration <= Math.floor(Date.now() / 1000)) {
            return 0;
        }
        const supplyFloat = FixedMath.toFloat(supply, decimals);
        if (supplyFloat === 0) {
            return 0;
        }
        const totalEmissions = FixedMath.toFloat(this.eps, this.epsDecimals) * 31536000;
        return totalEmissions / supplyFloat;
    }
}
exports.Emissions = Emissions;
class EmissionsV1 extends Emissions {
    constructor(config, data, latestLedger) {
        super(config.expiration, config.eps, data.index, data.lastTime, latestLedger);
    }
    epsDecimals = 7;
    /**
     * Fetch the emissions for a token.
     * @param network - The network to load the emissions from
     * @param configLedgerKey - The LedgerLey for the config
     * @param dataLedgerkey - The LedgerKey for the data
     * @param totalSupply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to
     * @param timestamp - The timestamp to accrue to. Defaults to the current time if not provided
     * @returns - The emissions if they exist, or undefined
     * @throws - If the emission data exists but is malformed
     */
    static async load(network, configLedgerKey, dataLedgerkey, totalSupply, decimals, timestamp) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const entriesResponse = await stellarRpc.getLedgerEntries(configLedgerKey, dataLedgerkey);
        if (entriesResponse.entries.length == 2) {
            let emissionConfig = undefined;
            let emissionData = undefined;
            for (const entry of entriesResponse.entries) {
                const ledgerData = entry.val;
                const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.contractData().key());
                switch (key) {
                    case 'EmisConfig':
                    case 'BEmisCfg':
                        emissionConfig = EmissionConfig.fromLedgerEntryData(ledgerData);
                        break;
                    case 'EmisData':
                    case 'BEmisData':
                        emissionData = EmissionData.fromLedgerEntryData(ledgerData);
                        break;
                    default:
                        throw Error(`Invalid emission key: should not contain ${key}`);
                }
            }
            if (emissionData == undefined || emissionConfig == undefined) {
                throw new Error(`Unable to load emissions`);
            }
            const emissions = new EmissionsV1(emissionConfig, emissionData, entriesResponse.latestLedger);
            emissions.accrue(totalSupply, decimals, timestamp);
            return emissions;
        }
        return undefined;
    }
}
exports.EmissionsV1 = EmissionsV1;
/**
 * Base class for emission data
 *
 * @property expiration - The timestamp the emissions expire
 * @property eps - The emissions per second
 * @property index - The last emission index
 * @property lastTime - The last time the emissions were updated
 */
class EmissionsV2 extends Emissions {
    data;
    latestLedger;
    constructor(data, latestLedger) {
        super(data.expiration, data.eps, data.index, data.lastTime, latestLedger);
        this.data = data;
        this.latestLedger = latestLedger;
    }
    epsDecimals = 14;
    /**
     * Fetch the emissions for a token.
     * @param network - The network to load the emissions from
     * @param configLedgerKey - The LedgerLey for the config
     * @param dataLedgerkey - The LedgerKey for the data
     * @param totalSupply - The total supply of the token being emitted to
     * @param decimals - The decimals of the token being emitted to
     * @param timestamp - The timestamp to accrue to. Defaults to the current time if not provided
     * @returns - The emissions if they exist, or undefined
     * @throws - If the emission data exists but is malformed
     */
    static async load(network, dataLedgerkey, totalSupply, decimals, timestamp) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const entriesResponse = await stellarRpc.getLedgerEntries(dataLedgerkey);
        if (entriesResponse.entries.length == 1) {
            let emissionData = undefined;
            for (const entry of entriesResponse.entries) {
                const ledgerData = entry.val;
                const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.contractData().key());
                switch (key) {
                    case 'EmisData':
                    case 'BEmisData':
                        emissionData = EmissionDataV2.fromLedgerEntryData(ledgerData);
                        break;
                    default:
                        throw Error(`Invalid emission key: should not contain ${key}`);
                }
            }
            if (emissionData == undefined) {
                throw new Error(`Unable to load emissions`);
            }
            const emissions = new EmissionsV2(emissionData, entriesResponse.latestLedger);
            emissions.accrue(totalSupply, decimals, timestamp);
            return emissions;
        }
        return undefined;
    }
}
exports.EmissionsV2 = EmissionsV2;
/**
 * The emission configuration
 *
 * @property eps - The emission per second
 * @property expiration - The expiration time of the emission
 */
class EmissionConfig {
    eps;
    expiration;
    constructor(eps, expiration) {
        this.eps = eps;
        this.expiration = expiration;
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const data_entry_map = ledger_entry_data.contractData().val().map();
        if (data_entry_map == undefined) {
            throw Error('EmissionConfig contract data value is not a map');
        }
        let expiration;
        let eps;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'expiration':
                    expiration = Number((0, stellar_sdk_1.scValToNative)(map_entry.val()));
                    break;
                case 'eps':
                    eps = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                default:
                    throw Error(`EmissionConfig invalid key: should not contain ${key}`);
            }
        }
        if (eps == undefined || expiration == undefined) {
            throw Error('EmissionConfig scvMap value malformed');
        }
        return new EmissionConfig(BigInt(eps), expiration);
    }
}
exports.EmissionConfig = EmissionConfig;
class EmissionData {
    index;
    lastTime;
    constructor(index, lastTime) {
        this.index = index;
        this.lastTime = lastTime;
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const data_entry_map = ledger_entry_data.contractData().val().map();
        if (data_entry_map == undefined) {
            throw Error('EmissionData contract data value is not a map');
        }
        let index;
        let last_time;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'index':
                    index = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'last_time':
                    last_time = Number((0, stellar_sdk_1.scValToNative)(map_entry.val()));
                    break;
                default:
                    throw new Error(`EmissionData invalid key: should not contain ${key}`);
            }
        }
        if (index == undefined || last_time == undefined) {
            throw new Error(`ReserveEmissionData scvMap value malformed`);
        }
        return new EmissionData(index, last_time);
    }
}
exports.EmissionData = EmissionData;
class EmissionDataV2 extends EmissionData {
    expiration;
    eps;
    index;
    lastTime;
    constructor(expiration, eps, index, lastTime) {
        super(index, lastTime);
        this.expiration = expiration;
        this.eps = eps;
        this.index = index;
        this.lastTime = lastTime;
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const data_entry_map = ledger_entry_data.contractData().val().map();
        if (data_entry_map == undefined) {
            throw Error('EmissionData contract data value is not a map');
        }
        let expiration;
        let eps;
        let index;
        let last_time;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'expiration':
                    expiration = Number((0, stellar_sdk_1.scValToNative)(map_entry.val()));
                    break;
                case 'eps':
                    eps = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'index':
                    index = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'last_time':
                    last_time = Number((0, stellar_sdk_1.scValToNative)(map_entry.val()));
                    break;
                default:
                    throw new Error(`EmissionData invalid key: should not contain ${key}`);
            }
        }
        if (index == undefined ||
            last_time == undefined ||
            eps == undefined ||
            expiration == undefined) {
            throw new Error(`ReserveEmissionData scvMap value malformed`);
        }
        return new EmissionDataV2(expiration, eps, index, last_time);
    }
}
exports.EmissionDataV2 = EmissionDataV2;
/**
 * Emission data for a user. Assumes the emitted token is tracked in 7 decimals.
 *
 * @property index - The last emission index the user accrued to
 * @property accrued - The accrued emissions the user has
 */
class UserEmissions {
    index;
    accrued;
    constructor(index, accrued) {
        this.index = index;
        this.accrued = accrued;
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const scval = ledger_entry_data.contractData().val();
        const userEmissions = UserEmissions.fromScVal(scval);
        return userEmissions;
    }
    static fromScVal(sc_val) {
        if (typeof sc_val == 'string') {
            sc_val = stellar_sdk_1.xdr.ScVal.fromXDR(sc_val, 'base64');
        }
        const data_entry_map = sc_val.map();
        if (data_entry_map == undefined) {
            throw Error('UserEmissions contract data value is not a map');
        }
        let accrued;
        let index;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'accrued':
                    accrued = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'index':
                    index = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                default:
                    throw Error(`UserEmissions invalid key: should not contain ${key}`);
            }
        }
        if (accrued == undefined || index == undefined) {
            throw Error('scvMap value malformed');
        }
        return new UserEmissions(index, accrued);
    }
    /**
     * Estimate the accrued emission to a given timestamp
     * @param emissions - The emissions data for a token
     * @param balance - The balance of the user of the token being emitted to (fixed point)
     * @returns The estimated accrued emissions in fixed point
     */
    estimateAccrual(emissions, decimals, balance) {
        const additional_index = emissions.index - this.index;
        const toAccrue = FixedMath.mulFloor(balance, additional_index, FixedMath.toFixed(1, emissions.epsDecimals));
        return FixedMath.toFloat(toAccrue + this.accrued, decimals);
    }
}
exports.UserEmissions = UserEmissions;
