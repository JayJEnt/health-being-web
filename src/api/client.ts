import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { settings } from "../config";
import type { Token } from "./models/token";


type Params = Record<string, unknown>;
type FormLike = Record<string, string | number | boolean | null | undefined>;

interface ApiErrorResponse {
    status?: number;
    message?: string;
    code?: string;
}


export class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: settings.API_BASE_URL,
            headers: { "Content-Type": "application/json" },
        });

        this.client.interceptors.request.use((config) => {
            const rawToken = localStorage.getItem("app.auth.token");
            if (rawToken) {
                const token: Token = JSON.parse(rawToken);
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token.access_token}`;
            }
            return config;
        });

        this.client.interceptors.response.use(
            (res) => res,
            (err) => Promise.reject(this.handleError(err))
        );
    }


    async get<T>(endpoint: string, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.get<T>(endpoint, {
            ...config,
            params: queryParams,
        });
        return res.data;
    }

    async post<T>(endpoint: string, data?: unknown, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.post<T>(endpoint, data, {
            ...config,
            params: queryParams,
        });
        return res.data;
    }

    async postForm<T>(endpoint: string, data: FormLike, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const body = new URLSearchParams();
        Object.entries(data).forEach(([k, v]) => {
            if (v !== undefined && v !== null) body.append(k, String(v));
        });

        const res = await this.client.post<T>(endpoint, body, {
            ...config,
            params: queryParams,
            headers: {
                ...(config?.headers ?? {}),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
        });
        return res.data;
    }

    async postMultipart<T>(endpoint: string, formData: FormData, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.post<T>(endpoint, formData, {
            ...config,
            params: queryParams,
            headers: {
                ...(config?.headers ?? {}),
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    }

    async download<T extends Blob >(endpoint: string, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.get<T>(endpoint, {
            ...config,
            params: queryParams,
            responseType: "blob",
        });
        return res.data;
    }

    async put<T>(endpoint: string, data?: unknown, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.put<T>(endpoint, data, {
            ...config,
            params: queryParams,
        });
        return res.data;
    }

    async patch<T>(endpoint: string, data?: unknown, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.patch<T>(endpoint, data, {
            ...config,
            params: queryParams,
        });
        return res.data;
    }

    async delete<T>(endpoint: string, queryParams?: Params, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.client.delete<T>(endpoint, {
            ...config,
            params: queryParams,
        });
        return res.data;
    }


    private handleError(error: unknown): ApiErrorResponse {
        if (this.isAxiosError<ApiErrorResponse>(error)) {
            const ax = error as AxiosError<ApiErrorResponse>;
            return {
                status: ax.response?.status,
                message: ax.response?.data?.message || ax.message,
                code: ax.response?.data?.code,
            };
        }
        if (error instanceof Error) {
            return { message: error.message };
        }
        return { message: "Unexpected error" };
    }

    private isAxiosError<T = unknown>(err: unknown): err is AxiosError<T> {
        return (err as AxiosError<T>)?.isAxiosError === true;
    }
}


export const api = new ApiClient();