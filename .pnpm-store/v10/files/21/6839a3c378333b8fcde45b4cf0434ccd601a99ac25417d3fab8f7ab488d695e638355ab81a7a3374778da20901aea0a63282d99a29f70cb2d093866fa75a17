import { BackstopToken } from '../index.js';
import { BackstopConfig } from './backstop_config.js';
/**
 * Manage ledger data for the Blend backstop contract
 */
export class Backstop {
    id;
    config;
    backstopToken;
    latestLedger;
    timestamp;
    constructor(id, config, backstopToken, latestLedger, timestamp) {
        this.id = id;
        this.config = config;
        this.backstopToken = backstopToken;
        this.latestLedger = latestLedger;
        this.timestamp = timestamp;
    }
    /**
     * Load the backstop data from the ledger
     * @param network - The network information to load the backstop from
     * @param id - The contract address of the backstop
     * @returns - The backstop object
     */
    static async load(network, id) {
        const timestamp = Math.floor(Date.now() / 1000);
        const config = await BackstopConfig.load(network, id);
        const backstop_token = await BackstopToken.load(network, config.backstopTkn, config.blndTkn, config.usdcTkn);
        return new Backstop(id, config, backstop_token, config.latestLedger, timestamp);
    }
}
