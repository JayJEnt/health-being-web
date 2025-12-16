import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { settings } from "../config";
import type { Token } from "../models/token";

export function saveTokenToStorage(token: string): void {
	try {
		localStorage.setItem(
			settings.AUTH_TOKEN_KEY,
			JSON.stringify({
				access_token: token,
				token_type: "Bearer",
			}),
		);
	} catch (err) {
		throw new Error(`Failed to store token, ERROR: ${(err as Error).message}`);
	}
}

export function clearTokenFromStorage(): void {
	localStorage.removeItem(settings.AUTH_TOKEN_KEY);
}

export function getTokenFromStorage(): Token | null {
	const raw = localStorage.getItem(settings.AUTH_TOKEN_KEY);
	if (!raw) return null;

	const parsed = parseToken(raw);
	return parsed;
}

export function parseToken(raw: string): Token | null {
	let parsed: unknown;

	try {
		parsed = JSON.parse(raw);
	} catch (err) {
		console.log(err);
		clearTokenFromStorage();
		return null;
	}

	if (!isToken(parsed)) {
		clearTokenFromStorage();
		return null;
	}

	return parsed;
}

export function isToken(value: unknown): value is Token {
	if (typeof value !== "object" || value === null) return false;

	const token = value as Record<string, unknown>;

	return typeof token.access_token === "string" && typeof token.token_type === "string";
}

export function useQueryToken(): string | null {
	const { search } = useLocation();
	if (!search) return null;

	const token = new URLSearchParams(search).get("token");
	return token;
}

export function useSaveQueryTokenToStorage(): void {
	const token: string | null = useQueryToken();

	useEffect(() => {
		if (!token) return;
		saveTokenToStorage(token);
	}, [token]);
}
