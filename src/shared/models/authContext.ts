import type { Oauth2RequestForm } from "./oauth2_form";
import type { Token } from "./token";
import type { User } from "./user";

export type AuthState = {
	token: Token | null;
	user: User | null | undefined;
};

export type AuthContextType = AuthState & {
	login: (creds: Oauth2RequestForm) => Promise<void>;
	logout: () => Promise<void>;
};
