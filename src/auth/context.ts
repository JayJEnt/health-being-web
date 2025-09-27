import { createContext } from "react";
import type { AuthState } from "./auth";
import type { UserCreate } from "../api/models/user";


export type AuthContextValue = AuthState & {
    login: (creds: Omit<UserCreate, "email">) => Promise<boolean>;
    logout: () => void;
};


export const AuthContext = createContext<AuthContextValue | null>(null);
