import { useContext } from "react";

import { AuthContext } from "../authentication/authContext";

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used inside <AuthProvider>");
	}

	return context;
}
