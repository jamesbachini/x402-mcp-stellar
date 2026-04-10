import { toFloat } from '../math.js';
export class BackstopPoolEst {
    blnd;
    usdc;
    totalSpotValue;
    q4wPercentage;
    constructor(blnd, usdc, totalSpotValue, q4wPercentage) {
        this.blnd = blnd;
        this.usdc = usdc;
        this.totalSpotValue = totalSpotValue;
        this.q4wPercentage = q4wPercentage;
    }
    static build(backstopToken, poolBalance) {
        const tokens_float = toFloat(poolBalance.tokens, 7);
        const blnd = tokens_float * backstopToken.blndPerLpToken;
        const usdc = tokens_float * backstopToken.usdcPerLpToken;
        const totalSpotValue = tokens_float * backstopToken.lpTokenPrice;
        const q4w_percentage = Number(poolBalance.q4w) / Number(poolBalance.shares);
        return new BackstopPoolEst(blnd, usdc, totalSpotValue, q4w_percentage);
    }
}
