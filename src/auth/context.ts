import { createContext } from "react";

import type { Oauth2RequestForm } from "../api/models/oauth2_form";
import type { AuthState } from "./auth";

export type AuthContextValue = AuthState & {
	login: (creds: Oauth2RequestForm) => Promise<boolean>;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
