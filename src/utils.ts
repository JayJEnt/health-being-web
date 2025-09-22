import { api } from "./api/api";
import { settings } from "./config";


export async function getUser() {
    const res = await api.get(settings.API_BASE_URL+settings.TOKEN_DATA_ENDPOINT);
    return res;
}

export function getAdmin() {
    const res = api.get(settings.API_BASE_URL+settings.TOKEN_DATA_ENDPOINT);
    return res;
}

export function isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
}
