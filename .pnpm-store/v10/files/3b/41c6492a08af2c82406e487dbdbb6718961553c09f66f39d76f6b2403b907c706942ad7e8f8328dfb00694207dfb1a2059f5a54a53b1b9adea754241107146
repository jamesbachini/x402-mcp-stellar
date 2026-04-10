import { Network } from '../index.js';
/**
 * Ledger data for the Comet BLND/USDC LP
 */
export declare class BackstopToken {
    /**
     * The address of the comet pool
     */
    id: string;
    /**
     * The amount of BLND in the comet LP
     */
    blnd: bigint;
    /**
     * The amount of USDC in the comet LP
     */
    usdc: bigint;
    /**
     * The number of shares in the comet LP
     */
    shares: bigint;
    /**
     * The amount of BLND per LP token
     */
    blndPerLpToken: number;
    /**
     * The amount of USDC per LP token
     */
    usdcPerLpToken: number;
    /**
     * The price of the LP token in USDC
     */
    lpTokenPrice: number;
    constructor(
    /**
     * The address of the comet pool
     */
    id: string, 
    /**
     * The amount of BLND in the comet LP
     */
    blnd: bigint, 
    /**
     * The amount of USDC in the comet LP
     */
    usdc: bigint, 
    /**
     * The number of shares in the comet LP
     */
    shares: bigint, 
    /**
     * The amount of BLND per LP token
     */
    blndPerLpToken: number, 
    /**
     * The amount of USDC per LP token
     */
    usdcPerLpToken: number, 
    /**
     * The price of the LP token in USDC
     */
    lpTokenPrice: number);
    /**
     * Load the backstop token data from the ledger
     * @param network - The network information to load the backstop from
     * @param id - The contract address of the backstop
     * @returns - The backstop token object
     */
    static load(network: Network, id: string, blndTkn: string, usdcTkn: string): Promise<BackstopToken>;
}
