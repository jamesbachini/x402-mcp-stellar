import { AddLiquidityRequest, AssetList, AssetListInfo, BuildQuoteRequest, BuildQuoteResponse, LiquidityResponse, Pool, PriceData, QuoteRequest, QuoteResponse, RemoveLiquidityRequest, SoroswapSDKConfig, SupportedAssetLists, SupportedNetworks, UserPositionResponse } from './types';
/**
 * Main Soroswap SDK class
 * Provides access to all Soroswap API functionality with API key authentication
 */
export declare class SoroswapSDK {
    private httpClient;
    private defaultNetwork;
    constructor(config: SoroswapSDKConfig);
    /**
     * Transform asset list from enum URLs to simple strings for API
     */
    private transformAssetList;
    /**
     * Get contract address for a specific network and contract name
     */
    getContractAddress(network: SupportedNetworks, contractName: 'factory' | 'router' | 'aggregator'): Promise<{
        address: string;
    }>;
    /**
     * Get available protocols for trading
     */
    getProtocols(network?: SupportedNetworks): Promise<string[]>;
    /**
     * Get quote for a swap
     */
    quote(quoteRequest: QuoteRequest, network?: SupportedNetworks): Promise<QuoteResponse>;
    /**
     * This builds the quote into an XDR transaction
     */
    build(buildQuoteRequest: BuildQuoteRequest, network?: SupportedNetworks): Promise<BuildQuoteResponse>;
    /**
     * Send signed transaction
     */
    send(xdr: string, launchtube?: boolean, network?: SupportedNetworks): Promise<any>;
    /**
     * Get pools for specific protocols
     */
    getPools(network: SupportedNetworks, protocols: string[], assetList?: (SupportedAssetLists | string)[]): Promise<Pool[]>;
    /**
     * Get pool for specific token pair
     */
    getPoolByTokens(assetA: string, assetB: string, network: SupportedNetworks, protocols: string[]): Promise<Pool[]>;
    /**
     * Add liquidity to a pool
     */
    addLiquidity(liquidityData: AddLiquidityRequest, network?: SupportedNetworks): Promise<LiquidityResponse>;
    /**
     * Remove liquidity from a pool
     */
    removeLiquidity(liquidityData: RemoveLiquidityRequest, network?: SupportedNetworks): Promise<LiquidityResponse>;
    /**
     * Get user liquidity positions
     */
    getUserPositions(address: string, network?: SupportedNetworks): Promise<UserPositionResponse[]>;
    /**
     * Get asset lists metadata or specific asset list
     */
    getAssetList(name?: SupportedAssetLists): Promise<AssetList | AssetListInfo[]>;
    /**
     * Get asset prices
     */
    getPrice(assets: string | string[], network?: SupportedNetworks): Promise<PriceData[]>;
}
//# sourceMappingURL=soroswap-sdk.d.ts.map