import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { saveTokenToStorage } from "../authentication/handleToken";

export function useQueryToken(): string | null {
	const { search } = useLocation();
	if (!search) return null;

	const token = new URLSearchParams(search).get("token");
	return token;
}

export function useSaveQueryTokenToStorage(): void {
	const token: string | null = useQueryToken();

	useEffect(() => {
		if (!token) return;
		saveTokenToStorage(token);
	}, [token]);
}
