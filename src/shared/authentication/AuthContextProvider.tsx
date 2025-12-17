import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { oauth2Api } from "../api/endpoints/public/oauth2";
import { tokenDataApi } from "../api/endpoints/user_role/token_data";
import { settings } from "../config";
import type { AuthContextType, AuthState } from "../models/authContext";
import type { Oauth2RequestForm } from "../models/oauth2_form";
import type { Token } from "../models/token";
import type { User } from "../models/user";
import { clearTokenFromStorage, getTokenFromStorage, parseToken } from "./handleToken";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<AuthState>({
		token: null,
		user: undefined,
	});

	const logout = useCallback<AuthContextType["logout"]>(async () => {
		clearTokenFromStorage();
		setState((prev) => ({
			...prev,
			token: null,
			user: null,
		}));
	}, []);

	const login = useCallback<AuthContextType["login"]>(
		async (credentials: Oauth2RequestForm) => {
			setState((prev) => ({ ...prev, user: undefined }));
			try {
				const token = await oauth2Api.ourLogin(credentials);

				localStorage.setItem(settings.AUTH_TOKEN_KEY, JSON.stringify(token));
				const user = await tokenDataApi.getUser();

				setState((prev) => ({ ...prev, token, user }));
			} catch (err) {
				console.error("Login error:", err);
				logout();
			}
		},
		[logout],
	);

	useEffect(() => {
		async function initAuthState() {
			const token: Token | null = getTokenFromStorage();
			if (!token) {
				logout();
				return;
			}
			try {
				const user: User = await tokenDataApi.getUser();
				setState((prev) => ({ ...prev, token, user }));
				return;
			} catch (err) {
				console.log("Login error:", err);
				logout();
			}
		}
		initAuthState();
	}, [logout]);

	useEffect(() => {
		async function onStorage(event: StorageEvent) {
			if (event.key !== settings.AUTH_TOKEN_KEY) return;
			if (!event.newValue) {
				logout();
				return;
			}

			const token: Token | null = parseToken(event.newValue);
			if (!token) {
				logout();
				return;
			}

			try {
				const user: User = await tokenDataApi.getUser();
				setState((prev) => ({ ...prev, token, user }));
				return;
			} catch (err) {
				console.log("Login error:", err);
				logout();
			}
		}
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, [logout]);

	const value = useMemo<AuthContextType>(() => {
		return {
			...state,
			login,
			logout,
		};
	}, [state, login, logout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
