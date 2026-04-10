import { Network, Reserve } from '../index.js';
import { PoolUserEmissionData, Positions } from './user_types.js';
import { Pool } from './pool.js';
export declare class PoolUser {
    userId: string;
    positions: Positions;
    emissions: Map<number, PoolUserEmissionData>;
    constructor(userId: string, positions: Positions, emissions: Map<number, PoolUserEmissionData>);
    static load(network: Network, poolId: string, pool: Pool, userId: string): Promise<PoolUser>;
    /**
     * Get a non-collaterized supply position in bTokens
     * @param reserve
     * @returns
     */
    getSupplyBTokens(reserve: Reserve): bigint;
    /**
     * Get the non-collaterized supply position for a given reserve
     * @param reserve - The reserve
     * @returns The supply, or 0 if the position does not have any supply
     */
    getSupply(reserve: Reserve): bigint;
    /**
     * Get the non-collaterized supply position for a given reserve as a floating point number
     * @param reserve - The reserve
     * @returns The supply, or 0 if the position does not have any supply
     */
    getSupplyFloat(reserve: Reserve): number;
    /**
     * Get the collaterized supply position in bTokens
     * @param reserve
     * @returns
     */
    getCollateralBTokens(reserve: Reserve): bigint;
    /**
     * Get the collateral position for a given reserve
     * @param reserve - The reserve
     * @returns The collateral, or 0 if the position does not have any collateral
     */
    getCollateral(reserve: Reserve): bigint;
    /**
     * Get the collateral position for a given reserve as a floating point number
     * @param reserve - The reserve
     * @returns The collateral, or 0 if the position does not have any collateral
     */
    getCollateralFloat(reserve: Reserve): number;
    /**
     * Get the liability position in dTokens
     * @param reserve
     * @returns
     */
    getLiabilityDTokens(reserve: Reserve): bigint;
    /**
     * Get the liabilities position for a given reserve
     * @param reserve - The reserve
     * @returns The liabilities, or 0 if the position does not have any liabilities
     */
    getLiabilities(reserve: Reserve): bigint;
    /**
     * Get the liabilities position for a given reserve as a floating point number
     * @param reserve - The reserve
     * @returns The liabilities, or 0 if the position does not have any liabilities
     */
    getLiabilitiesFloat(reserve: Reserve): number;
    /**
     * Estimate the total emissions for the user as a floating point number
     * @returns The estimated emissions
     */
    estimateEmissions(reserves: Reserve[]): {
        emissions: number;
        claimedTokens: number[];
    };
}
