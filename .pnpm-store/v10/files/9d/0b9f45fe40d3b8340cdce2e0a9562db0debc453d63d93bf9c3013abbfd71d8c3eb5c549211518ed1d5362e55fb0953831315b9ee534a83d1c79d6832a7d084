import { JWTData } from '../types';
/**
 * In-memory token cache with automatic expiration handling
 * Stores access and refresh tokens with timestamps
 */
export declare class TokenCache {
    private tokenData;
    /**
     * Store token data in cache
     */
    setTokens(tokenData: JWTData): void;
    /**
     * Get current access token if valid
     */
    getAccessToken(): string | null;
    /**
     * Get refresh token
     */
    getRefreshToken(): string | null;
    /**
     * Get user information
     */
    getUserInfo(): {
        username: string;
        role: string;
    } | null;
    /**
     * Check if we have valid tokens
     */
    hasValidTokens(): boolean;
    /**
     * Check if we need to refresh tokens
     */
    needsRefresh(): boolean;
    /**
     * Clear all cached tokens
     */
    clear(): void;
    /**
     * Get token expiration time
     */
    getExpirationTime(): number | null;
    /**
     * Check if tokens exist (regardless of expiration)
     */
    hasTokens(): boolean;
}
//# sourceMappingURL=token-cache.d.ts.map