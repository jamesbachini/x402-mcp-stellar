"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backstop = void 0;
const index_js_1 = require("../index.js");
const backstop_config_js_1 = require("./backstop_config.js");
/**
 * Manage ledger data for the Blend backstop contract
 */
class Backstop {
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
        const config = await backstop_config_js_1.BackstopConfig.load(network, id);
        const backstop_token = await index_js_1.BackstopToken.load(network, config.backstopTkn, config.blndTkn, config.usdcTkn);
        return new Backstop(id, config, backstop_token, config.latestLedger, timestamp);
    }
}
exports.Backstop = Backstop;
