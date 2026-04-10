import { BackstopToken, Network } from '../index.js';
import { BackstopConfig } from './backstop_config.js';
/**
 * Manage ledger data for the Blend backstop contract
 */
export declare class Backstop {
    id: string;
    config: BackstopConfig;
    backstopToken: BackstopToken;
    latestLedger: number;
    timestamp: number;
    constructor(id: string, config: BackstopConfig, backstopToken: BackstopToken, latestLedger: number, timestamp: number);
    /**
     * Load the backstop data from the ledger
     * @param network - The network information to load the backstop from
     * @param id - The contract address of the backstop
     * @returns - The backstop object
     */
    static load(network: Network, id: string): Promise<Backstop>;
}
