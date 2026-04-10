import { Version } from '../index.js';
import { PoolOracle } from './pool_oracle.js';
import { PoolUser } from './pool_user.js';
import { PoolMetadata } from './pool_metadata.js';
import { ReserveV1, ReserveV2 } from './reserve.js';
/**
 * Manage ledger data for a Blend pool
 */
export class Pool {
    network;
    id;
    metadata;
    reserves;
    timestamp;
    constructor(network, id, metadata, reserves, timestamp) {
        this.network = network;
        this.id = id;
        this.metadata = metadata;
        this.reserves = reserves;
        this.timestamp = timestamp;
    }
    /**
     * Load the oracle for the pool
     * @returns The oracle for the pool
     */
    async loadOracle() {
        return PoolOracle.load(this.network, this.metadata.oracle, Array.from(this.reserves.keys()));
    }
    /**
     * Load the user from the pool
     * @param userId - The address of the user to load
     * @returns The pool user
     */
    async loadUser(userId) {
        return PoolUser.load(this.network, this.id, this, userId);
    }
}
export class PoolV1 extends Pool {
    version = Version.V1;
    /**
     * Load a pool from the ledger
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @returns - The pool object
     */
    static async load(network, id) {
        const poolMetadata = await PoolMetadata.load(network, id);
        return await PoolV1.loadWithMetadata(network, id, poolMetadata);
    }
    /**
     * Load a pool from the ledger with metadata
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @param metadata - The metadata for the pool
     * @returns - The pool object
     */
    static async loadWithMetadata(network, id, metadata) {
        const timestamp = Math.floor(Date.now() / 1000);
        const reserveList = await ReserveV1.loadList(network, id, BigInt(metadata.backstopRate), metadata.reserveList, timestamp);
        const reserves = new Map();
        for (const reserve of reserveList) {
            reserves.set(reserve.assetId, reserve);
        }
        return new PoolV1(network, id, metadata, reserves, timestamp);
    }
}
export class PoolV2 extends Pool {
    version = Version.V2;
    /**
     * Load a pool from the ledger
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @returns - The pool object
     */
    static async load(network, id) {
        const poolMetadata = await PoolMetadata.load(network, id);
        return await PoolV2.loadWithMetadata(network, id, poolMetadata);
    }
    /**
     * Load a pool from the ledger with metadata
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @param metadata - The metadata for the pool
     * @returns - The pool object
     */
    static async loadWithMetadata(network, id, metadata) {
        const timestamp = Math.floor(Date.now() / 1000);
        const reserveList = await ReserveV2.loadList(network, id, BigInt(metadata.backstopRate), metadata.reserveList, timestamp);
        const reserves = new Map();
        for (const reserve of reserveList) {
            reserves.set(reserve.assetId, reserve);
        }
        return new PoolV2(network, id, metadata, reserves, timestamp);
    }
}
