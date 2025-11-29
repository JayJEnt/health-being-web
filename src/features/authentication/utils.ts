import type { Token } from "../../shared/api/models/token";

export function isLoggedIn(): boolean {
	const token = localStorage.getItem("token");
	return !!token;
}

export function isToken(v: unknown): v is Token {
	if (typeof v !== "object" || v === null) return false;
	const o = v as Record<string, unknown>;
	return typeof o.access_token === "string" && typeof o.token_type === "string";
}
