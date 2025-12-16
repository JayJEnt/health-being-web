import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { oauth2Api } from "../api/endpoints/public/oauth2";
import { tokenDataApi } from "../api/endpoints/user_role/token_data";
import { settings } from "../config";
import { clearTokenFromStorage, getTokenFromStorage, parseToken } from "../hooks/useToken";
import type { Oauth2RequestForm } from "../models/oauth2_form";
import type { Token } from "../models/token";
import type { User } from "../models/user";
import type { AuthState } from "./authContext";
import { AuthContext, type AuthContextType } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<AuthState>({
		token: null,
		user: null,
		status: "loading",
	});

	useEffect(() => {
		const init = async () => {
			const token: Token | null = getTokenFromStorage();
			if (!token) {
				setState((s) => ({ ...s, status: "unauthenticated" }));
				return;
			}
			try {
				const user: User = await tokenDataApi.getUser();
				setState((s) => ({ ...s, user, status: "authenticated" }));
				return;
			} catch (err) {
				console.log(err);
				clearTokenFromStorage();
				setState((s) => ({ ...s, status: "unauthenticated" }));
			}
		};
		void init();
	}, []);

	const handleLogin = useCallback<AuthContextType["handleLogin"]>(
		async (credentials: Oauth2RequestForm) => {
			setState((s) => ({ ...s, status: "loading" }));
			try {
				const token = await oauth2Api.ourLogin(credentials);

				localStorage.setItem(settings.AUTH_TOKEN_KEY, JSON.stringify(token));
				const user = await tokenDataApi.getUser();

				setState((s) => ({ ...s, token, user, status: "authenticated" }));
			} catch (err) {
				console.error("Login error:", err);
				localStorage.removeItem(settings.AUTH_TOKEN_KEY);
				setState((s) => ({
					...s,
					token: null,
					user: null,
					status: "unauthenticated",
				}));
			}
		},
		[],
	);

	const handleLogout = useCallback<AuthContextType["handleLogout"]>(async () => {
		localStorage.removeItem(settings.AUTH_TOKEN_KEY);
		setState((s) => ({
			...s,
			token: null,
			user: null,
			status: "unauthenticated",
		}));
	}, []);

	// Synchronization between tabs
	useEffect(() => {
		const onStorage = (e: StorageEvent) => {
			if (e.key !== settings.AUTH_TOKEN_KEY) return;
			if (!e.newValue) {
				handleLogout();
				return;
			}
			const token: Token | null = parseToken(e.newValue);
			if (!token) {
				handleLogout();
				return;
			}
			setState((s) => ({ ...s, token, status: "authenticated" }));
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, [handleLogout]);

	const value = useMemo<AuthContextType>(() => {
		return {
			...state,
			handleLogin,
			handleLogout,
		};
	}, [state, handleLogin, handleLogout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
