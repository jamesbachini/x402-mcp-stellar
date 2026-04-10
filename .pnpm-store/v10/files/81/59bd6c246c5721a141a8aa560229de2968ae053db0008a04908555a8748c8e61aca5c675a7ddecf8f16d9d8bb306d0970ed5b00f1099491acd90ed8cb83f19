import { BackstopPoolUser } from '../index.js';
import { Backstop } from './backstop.js';
import { BackstopPool } from './backstop_pool.js';
export type Q4WEst = {
    amount: number;
    exp: number;
};
export declare class BackstopPoolUserEst {
    /**
     * The estimated LP tokens the user has deposited
     */
    tokens: number;
    /**
     * The estimated BLND tokens of the user's deposited LP tokens
     */
    blnd: number;
    /**
     * The estimated USDC tokens of the user's deposited LP tokens
     */
    usdc: number;
    /**
     * The estimated spot value of the user's deposited LP tokens
     */
    totalSpotValue: number;
    /**
     * The estimated number of unlocked LP tokens that have been queued
     */
    totalUnlockedQ4W: number;
    /**
     * The array of queued withdrawals in (token amounts)
     */
    q4w: Q4WEst[];
    /**
     * The estimated total LP tokens queued for withdrawal
     */
    totalQ4W: number;
    /**
     * The estimated emissions of the user
     */
    emissions: number;
    constructor(tokens: number, blnd: number, usdc: number, totalSpotValue: number, q4w: Q4WEst[], totalUnlockedQ4W: number, totalQ4W: number, emissions: number);
    static build(backstop: Backstop, pool: BackstopPool, user: BackstopPoolUser): BackstopPoolUserEst;
}
