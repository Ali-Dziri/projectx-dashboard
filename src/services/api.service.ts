import env from "../config/env.config";
import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { tokenManager } from "@/utils/token-manipulation";
import { router } from "@/main";
import type { ApiError, ApiResponse, ApiCallWrapperParams } from "./types";
import { AUTH_ENDPOINTS } from "@/features/auth/endpoints.constant";

export const API_ERROR_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
} as const;

export class BaseApiService {
  private readonly base_url = env.API_BASE_URL;
  private readonly api_version = env.APP_VERSION;
  private api: AxiosInstance = axios.create({
    baseURL: `${this.base_url}/${this.api_version}/`,
    timeout: env.API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  constructor() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add csrf token to headers
        const token = tokenManager.getCsrfToken();
        if (token) {
          config.headers["x-csrf-token"] = token;
        }

        // Add timestamp to prevent caching
        if (config.method === "get") {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }
        // Log request in development
        if (env.ENABLE_DEBUG) {
          console.log("🚀 Request:", {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
            params: config.params,
          });
        }

        return config;
      },
      (error: AxiosError) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (env.ENABLE_DEBUG) {
          console.log("✅ Response:", {
            url: response.config.url,
            status: response.status,
            data: response.data,
          });
        }

        // Return data directly (unwrap response)
        return response.data;
      },
      async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Log error in development
        if (env.ENABLE_DEBUG) {
          console.error("❌ Response Error:", {
            url: originalRequest?.url,
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
          });
        }

        if (
          error.response?.status === API_ERROR_CODE.UNAUTHORIZED &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await this.api.post<{
              statusCode: number;
              message: string;
              csrfToken: string;
            }>(AUTH_ENDPOINTS.REFRESH_TOKEN);
            tokenManager.setCsrfToken(response.data.csrfToken);
            originalRequest.headers["x-csrf-token"] = response.data.csrfToken;
            return this.api(originalRequest);
          } catch (err) {
            tokenManager.clearCsrfToken();
            router.navigate({
              to: "/login",
            });
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  //   private _buildUrl(path: string): string {
  //     return `${this.base_url}/${this.api_version}/${path}`;
  //   }

  protected async apiCallWrapper<T>({
    path,
    method,
    config,
    data,
  }: ApiCallWrapperParams): Promise<[ApiResponse<T>, null] | [null, ApiError]> {
    try {
      const response: ApiResponse<T> = await this.api[method](
        path,
        ...(data ? [data] : []),
        config,
      );
      return [response, null];
    } catch (error) {
      return [null, error as ApiError];
    }
  }
}
