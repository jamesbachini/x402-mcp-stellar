import { Network } from '../index.js';
import { BackstopUserEmissions, UserBalance } from './backstop_user_types.js';
export declare class BackstopPoolUser {
    userId: string;
    poolId: string;
    balance: UserBalance;
    emissions: BackstopUserEmissions | undefined;
    constructor(userId: string, poolId: string, balance: UserBalance, emissions: BackstopUserEmissions | undefined);
    /**
     * Load the backstop pool user data from the ledger
     * @param network - The network information
     * @param backstopId - The contract address of the backstop
     * @param poolId - The contract address of the pool
     * @param userId - The address of the user
     * @param timestamp - The timestamp manage withdrawals for (in seconds since epoch), defaults to now
     * @returns
     */
    static load(network: Network, backstopId: string, poolId: string, userId: string, timestamp?: number | undefined): Promise<BackstopPoolUser>;
}
