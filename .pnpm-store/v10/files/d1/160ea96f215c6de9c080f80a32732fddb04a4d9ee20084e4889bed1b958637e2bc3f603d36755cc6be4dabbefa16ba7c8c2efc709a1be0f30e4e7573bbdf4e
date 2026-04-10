"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCache = void 0;
/**
 * In-memory token cache with automatic expiration handling
 * Stores access and refresh tokens with timestamps
 */
class TokenCache {
    constructor() {
        this.tokenData = null;
    }
    /**
     * Store token data in cache
     */
    setTokens(tokenData) {
        this.tokenData = tokenData;
    }
    /**
     * Get current access token if valid
     */
    getAccessToken() {
        if (!this.tokenData) {
            return null;
        }
        // Check if token is expired (with 5 minute buffer)
        const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
        const now = Date.now();
        if (this.tokenData.expires_at && (this.tokenData.expires_at - bufferTime) <= now) {
            return null; // Token is expired or about to expire
        }
        return this.tokenData.access_token;
    }
    /**
     * Get refresh token
     */
    getRefreshToken() {
        return this.tokenData?.refresh_token || null;
    }
    /**
     * Get user information
     */
    getUserInfo() {
        if (!this.tokenData) {
            return null;
        }
        return {
            username: this.tokenData.username,
            role: this.tokenData.role
        };
    }
    /**
     * Check if we have valid tokens
     */
    hasValidTokens() {
        return this.getAccessToken() !== null;
    }
    /**
     * Check if we need to refresh tokens
     */
    needsRefresh() {
        if (!this.tokenData) {
            return false;
        }
        const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
        const now = Date.now();
        return !!(this.tokenData.expires_at && (this.tokenData.expires_at - bufferTime) <= now);
    }
    /**
     * Clear all cached tokens
     */
    clear() {
        this.tokenData = null;
    }
    /**
     * Get token expiration time
     */
    getExpirationTime() {
        return this.tokenData?.expires_at || null;
    }
    /**
     * Check if tokens exist (regardless of expiration)
     */
    hasTokens() {
        return this.tokenData !== null;
    }
}
exports.TokenCache = TokenCache;
//# sourceMappingURL=token-cache.js.map