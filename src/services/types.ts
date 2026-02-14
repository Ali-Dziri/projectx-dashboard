import type { AxiosRequestConfig } from "axios";

export interface ApiCallWrapperParams {
  path: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  data?: unknown;
  config?: AxiosRequestConfig;
}

// API response wrapper type
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// API error type
export interface ApiError {
  statusCode: number;
  type: string;
  message: string | string[];
  path: string;
  timestamp: string;
}
