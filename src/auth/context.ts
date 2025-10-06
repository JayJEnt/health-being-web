import { createContext } from 'react';

import type { UserCreate } from '../api/models/user';
import type { AuthState } from './auth';

export type AuthContextValue = AuthState & {
  login: (creds: Omit<UserCreate, 'email'>) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
