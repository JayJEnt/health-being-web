import { createContext } from "react";

import type { Oauth2RequestForm } from "../models/oauth2_form";
import type { Token } from "../models/token";
import type { User } from "../models/user";

export type AuthState = {
	token: Token | null;
	user: User | null;
	status: "loading" | "authenticated" | "unauthenticated";
};

export type AuthContextType = AuthState & {
	handleLogin: (creds: Oauth2RequestForm) => Promise<void>;
	handleLogout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// type AuthProviderProps = PropsWithChildren;

// export default function AuthProvider({ children }: AuthProviderProps) {
// 	return <AuthContext.Provider>{children}</AuthContext.Provider>;
// }
