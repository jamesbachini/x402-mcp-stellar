import { Network, Version } from '../index.js';
import { PoolOracle } from './pool_oracle.js';
import { PoolUser } from './pool_user.js';
import { PoolMetadata } from './pool_metadata.js';
import { Reserve } from './reserve.js';
/**
 * Manage ledger data for a Blend pool
 */
export declare abstract class Pool {
    private network;
    id: string;
    metadata: PoolMetadata;
    reserves: Map<string, Reserve>;
    timestamp: number;
    constructor(network: Network, id: string, metadata: PoolMetadata, reserves: Map<string, Reserve>, timestamp: number);
    abstract version: Version;
    /**
     * Load the oracle for the pool
     * @returns The oracle for the pool
     */
    loadOracle(): Promise<PoolOracle>;
    /**
     * Load the user from the pool
     * @param userId - The address of the user to load
     * @returns The pool user
     */
    loadUser(userId: string): Promise<PoolUser>;
}
export declare class PoolV1 extends Pool {
    version: Version;
    /**
     * Load a pool from the ledger
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @returns - The pool object
     */
    static load(network: Network, id: string): Promise<PoolV1>;
    /**
     * Load a pool from the ledger with metadata
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @param metadata - The metadata for the pool
     * @returns - The pool object
     */
    static loadWithMetadata(network: Network, id: string, metadata: PoolMetadata): Promise<PoolV1>;
}
export declare class PoolV2 extends Pool {
    version: Version;
    /**
     * Load a pool from the ledger
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @returns - The pool object
     */
    static load(network: Network, id: string): Promise<PoolV2>;
    /**
     * Load a pool from the ledger with metadata
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @param metadata - The metadata for the pool
     * @returns - The pool object
     */
    static loadWithMetadata(network: Network, id: string, metadata: PoolMetadata): Promise<PoolV2>;
}
