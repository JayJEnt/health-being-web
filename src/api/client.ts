// client.ts
import axios from "axios";
import type { Token } from "../types/token";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const rawToken = localStorage.getItem("app.auth.token");
    if (rawToken) {
        const token: Token = JSON.parse(rawToken);
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
});
