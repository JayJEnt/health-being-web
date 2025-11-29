import type { Token } from "../../shared/api/models/token";
import type { User } from "../../shared/api/models/user";

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

export type AuthState = {
	token: Token | null;
	user: User | null;
	status: AuthStatus;
};
