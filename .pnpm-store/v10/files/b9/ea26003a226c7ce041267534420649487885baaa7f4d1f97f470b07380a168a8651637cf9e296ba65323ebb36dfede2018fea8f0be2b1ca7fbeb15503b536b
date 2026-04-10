"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackstopPoolUserEst = void 0;
const emissions_js_1 = require("../emissions.js");
class BackstopPoolUserEst {
    /**
     * The estimated LP tokens the user has deposited
     */
    tokens;
    /**
     * The estimated BLND tokens of the user's deposited LP tokens
     */
    blnd;
    /**
     * The estimated USDC tokens of the user's deposited LP tokens
     */
    usdc;
    /**
     * The estimated spot value of the user's deposited LP tokens
     */
    totalSpotValue;
    /**
     * The estimated number of unlocked LP tokens that have been queued
     */
    totalUnlockedQ4W;
    /**
     * The array of queued withdrawals in (token amounts)
     */
    q4w;
    /**
     * The estimated total LP tokens queued for withdrawal
     */
    totalQ4W;
    /**
     * The estimated emissions of the user
     */
    emissions;
    constructor(tokens, blnd, usdc, totalSpotValue, q4w, totalUnlockedQ4W, totalQ4W, emissions) {
        this.tokens = tokens;
        this.blnd = blnd;
        this.usdc = usdc;
        this.totalSpotValue = totalSpotValue;
        this.totalUnlockedQ4W = totalUnlockedQ4W;
        this.q4w = q4w;
        this.totalQ4W = totalQ4W;
        this.emissions = emissions;
    }
    static build(backstop, pool, user) {
        const tokens = pool.sharesToBackstopTokensFloat(user.balance.shares);
        const blnd = tokens * backstop.backstopToken.blndPerLpToken;
        const usdc = tokens * backstop.backstopToken.usdcPerLpToken;
        const totalSpotValue = tokens * backstop.backstopToken.lpTokenPrice;
        const totalUnlockedQ4W = pool.sharesToBackstopTokensFloat(user.balance.unlockedQ4W);
        let totalQ4W = 0;
        const q4w = user.balance.q4w.map((q4w) => {
            const amount = pool.sharesToBackstopTokensFloat(q4w.amount);
            totalQ4W += amount;
            return { amount, exp: Number(q4w.exp) };
        });
        let emissions = 0;
        if (pool.emissions) {
            if (user.emissions === undefined) {
                if (user.balance.shares > 0) {
                    // emissions started after the user deposited
                    const empty_emission_data = new emissions_js_1.UserEmissions(BigInt(0), BigInt(0));
                    emissions = empty_emission_data.estimateAccrual(pool.emissions, 7, user.balance.shares);
                }
            }
            else {
                emissions = user.emissions.estimateAccrual(pool.emissions, 7, user.balance.shares);
            }
        }
        return new BackstopPoolUserEst(tokens, blnd, usdc, totalSpotValue, q4w, totalUnlockedQ4W, totalQ4W, emissions);
    }
}
exports.BackstopPoolUserEst = BackstopPoolUserEst;
