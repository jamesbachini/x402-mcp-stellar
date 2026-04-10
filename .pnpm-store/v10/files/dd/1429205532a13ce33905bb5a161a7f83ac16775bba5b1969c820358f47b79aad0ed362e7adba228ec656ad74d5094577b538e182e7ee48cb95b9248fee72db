import { toFloat } from '../math.js';
import { getOracleDecimals, getOraclePrice } from '../oracle.js';
export class PoolOracle {
    oracleId;
    prices;
    decimals;
    latestLedger;
    constructor(oracleId, prices, decimals, latestLedger) {
        this.oracleId = oracleId;
        this.prices = prices;
        this.decimals = decimals;
        this.latestLedger = latestLedger;
    }
    static async load(network, oracleId, assets) {
        const decimalPromise = getOracleDecimals(network, oracleId);
        const pricesPromise = assets.map((asset) => getOraclePrice(network, oracleId, asset));
        const [decimalsResult, pricesResult] = await Promise.all([
            decimalPromise,
            Promise.all(pricesPromise),
        ]);
        if (pricesResult.length !== assets.length) {
            throw Error('Failed to load all prices');
        }
        const prices = new Map();
        for (let i = 0; i < assets.length; i++) {
            prices.set(assets[i], pricesResult[i]);
        }
        return new PoolOracle(oracleId, prices, decimalsResult.decimals, decimalsResult.latestLedger);
    }
    /**
     * Get the price of an asset as a fixed point number with the oracle's decimals
     * @param assetId - The asset to get the price of
     * @returns The price as a fixed point number, or undefined if no price is available
     */
    getPrice(assetId) {
        return this.prices.get(assetId)?.price;
    }
    /**
     * Get the price of an asset as a floating point number
     * @param assetId - The asset to get the price of
     * @returns The price as a floating point number, or undefined if no price is available
     */
    getPriceFloat(assetId) {
        const price = this.getPrice(assetId);
        if (price) {
            return toFloat(price, this.decimals);
        }
        else {
            return undefined;
        }
    }
}
