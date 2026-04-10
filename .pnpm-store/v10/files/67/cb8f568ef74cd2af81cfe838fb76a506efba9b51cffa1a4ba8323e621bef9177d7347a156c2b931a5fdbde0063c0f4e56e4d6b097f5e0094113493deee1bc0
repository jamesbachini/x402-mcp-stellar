import { Network } from '../index.js';
export declare class BackstopConfig {
    emitter: string;
    blndTkn: string;
    usdcTkn: string;
    backstopTkn: string;
    poolFactory: string;
    rewardZone: string[];
    latestLedger: number;
    constructor(emitter: string, blndTkn: string, usdcTkn: string, backstopTkn: string, poolFactory: string, rewardZone: string[], latestLedger: number);
    static load(network: Network, backstopId: string): Promise<BackstopConfig>;
}
