import { PoolOracle } from './pool_oracle.js';
import { Reserve } from './reserve.js';
/**
 * Aggregate floating point data for a pool. These numbers are not guaranteed to be exact, but
 * are suitable for display purposes.
 */
export declare class PoolEstimate {
    /**
     * The total value of all tokens supplied to the pool in the pool's oracle denomination
     */
    totalSupply: number;
    /**
     * The total value of all tokens borrowed from the pool in the pool's oracle denomination
     */
    totalBorrowed: number;
    /**
     * The average APY accrued by all borrowed tokens
     */
    avgBorrowApy: number;
    constructor(
    /**
     * The total value of all tokens supplied to the pool in the pool's oracle denomination
     */
    totalSupply: number, 
    /**
     * The total value of all tokens borrowed from the pool in the pool's oracle denomination
     */
    totalBorrowed: number, 
    /**
     * The average APY accrued by all borrowed tokens
     */
    avgBorrowApy: number);
    static build(reserves: Map<string, Reserve>, poolOracle: PoolOracle): PoolEstimate;
}
