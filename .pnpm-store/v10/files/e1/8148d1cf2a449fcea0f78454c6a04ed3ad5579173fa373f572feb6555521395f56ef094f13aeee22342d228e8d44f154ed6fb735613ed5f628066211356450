import { Pool } from './pool.js';
import { PoolOracle } from './pool_oracle.js';
import { Positions } from './user_types.js';
export declare class PositionsEstimate {
    /**
     * The total value of all tokens borrowed from the pool in the pool's oracle denomination
     */
    totalBorrowed: number;
    /**
     * The total value of all tokens supplied to the pool in the pool's oracle denomination
     */
    totalSupplied: number;
    /**
     * The total liabilities of the user in the pool's oracle denomination
     */
    totalEffectiveLiabilities: number;
    /**
     * The total collateral of the user in the pool's oracle denomination
     */
    totalEffectiveCollateral: number;
    /**
     * The maximum amount of liabilities the user can take on
     */
    borrowCap: number;
    /**
     * The ratio of liabilities to collateral
     */
    borrowLimit: number;
    /**
     * The net APY of the user's position
     */
    netApy: number;
    /**
     * The average estimated APY accrued by all supplied tokens
     */
    supplyApy: number;
    /**
     * The average estimated APY accrued by all borrowed tokens
     */
    borrowApy: number;
    constructor(
    /**
     * The total value of all tokens borrowed from the pool in the pool's oracle denomination
     */
    totalBorrowed: number, 
    /**
     * The total value of all tokens supplied to the pool in the pool's oracle denomination
     */
    totalSupplied: number, 
    /**
     * The total liabilities of the user in the pool's oracle denomination
     */
    totalEffectiveLiabilities: number, 
    /**
     * The total collateral of the user in the pool's oracle denomination
     */
    totalEffectiveCollateral: number, 
    /**
     * The maximum amount of liabilities the user can take on
     */
    borrowCap: number, 
    /**
     * The ratio of liabilities to collateral
     */
    borrowLimit: number, 
    /**
     * The net APY of the user's position
     */
    netApy: number, 
    /**
     * The average estimated APY accrued by all supplied tokens
     */
    supplyApy: number, 
    /**
     * The average estimated APY accrued by all borrowed tokens
     */
    borrowApy: number);
    static build(pool: Pool, poolOracle: PoolOracle, positions: Positions): PositionsEstimate;
}
