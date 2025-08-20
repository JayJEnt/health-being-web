import type { User } from "./user";
import type { Token } from "./token";
export type AuthStatus =
    | "idle"
    | "loading"
    | "authenticated"
    | "unauthenticated";

export type AuthState = {
    token: Token | null;
    user: User | null;
    status: AuthStatus;
};
