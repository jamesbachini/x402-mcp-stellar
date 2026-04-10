import { HttpClient } from '../clients/http-client';
import { AuthLoginDto, AuthResponse } from '../types';
/**
 * Authentication manager handles login, registration, and token refresh
 */
export declare class AuthManager {
    private tokenCache;
    private credentials;
    private httpClient;
    constructor(credentials: AuthLoginDto);
    /**
     * Set HTTP client (injected dependency)
     */
    setHttpClient(httpClient: HttpClient): void;
    /**
     * Get current valid access token, refreshing if necessary
     */
    getValidAccessToken(): Promise<string>;
    /**
     * Login with credentials
     */
    login(): Promise<AuthResponse>;
    /**
     * Refresh access token using refresh token
     */
    refreshTokens(): Promise<AuthResponse>;
    /**
     * Get current user information
     */
    getUserInfo(): {
        username: string;
        role: string;
    } | null;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean;
    /**
     * Logout (clear tokens)
     */
    logout(): void;
    /**
     * Get token provider function for HTTP client
     */
    getTokenProvider(): () => Promise<string | null>;
    /**
     * Update credentials (for switching users)
     */
    updateCredentials(credentials: AuthLoginDto): void;
}
//# sourceMappingURL=auth-manager.d.ts.map