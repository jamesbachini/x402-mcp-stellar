import { AxiosRequestConfig } from 'axios';
/**
 * HTTP client wrapper with API key authentication and error handling
 */
export declare class HttpClient {
    private client;
    constructor(baseURL: string, apiKey: string, timeout?: number);
    /**
     * GET request
     */
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * POST request
     */
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Build URL with query parameters
     */
    buildUrlWithQuery(baseUrl: string, params: Record<string, any>): string;
}
//# sourceMappingURL=http-client.d.ts.map