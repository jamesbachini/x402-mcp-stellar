"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackstopEmissionData = exports.BackstopEmissionConfig = exports.PoolBalance = exports.BackstopPoolV2 = exports.BackstopPoolV1 = exports.BackstopPool = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const emissions_js_1 = require("../emissions.js");
const index_js_1 = require("../index.js");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
class BackstopPool {
    poolBalance;
    emissions;
    latestLedger;
    constructor(poolBalance, emissions, latestLedger) {
        this.poolBalance = poolBalance;
        this.emissions = emissions;
        this.latestLedger = latestLedger;
    }
    /**
     * Fetch the emission per year per non-Q4W backstop token
     * @returns The emission per year per backstop token as a float
     */
    emissionPerYearPerBackstopToken() {
        if (this.emissions == undefined) {
            return 0;
        }
        const tokensNotInQ4w = this.sharesToBackstopTokens(this.poolBalance.shares - this.poolBalance.q4w);
        return this.emissions.emissionsPerYearPerToken(tokensNotInQ4w, 7);
    }
    /**
     * Convert backstop tokens to shares
     * @param backstopTokens - The number of backstop tokens to convert
     * @returns - The number of shares as a fixed point number
     */
    backstopTokensToShares(backstopTokens) {
        if (typeof backstopTokens === 'number') {
            backstopTokens = index_js_1.FixedMath.toFixed(backstopTokens, 7);
        }
        if (this.poolBalance.shares === BigInt(0)) {
            return backstopTokens;
        }
        return index_js_1.FixedMath.mulFloor(backstopTokens, this.poolBalance.shares, this.poolBalance.tokens);
    }
    /**
     * Convert shares to backstop tokens
     * @param shares - The number of shares to convert
     * @returns - The number of backstop tokens as a fixed point number
     */
    sharesToBackstopTokens(shares) {
        if (this.poolBalance.shares === BigInt(0)) {
            return shares;
        }
        return index_js_1.FixedMath.mulFloor(shares, this.poolBalance.tokens, this.poolBalance.shares);
    }
    /**
     * Convert shares to backstop tokens
     * @param shares - The number of shares to convert
     * @returns - The number of backstop tokens as a floating point number
     */
    sharesToBackstopTokensFloat(shares) {
        return index_js_1.FixedMath.toFloat(this.sharesToBackstopTokens(shares), 7);
    }
}
exports.BackstopPool = BackstopPool;
class BackstopPoolV1 extends BackstopPool {
    poolBalance;
    toGulpEmissions;
    emissions;
    latestLedger;
    constructor(poolBalance, toGulpEmissions, emissions, latestLedger) {
        super(poolBalance, emissions, latestLedger);
        this.poolBalance = poolBalance;
        this.toGulpEmissions = toGulpEmissions;
        this.emissions = emissions;
        this.latestLedger = latestLedger;
    }
    static async load(network, backstopId, poolId, timestamp) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const poolBalanceDataKey = PoolBalance.ledgerKey(backstopId, poolId);
        const poolEmisDataKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('PoolEmis'),
                stellar_sdk_1.Address.fromString(poolId).toScVal(),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        const backstopPoolDataEntries = await stellarRpc.getLedgerEntries(poolBalanceDataKey, poolEmisDataKey, BackstopEmissionConfig.ledgerKey(backstopId, poolId), BackstopEmissionData.ledgerKey(backstopId, poolId));
        let emission_config;
        let emission_data;
        let poolBalance = new PoolBalance(BigInt(0), BigInt(0), BigInt(0));
        let toGulpEmissions = BigInt(0);
        for (const entry of backstopPoolDataEntries.entries) {
            const ledgerData = entry.val;
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.contractData().key());
            switch (key) {
                case 'PoolBalance': {
                    poolBalance = PoolBalance.fromLedgerEntryData(ledgerData);
                    break;
                }
                case 'PoolEmis':
                    toGulpEmissions = (0, stellar_sdk_1.scValToNative)(ledgerData.contractData().val());
                    break;
                case 'BEmisCfg':
                    emission_config = emissions_js_1.EmissionConfig.fromLedgerEntryData(ledgerData);
                    break;
                case 'BEmisData':
                    emission_data = emissions_js_1.EmissionData.fromLedgerEntryData(ledgerData);
                    break;
                default:
                    throw new Error(`Invalid backstop pool key: should not contain ${key}`);
            }
        }
        let emissions;
        if (emission_config != undefined && emission_data != undefined) {
            emissions = new emissions_js_1.EmissionsV1(emission_config, emission_data, backstopPoolDataEntries.latestLedger);
            emissions.accrue(poolBalance.shares - poolBalance.q4w, 7, timestamp);
        }
        return new BackstopPoolV1(poolBalance, toGulpEmissions, emissions, backstopPoolDataEntries.latestLedger);
    }
}
exports.BackstopPoolV1 = BackstopPoolV1;
class BackstopPoolV2 extends BackstopPool {
    poolBalance;
    emissions;
    constructor(poolBalance, emissions, latestLedger) {
        super(poolBalance, emissions, latestLedger);
        this.poolBalance = poolBalance;
        this.emissions = emissions;
    }
    static async load(network, backstopId, poolId, timestamp) {
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const poolBalanceDataKey = PoolBalance.ledgerKey(backstopId, poolId);
        const poolEmisDataKey = stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('PoolEmis'),
                stellar_sdk_1.Address.fromString(poolId).toScVal(),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
        const backstopPoolDataEntries = await stellarRpc.getLedgerEntries(poolBalanceDataKey, poolEmisDataKey, BackstopEmissionData.ledgerKey(backstopId, poolId));
        let emission_data;
        let poolBalance = new PoolBalance(BigInt(0), BigInt(0), BigInt(0));
        for (const entry of backstopPoolDataEntries.entries) {
            const ledgerData = entry.val;
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerData.contractData().key());
            switch (key) {
                case 'PoolBalance': {
                    poolBalance = PoolBalance.fromLedgerEntryData(ledgerData);
                    break;
                }
                case 'BEmisData':
                    emission_data = emissions_js_1.EmissionDataV2.fromLedgerEntryData(ledgerData);
                    break;
                default:
                    throw new Error(`Invalid backstop pool key: should not contain ${key}`);
            }
        }
        let emissions;
        if (emission_data != undefined) {
            emissions = new emissions_js_1.EmissionsV2(emission_data, backstopPoolDataEntries.latestLedger);
            emissions.accrue(poolBalance.shares - poolBalance.q4w, 7, timestamp);
        }
        return new BackstopPoolV2(poolBalance, emissions, backstopPoolDataEntries.latestLedger);
    }
}
exports.BackstopPoolV2 = BackstopPoolV2;
class PoolBalance {
    shares;
    tokens;
    q4w;
    constructor(shares, tokens, q4w) {
        this.shares = shares;
        this.tokens = tokens;
        this.q4w = q4w;
    }
    static ledgerKey(backstopId, poolId) {
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('PoolBalance'),
                stellar_sdk_1.Address.fromString(poolId).toScVal(),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
    static fromLedgerEntryData(ledger_entry_data) {
        if (typeof ledger_entry_data == 'string') {
            ledger_entry_data = stellar_sdk_1.xdr.LedgerEntryData.fromXDR(ledger_entry_data, 'base64');
        }
        const data_entry_map = ledger_entry_data.contractData().val().map();
        if (data_entry_map == undefined) {
            throw Error('PoolBalance contract data value is not a map');
        }
        let shares;
        let tokens;
        let q4w;
        for (const map_entry of data_entry_map) {
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(map_entry.key());
            switch (key) {
                case 'shares':
                    shares = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'tokens':
                    tokens = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                case 'q4w':
                    q4w = (0, stellar_sdk_1.scValToNative)(map_entry.val());
                    break;
                default:
                    throw Error(`Invalid PoolBalance key: should not contain ${key}`);
            }
        }
        if (shares == undefined || tokens == undefined || q4w == undefined) {
            throw Error(`Malformed PoolBalance scvMap `);
        }
        return new PoolBalance(shares, tokens, q4w);
    }
}
exports.PoolBalance = PoolBalance;
class BackstopEmissionConfig extends emissions_js_1.EmissionConfig {
    static ledgerKey(backstopId, poolId) {
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('BEmisCfg'),
                stellar_sdk_1.Address.fromString(poolId).toScVal(),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
}
exports.BackstopEmissionConfig = BackstopEmissionConfig;
class BackstopEmissionData extends emissions_js_1.EmissionData {
    static ledgerKey(backstopId, poolId) {
        return stellar_sdk_1.xdr.LedgerKey.contractData(new stellar_sdk_1.xdr.LedgerKeyContractData({
            contract: stellar_sdk_1.Address.fromString(backstopId).toScAddress(),
            key: stellar_sdk_1.xdr.ScVal.scvVec([
                stellar_sdk_1.xdr.ScVal.scvSymbol('BEmisData'),
                stellar_sdk_1.Address.fromString(poolId).toScVal(),
            ]),
            durability: stellar_sdk_1.xdr.ContractDataDurability.persistent(),
        }));
    }
}
exports.BackstopEmissionData = BackstopEmissionData;
