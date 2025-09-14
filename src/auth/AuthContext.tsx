import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AuthContext, type AuthContextValue } from "./context";
import { api } from "../api/api";
import { settings } from "../config";
import type { User, UserCreate } from "../types/user";
import type { Token } from "../types/token";
import type { AuthState } from "../types/auth";

const AUTH_TOKEN_KEY = "app.auth.token";

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        token: null,
        user: null,
        status: "idle",
    });

    // Inicjalization: Get token from localStorage
    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            const raw = localStorage.getItem(AUTH_TOKEN_KEY);
            if (!raw) {
                if (!cancelled) {
                    setState((s) => ({
                        ...s,
                        token: null,
                        user: null,
                        status: "unauthenticated",
                    }));
                }
                return;
            }

            try {
                const token: Token = JSON.parse(raw);

                if (!cancelled) setState((s) => ({ ...s, token, status: "loading" }));

                const user: User = await api.get<User>(
                    `${settings.API_BASE_URL}${settings.TOKEN_DATA_USER_ENDPOINT}`,
                );

                if (!cancelled) {
                    setState((s) => ({ ...s, user, status: "authenticated" }));
                }
            } catch (err) {
                console.log(err);
                localStorage.removeItem(AUTH_TOKEN_KEY);
                if (!cancelled) {
                    setState((s) => ({
                        ...s,
                        token: null,
                        user: null,
                        status: "unauthenticated",
                    }));
                }
            }
        };

        init();
        return () => {
            cancelled = true;
        };
    }, []);

    // login: set state -> save token -> get user
    const login = useCallback<AuthContextValue["login"]>(
        async (credentials: Omit<UserCreate, "email">) => {
            setState((s) => ({ ...s, status: "loading" }));
            try {
                const token = await api.postForm<Token>(
                    `${settings.API_BASE_URL}${settings.OAUTH2_OUR_LOGIN_ENDPOINT}`,
                    credentials,
                );

                localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
                const user = await api.get<User>(
                    `${settings.API_BASE_URL}${settings.TOKEN_DATA_USER_ENDPOINT}`,
                );

                setState((s) => ({ ...s, token, user, status: "authenticated" }));
                return true;
            } catch (err) {
                console.error("Login error:", err);
                localStorage.removeItem(AUTH_TOKEN_KEY);
                setState((s) => ({
                    ...s,
                    token: null,
                    user: null,
                    status: "unauthenticated",
                }));
                return false;
            }
        },
        [],
    );

    // logout: clear state -> clear localStorage
    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setState((s) => ({
            ...s,
            token: null,
            user: null,
            role: null,
            status: "unauthenticated",
        }));
    }, []);

    // Synchronization between tabs
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== AUTH_TOKEN_KEY) return;
            if (!e.newValue) {
                logout();
            } else {
                try {
                    const token: Token = JSON.parse(e.newValue);
                    setState((s) => ({ ...s, token, status: "authenticated" }));
                } catch {
                    logout();
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [logout]);

    const value = useMemo<AuthContextValue>(() => {
        return {
            ...state,
            login,
            logout,
        };
    }, [state, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
