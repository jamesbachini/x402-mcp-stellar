"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const token_cache_1 = require("../cache/token-cache");
/**
 * Authentication manager handles login, registration, and token refresh
 */
class AuthManager {
    constructor(credentials) {
        this.httpClient = null; // Will be injected
        this.credentials = credentials;
        this.tokenCache = new token_cache_1.TokenCache();
    }
    /**
     * Set HTTP client (injected dependency)
     */
    setHttpClient(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Get current valid access token, refreshing if necessary
     */
    async getValidAccessToken() {
        // Check if we have valid tokens
        if (this.tokenCache.hasValidTokens()) {
            return this.tokenCache.getAccessToken();
        }
        // Check if we need to refresh
        if (this.tokenCache.needsRefresh() && this.tokenCache.getRefreshToken()) {
            try {
                await this.refreshTokens();
                const token = this.tokenCache.getAccessToken();
                if (token) {
                    return token;
                }
            }
            catch (error) {
                console.log("🚀 | getValidAccessToken | error:", error);
                // Token refresh failed, attempting new login
            }
        }
        // Login fresh
        await this.login();
        const token = this.tokenCache.getAccessToken();
        if (!token) {
            throw new Error('Failed to obtain access token after login');
        }
        return token;
    }
    /**
     * Login with credentials
     */
    async login() {
        if (!this.httpClient) {
            throw new Error('HTTP client not initialized');
        }
        try {
            const response = await this.httpClient.post('/login', this.credentials);
            //TODO: Get expiration from jwt
            // {
            //   "sub": 1,
            //   "email": "dev@paltalabs.io",
            //   "role": "ADMIN",
            //   "iat": 1751307940,
            //   "exp": 1751308840
            // }
            // Calculate expiration time (assume 1 hour if not provided)
            const expiresIn = 60 * 60 * 1000; // 1 hour in milliseconds
            const expiresAt = Date.now() + expiresIn;
            // Store tokens in cache
            const tokenData = {
                access_token: response.access_token,
                refresh_token: response.refresh_token,
                expires_at: expiresAt,
                username: response.username,
                role: response.role,
            };
            this.tokenCache.setTokens(tokenData);
            return response;
        }
        catch (error) {
            this.tokenCache.clear();
            throw error;
        }
    }
    /**
     * Refresh access token using refresh token
     */
    async refreshTokens() {
        if (!this.httpClient) {
            throw new Error('HTTP client not initialized');
        }
        const refreshToken = this.tokenCache.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        try {
            // Use refresh token as bearer token
            const response = await this.httpClient.post('/refresh', {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            // Calculate expiration time
            const expiresIn = 60 * 60 * 1000; // 1 hour in milliseconds
            const expiresAt = Date.now() + expiresIn;
            // Update tokens in cache
            const tokenData = {
                access_token: response.access_token,
                refresh_token: response.refresh_token,
                expires_at: expiresAt,
                username: response.username,
                role: response.role,
            };
            this.tokenCache.setTokens(tokenData);
            return response;
        }
        catch (error) {
            this.tokenCache.clear();
            throw error;
        }
    }
    /**
     * Get current user information
     */
    getUserInfo() {
        return this.tokenCache.getUserInfo();
    }
    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.tokenCache.hasValidTokens();
    }
    /**
     * Logout (clear tokens)
     */
    logout() {
        this.tokenCache.clear();
    }
    /**
     * Get token provider function for HTTP client
     */
    getTokenProvider() {
        return async () => {
            try {
                return await this.getValidAccessToken();
            }
            catch (error) {
                console.log("🚀 | return | error:", error);
                return null;
            }
        };
    }
    /**
     * Update credentials (for switching users)
     */
    updateCredentials(credentials) {
        this.credentials = credentials;
        this.tokenCache.clear(); // Clear existing tokens
    }
}
exports.AuthManager = AuthManager;
//# sourceMappingURL=auth-manager.js.map