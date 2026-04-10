"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolUser = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const ledger_entry_helper_js_1 = require("../ledger_entry_helper.js");
const user_types_js_1 = require("./user_types.js");
class PoolUser {
    userId;
    positions;
    emissions;
    constructor(userId, positions, emissions) {
        this.userId = userId;
        this.positions = positions;
        this.emissions = emissions;
    }
    static async load(network, poolId, pool, userId) {
        const ledgerKeys = [user_types_js_1.Positions.ledgerKey(poolId, userId)];
        for (const reserve of pool.reserves.values()) {
            ledgerKeys.push(user_types_js_1.PoolUserEmissionData.ledgerKey(poolId, userId, reserve.getDTokenEmissionIndex()));
            ledgerKeys.push(user_types_js_1.PoolUserEmissionData.ledgerKey(poolId, userId, reserve.getBTokenEmissionIndex()));
        }
        const stellarRpc = new stellar_sdk_1.rpc.Server(network.rpc, network.opts);
        const ledgerEntries = await stellarRpc.getLedgerEntries(...ledgerKeys);
        let positions = new user_types_js_1.Positions(new Map(), new Map(), new Map());
        const emissions = new Map();
        for (const entry of ledgerEntries.entries) {
            const ledgerEntry = entry.val;
            const key = (0, ledger_entry_helper_js_1.decodeEntryKey)(ledgerEntry.contractData().key());
            switch (key) {
                case 'Positions':
                    positions = user_types_js_1.Positions.fromLedgerEntryData(ledgerEntry);
                    break;
                case `UserEmis`: {
                    const reserve_emis_id = user_types_js_1.PoolUserEmissionData.getEmissionIndexFromLedgerEntryData(ledgerEntry);
                    const reserve_data = user_types_js_1.PoolUserEmissionData.fromLedgerEntryData(ledgerEntry);
                    emissions.set(reserve_emis_id, reserve_data);
                    break;
                }
                default:
                    throw Error(`Invalid reserve key: should not contain ${key}`);
            }
        }
        return new PoolUser(userId, positions, emissions);
    }
    /**
     * Get a non-collaterized supply position in bTokens
     * @param reserve
     * @returns
     */
    getSupplyBTokens(reserve) {
        const supply = this.positions.supply.get(reserve.config.index);
        if (supply == undefined) {
            return BigInt(0);
        }
        return supply;
    }
    /**
     * Get the non-collaterized supply position for a given reserve
     * @param reserve - The reserve
     * @returns The supply, or 0 if the position does not have any supply
     */
    getSupply(reserve) {
        const supply = this.positions.supply.get(reserve.config.index);
        return reserve.toAssetFromBToken(supply);
    }
    /**
     * Get the non-collaterized supply position for a given reserve as a floating point number
     * @param reserve - The reserve
     * @returns The supply, or 0 if the position does not have any supply
     */
    getSupplyFloat(reserve) {
        const supply = this.positions.supply.get(reserve.config.index);
        return reserve.toAssetFromBTokenFloat(supply);
    }
    /**
     * Get the collaterized supply position in bTokens
     * @param reserve
     * @returns
     */
    getCollateralBTokens(reserve) {
        const collateral = this.positions.collateral.get(reserve.config.index);
        if (collateral == undefined) {
            return BigInt(0);
        }
        return collateral;
    }
    /**
     * Get the collateral position for a given reserve
     * @param reserve - The reserve
     * @returns The collateral, or 0 if the position does not have any collateral
     */
    getCollateral(reserve) {
        const collateral = this.positions.collateral.get(reserve.config.index);
        return reserve.toAssetFromBToken(collateral);
    }
    /**
     * Get the collateral position for a given reserve as a floating point number
     * @param reserve - The reserve
     * @returns The collateral, or 0 if the position does not have any collateral
     */
    getCollateralFloat(reserve) {
        const collateral = this.positions.collateral.get(reserve.config.index);
        return reserve.toAssetFromBTokenFloat(collateral);
    }
    /**
     * Get the liability position in dTokens
     * @param reserve
     * @returns
     */
    getLiabilityDTokens(reserve) {
        const liability = this.positions.liabilities.get(reserve.config.index);
        if (liability == undefined) {
            return BigInt(0);
        }
        return liability;
    }
    /**
     * Get the liabilities position for a given reserve
     * @param reserve - The reserve
     * @returns The liabilities, or 0 if the position does not have any liabilities
     */
    getLiabilities(reserve) {
        const liability = this.positions.liabilities.get(reserve.config.index);
        return reserve.toAssetFromDToken(liability);
    }
    /**
     * Get the liabilities position for a given reserve as a floating point number
     * @param reserve - The reserve
     * @returns The liabilities, or 0 if the position does not have any liabilities
     */
    getLiabilitiesFloat(reserve) {
        const liability = this.positions.liabilities.get(reserve.config.index);
        return reserve.toAssetFromDTokenFloat(liability);
    }
    /**
     * Estimate the total emissions for the user as a floating point number
     * @returns The estimated emissions
     */
    estimateEmissions(reserves) {
        let totalEmissions = 0;
        const claimedTokens = [];
        for (const reserve of reserves) {
            // handle dToken emissions
            const d_token_id = reserve.getDTokenEmissionIndex();
            const d_token_data = this.emissions.get(d_token_id);
            const d_token_position = this.getLiabilityDTokens(reserve);
            if (reserve.borrowEmissions && (d_token_data || d_token_position > BigInt(0))) {
                let dTokenAccrual = 0;
                if (d_token_data) {
                    dTokenAccrual = d_token_data.estimateAccrual(reserve.borrowEmissions, reserve.config.decimals, d_token_position);
                }
                else if (d_token_position > BigInt(0)) {
                    // emissions began after user position was created, accrue all emissions
                    const temp_d_token_data = new user_types_js_1.PoolUserEmissionData(BigInt(0), BigInt(0));
                    dTokenAccrual = temp_d_token_data.estimateAccrual(reserve.borrowEmissions, reserve.config.decimals, d_token_position);
                }
                if (dTokenAccrual > 0) {
                    claimedTokens.push(d_token_id);
                    totalEmissions += dTokenAccrual;
                }
            }
            // handle bToken emissions
            const b_token_id = reserve.getBTokenEmissionIndex();
            const b_token_data = this.emissions.get(b_token_id);
            const b_token_position = this.getSupplyBTokens(reserve) + this.getCollateralBTokens(reserve);
            if (reserve.supplyEmissions && (b_token_data || b_token_position > BigInt(0))) {
                let bTokenAccrual = 0;
                if (b_token_data) {
                    bTokenAccrual = b_token_data.estimateAccrual(reserve.supplyEmissions, reserve.config.decimals, b_token_position);
                }
                else if (b_token_position > BigInt(0)) {
                    // emissions began after user position was created, accrue all emissions
                    const temp_b_token_data = new user_types_js_1.PoolUserEmissionData(BigInt(0), BigInt(0));
                    bTokenAccrual = temp_b_token_data.estimateAccrual(reserve.supplyEmissions, reserve.config.decimals, b_token_position);
                }
                if (bTokenAccrual > 0) {
                    claimedTokens.push(b_token_id);
                    totalEmissions += bTokenAccrual;
                }
            }
        }
        return {
            emissions: totalEmissions,
            claimedTokens,
        };
    }
}
exports.PoolUser = PoolUser;
