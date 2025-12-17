import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContextProvider";
import type { AuthContextType } from "../models/authContext";

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used inside <AuthProvider>");
	}

	return context;
}
