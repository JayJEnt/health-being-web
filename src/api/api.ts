import { axiosInstance } from "./client";
import { AxiosError } from "axios";

type Params = Record<string, unknown>;

export const api = {
    get: async <T>(url: string, params?: Params): Promise<T> => {
        try {
            const res = await axiosInstance.get<T>(url, { params });
            return res.data;
        } catch (err) {
            handleError(err);
        }
    },

    post: async <T>(url: string, data?: unknown, config?: object): Promise<T> => {
        try {
            const res = await axiosInstance.post<T>(url, data, config);
            return res.data;
        } catch (err) {
            handleError(err);
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

function handleError(error: unknown): never {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status;

        console.error(`API Error [${status}]: ${message}`);

        throw new Error(`API Error: ${message}`);
    }

    throw new Error("Unexpected error");
}
