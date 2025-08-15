import { api } from "./api/api";

export async function getUser() {
    const res = await api.get("token_data/owner");
    return res;
}

export function getAdmin() {
    const res = api.get("token_data/owner/admin_role");
    return res;
}

export function isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
}
