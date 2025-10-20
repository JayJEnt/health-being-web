import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { oauth2Api } from '../api/endpoints/public/oauth2';
import { tokenDataApi } from '../api/endpoints/user_role/token_data';
import type { Token } from '../api/models/token';
import type { User, UserCreate } from '../api/models/user';
import { isToken } from '../utils';
import type { AuthState } from './auth';
import { AuthContext, type AuthContextValue } from './context';

const AUTH_TOKEN_KEY = 'app.auth.token';

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
    status: 'idle',
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
            status: 'unauthenticated',
          }));
        }
        return;
      }
      let token: Token | null = null;
      try {
        const parsed: unknown = JSON.parse(raw);
        if (isToken(parsed)) {
          token = parsed;
        } else {
          token = null;
        }

        if (!cancelled) setState((s) => ({ ...s, token, status: 'loading' }));

        const user: User = await tokenDataApi.getUser();

        if (!cancelled) {
          setState((s) => ({ ...s, user, status: 'authenticated' }));
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        if (!cancelled) {
          setState((s) => ({
            ...s,
            token: null,
            user: null,
            status: 'unauthenticated',
          }));
        }
      }
    };

    void init();
    return () => {
      cancelled = true;
    };
  }, []);

  // login: set state -> save token -> get user
  const login = useCallback<AuthContextValue['login']>(
    async (credentials: Omit<UserCreate, 'email'>) => {
      setState((s) => ({ ...s, status: 'loading' }));
      try {
        const token = await oauth2Api.ourLogin(credentials);

        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
        const user = await tokenDataApi.getUser();

        setState((s) => ({ ...s, token, user, status: 'authenticated' }));
        return true;
      } catch (err) {
        console.error('Login error:', err);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setState((s) => ({
          ...s,
          token: null,
          user: null,
          status: 'unauthenticated',
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
      status: 'unauthenticated',
    }));
  }, []);

  // Synchronization between tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== AUTH_TOKEN_KEY) return;
      if (!e.newValue) {
        logout();
      } else {
        let token: Token | null = null;
        try {
          const parsed: unknown = JSON.parse(e.newValue);
          if (isToken(parsed)) {
            token = parsed;
          } else {
            token = null;
          }
          setState((s) => ({ ...s, token, status: 'authenticated' }));
        } catch {
          logout();
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
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
