"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolEstimate = void 0;
const math_js_1 = require("../math.js");
/**
 * Aggregate floating point data for a pool. These numbers are not guaranteed to be exact, but
 * are suitable for display purposes.
 */
class PoolEstimate {
    totalSupply;
    totalBorrowed;
    avgBorrowApy;
    constructor(
    /**
     * The total value of all tokens supplied to the pool in the pool's oracle denomination
     */
    totalSupply, 
    /**
     * The total value of all tokens borrowed from the pool in the pool's oracle denomination
     */
    totalBorrowed, 
    /**
     * The average APY accrued by all borrowed tokens
     */
    avgBorrowApy) {
        this.totalSupply = totalSupply;
        this.totalBorrowed = totalBorrowed;
        this.avgBorrowApy = avgBorrowApy;
    }
    static build(reserves, poolOracle) {
        let totalSupply = 0;
        let totalBorrowed = 0;
        let totalInterestInYear = 0;
        for (const reserve of reserves.values()) {
            const oraclePrice = poolOracle.getPriceFloat(reserve.assetId);
            if (oraclePrice !== undefined) {
                totalSupply += (0, math_js_1.toFloat)(reserve.totalSupply(), reserve.config.decimals) * oraclePrice;
                const reserveLiabilitiesBase = (0, math_js_1.toFloat)(reserve.totalLiabilities(), reserve.config.decimals) * oraclePrice;
                totalBorrowed += reserveLiabilitiesBase;
                totalInterestInYear += reserveLiabilitiesBase * reserve.estBorrowApy;
            }
        }
        const avgBorrowApy = totalBorrowed != 0 ? totalInterestInYear / totalBorrowed : 0;
        return new PoolEstimate(totalSupply, totalBorrowed, avgBorrowApy);
    }
}
exports.PoolEstimate = PoolEstimate;
