"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoroswapSDK = void 0;
const http_client_1 = require("./clients/http-client");
const types_1 = require("./types");
/**
 * Main Soroswap SDK class
 * Provides access to all Soroswap API functionality with API key authentication
 */
class SoroswapSDK {
    constructor(config) {
        this.defaultNetwork = config.defaultNetwork || types_1.SupportedNetworks.MAINNET;
        // Initialize HTTP client with API key
        const baseURL = config.baseUrl || 'https://api.soroswap.finance';
        const timeout = config.timeout || 30000;
        this.httpClient = new http_client_1.HttpClient(baseURL, config.apiKey, timeout);
    }
    /**
     * Transform asset list from enum URLs to simple strings for API
     */
    transformAssetList(assetList) {
        return assetList.map(asset => {
            if (typeof asset === 'string') {
                // If it's already a string, check if it's an enum URL
                if (Object.values(types_1.SupportedAssetLists).includes(asset)) {
                    // Extract the identifier from the URL
                    switch (asset) {
                        case types_1.SupportedAssetLists.SOROSWAP:
                            return 'soroswap';
                        case types_1.SupportedAssetLists.STELLAR_EXPERT:
                            return 'stellar_expert';
                        case types_1.SupportedAssetLists.LOBSTR:
                            return 'lobstr';
                        case types_1.SupportedAssetLists.AQUA:
                            return 'aqua';
                        default:
                            return asset;
                    }
                }
                return asset;
            }
            // If it's an enum, transform to simple string
            switch (asset) {
                case types_1.SupportedAssetLists.SOROSWAP:
                    return 'soroswap';
                case types_1.SupportedAssetLists.STELLAR_EXPERT:
                    return 'stellar_expert';
                case types_1.SupportedAssetLists.LOBSTR:
                    return 'lobstr';
                case types_1.SupportedAssetLists.AQUA:
                    return 'aqua';
                default:
                    return asset;
            }
        });
    }
    /**
     * Get contract address for a specific network and contract name
     */
    async getContractAddress(network, contractName) {
        return this.httpClient.get(`/api/${network}/${contractName}`);
    }
    // ========================================
    // Quote & Trading Methods
    // ========================================
    /**
     * Get available protocols for trading
     */
    async getProtocols(network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery('/protocols', params);
        return this.httpClient.get(url);
    }
    /**
     * Get quote for a swap
     */
    async quote(quoteRequest, network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery('/quote', params);
        // Transform the request to convert enum URLs to simple strings
        const transformedRequest = { ...quoteRequest };
        if (transformedRequest.assetList) {
            transformedRequest.assetList = this.transformAssetList(transformedRequest.assetList);
        }
        return this.httpClient.post(url, transformedRequest);
    }
    /**
     * This builds the quote into an XDR transaction
     */
    async build(buildQuoteRequest, network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery('/quote/build', params);
        return this.httpClient.post(url, buildQuoteRequest);
    }
    /**
     * Send signed transaction
     */
    async send(xdr, launchtube = false, network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery('/send', params);
        const sendData = { xdr, launchtube };
        return this.httpClient.post(url, sendData);
    }
    // ========================================
    // Pool Methods
    // ========================================
    /**
     * Get pools for specific protocols
     */
    async getPools(network, protocols, assetList) {
        const params = {
            network,
            protocol: protocols
        };
        if (assetList) {
            params.assetList = this.transformAssetList(assetList);
        }
        const url = this.httpClient.buildUrlWithQuery('/pools', params);
        return this.httpClient.get(url);
    }
    /**
     * Get pool for specific token pair
     */
    async getPoolByTokens(assetA, assetB, network, protocols) {
        const params = {
            network,
            protocol: protocols
        };
        const url = this.httpClient.buildUrlWithQuery(`/pools/${assetA}/${assetB}`, params);
        return this.httpClient.get(url);
    }
    // ========================================
    // Liquidity Methods
    // ========================================
    /**
     * Add liquidity to a pool
     */
    async addLiquidity(liquidityData, network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery('/liquidity/add', params);
        return this.httpClient.post(url, liquidityData);
    }
    /**
     * Remove liquidity from a pool
     */
    async removeLiquidity(liquidityData, network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery('/liquidity/remove', params);
        return this.httpClient.post(url, liquidityData);
    }
    /**
     * Get user liquidity positions
     */
    async getUserPositions(address, network) {
        const params = { network: network || this.defaultNetwork };
        const url = this.httpClient.buildUrlWithQuery(`/liquidity/positions/${address}`, params);
        return this.httpClient.get(url);
    }
    // ========================================
    // Asset & Price Methods
    // ========================================
    /**
     * Get asset lists metadata or specific asset list
     */
    async getAssetList(name) {
        const listName = name ? this.transformAssetList([name])[0] : undefined;
        const params = name ? { name: listName } : {};
        const url = this.httpClient.buildUrlWithQuery('/asset-list', params);
        if (name) {
            return this.httpClient.get(url);
        }
        else {
            return this.httpClient.get(url);
        }
    }
    /**
     * Get asset prices
     */
    async getPrice(assets, network) {
        const params = {
            network: network || this.defaultNetwork,
            asset: Array.isArray(assets) ? assets : [assets],
        };
        const url = this.httpClient.buildUrlWithQuery('/price', params);
        return this.httpClient.get(url);
    }
}
exports.SoroswapSDK = SoroswapSDK;
//# sourceMappingURL=soroswap-sdk.js.map