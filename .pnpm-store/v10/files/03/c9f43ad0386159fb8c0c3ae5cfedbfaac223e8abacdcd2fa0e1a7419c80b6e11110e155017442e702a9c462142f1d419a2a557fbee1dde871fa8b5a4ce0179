import { Network } from '../index.js';
export declare class PoolMetadata {
    wasmHash: string;
    admin: string;
    name: string;
    backstop: string;
    backstopRate: number;
    maxPositions: number;
    minCollateral: bigint;
    oracle: string;
    status: number;
    reserveList: string[];
    latestLedger: number;
    constructor(wasmHash: string, admin: string, name: string, backstop: string, backstopRate: number, maxPositions: number, minCollateral: bigint, oracle: string, status: number, reserveList: string[], latestLedger: number);
    static load(network: Network, poolId: string): Promise<PoolMetadata>;
}
