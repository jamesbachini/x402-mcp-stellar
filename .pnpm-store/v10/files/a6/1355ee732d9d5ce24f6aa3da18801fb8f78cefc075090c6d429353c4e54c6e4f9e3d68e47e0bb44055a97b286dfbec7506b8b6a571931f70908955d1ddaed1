"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolV2 = exports.PoolV1 = exports.Pool = void 0;
const index_js_1 = require("../index.js");
const pool_oracle_js_1 = require("./pool_oracle.js");
const pool_user_js_1 = require("./pool_user.js");
const pool_metadata_js_1 = require("./pool_metadata.js");
const reserve_js_1 = require("./reserve.js");
/**
 * Manage ledger data for a Blend pool
 */
class Pool {
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
        return pool_oracle_js_1.PoolOracle.load(this.network, this.metadata.oracle, Array.from(this.reserves.keys()));
    }
    /**
     * Load the user from the pool
     * @param userId - The address of the user to load
     * @returns The pool user
     */
    async loadUser(userId) {
        return pool_user_js_1.PoolUser.load(this.network, this.id, this, userId);
    }
}
exports.Pool = Pool;
class PoolV1 extends Pool {
    version = index_js_1.Version.V1;
    /**
     * Load a pool from the ledger
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @returns - The pool object
     */
    static async load(network, id) {
        const poolMetadata = await pool_metadata_js_1.PoolMetadata.load(network, id);
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
        const reserveList = await reserve_js_1.ReserveV1.loadList(network, id, BigInt(metadata.backstopRate), metadata.reserveList, timestamp);
        const reserves = new Map();
        for (const reserve of reserveList) {
            reserves.set(reserve.assetId, reserve);
        }
        return new PoolV1(network, id, metadata, reserves, timestamp);
    }
}
exports.PoolV1 = PoolV1;
class PoolV2 extends Pool {
    version = index_js_1.Version.V2;
    /**
     * Load a pool from the ledger
     * @param network - The network information to load the pool from
     * @param id - The contract address of the pool
     * @returns - The pool object
     */
    static async load(network, id) {
        const poolMetadata = await pool_metadata_js_1.PoolMetadata.load(network, id);
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
        const reserveList = await reserve_js_1.ReserveV2.loadList(network, id, BigInt(metadata.backstopRate), metadata.reserveList, timestamp);
        const reserves = new Map();
        for (const reserve of reserveList) {
            reserves.set(reserve.assetId, reserve);
        }
        return new PoolV2(network, id, metadata, reserves, timestamp);
    }
}
exports.PoolV2 = PoolV2;
