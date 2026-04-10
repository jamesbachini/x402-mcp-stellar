"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
/**
 * HTTP client wrapper with API key authentication and error handling
 */
class HttpClient {
    constructor(baseURL, apiKey, timeout = 30000) {
        this.client = axios_1.default.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            // Add custom transformRequest to handle BigInt serialization
            transformRequest: [
                (data) => {
                    if (data && typeof data === 'object') {
                        return JSON.stringify(data, (_, value) => typeof value === 'bigint' ? value.toString() : value);
                    }
                    return data;
                }
            ],
        });
        // Add response interceptor for error handling
        this.client.interceptors.response.use((response) => response, (error) => {
            // Return the exact same error content from the API
            if (error.response) {
                // Server responded with error status - return the exact response data
                return Promise.reject(error.response.data);
            }
            else {
                // Network or other errors - return the original error
                return Promise.reject(error);
            }
        });
    }
    /**
     * GET request
     */
    async get(url, config) {
        const response = await this.client.get(url, config);
        return response.data;
    }
    /**
     * POST request
     */
    async post(url, data, config) {
        const response = await this.client.post(url, data, config);
        return response.data;
    }
    /**
     * Build URL with query parameters
     */
    buildUrlWithQuery(baseUrl, params) {
        const queryString = Object.entries(params)
            .filter(([, value]) => value !== undefined && value !== null)
            .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
            .join('&');
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.js.map