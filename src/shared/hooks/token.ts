import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { settings } from "../config";

export function saveTokenToLocalStorage(token: string): void {
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

export function getTokenFromLocalStorage(): string | null {
	const tokenString = localStorage.getItem(settings.AUTH_TOKEN_KEY);
	if (!tokenString) return null;

	const tokenData = JSON.parse(tokenString);
	return tokenData.access_token || null;
}

export function useTokenFromQuery(): string | null {
	const { search } = useLocation();
	if (!search) return null;

	const token = new URLSearchParams(search).get("token");
	return token;
}

export function useSaveTokenFromQueryToLocalStorage(): void {
	const token = useTokenFromQuery();

	useEffect(() => {
		if (!token) return;
		saveTokenToLocalStorage(token);
	}, [token]);
}
