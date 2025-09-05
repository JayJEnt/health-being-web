import { axiosInstance } from "./client";
import { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

type Params = Record<string, unknown>;
type FormLike = Record<string, string | number | boolean | null | undefined>;

export const api = {
    get: async <T>(url: string, params?: Params): Promise<T> => {
        try {
            const res = await axiosInstance.get<T>(url, { params });
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },

    // JSON
    postJson: async <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> => {
        try {
            const res = await axiosInstance.post<T>(url, data, {
                ...(config ?? {}),
                headers: {
                    ...(config?.headers ?? {}),
                    "Content-Type": "application/json",
                },
            });
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },

    // x-www-form-urlencoded (np. OAuth2PasswordRequestForm)
    postForm: async <T>(
        url: string,
        data: FormLike,
        config?: AxiosRequestConfig,
    ): Promise<T> => {
        try {
            const body = new URLSearchParams();
            Object.entries(data).forEach(([k, v]) => {
                if (v !== undefined && v !== null) body.append(k, String(v));
            });

            const res = await axiosInstance.post<T>(url, body, {
                ...(config ?? {}),
                headers: {
                    ...(config?.headers ?? {}),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },

    // multipart/form-data
    postMultipart: async <T>(
        url: string,
        formData: FormData,
        config?: AxiosRequestConfig,
    ): Promise<T> => {
        try {
            const res = await axiosInstance.post<T>(url, formData, {
                ...(config ?? {}),
            });
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },
    // Images download
    downloadBlob: async (
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<Blob> => {
        try {
            const res = await axiosInstance.post(url, null, {
                responseType: "blob",
                ...(config ?? {}),
            });
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        }
    },

    put: async <T>(url: string, data?: unknown): Promise<T> => {
        try {
            const res = await axiosInstance.put<T>(url, data);
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },

    delete: async <T>(url: string): Promise<T> => {
        try {
            const res = await axiosInstance.delete<T>(url);
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },
};

interface ApiErrorResponse {
    message?: string;
}

function isAxiosError<T = unknown>(err: unknown): err is AxiosError<T> {
    return (err as AxiosError<T>)?.isAxiosError === true;
}

function handleError(error: unknown): never {
    if (isAxiosError<ApiErrorResponse>(error)) {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status;
        console.error(`API Error [${status}]: ${message}`, error.response?.data);
        throw new Error(`API Error: ${message}`);
    }

    if (error instanceof Error) {
        throw error;
    }

    throw new Error("Unexpected error");
}
