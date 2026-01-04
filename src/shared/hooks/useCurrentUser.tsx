import { useCallback, useEffect, useRef, useState } from "react";

import { tokenDataApi } from "../api/endpoints/user_role/token_data";
import type { User } from "../models/user";

export function useCurrentUser() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const mountedRef = useRef(true);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const refresh = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await tokenDataApi.getUser();

			if (!mountedRef.current) return;

			if (!response) throw new Error("Empty user response");
			setUser(response);
		} catch (err) {
			console.error("Failed to fetch user:", err);
			if (!mountedRef.current) return;

			setUser(null);
			setError("Failed to load user data. Please refresh and try again.");
		} finally {
			if (mountedRef.current) setLoading(false);
		}
	}, []);

	useEffect(() => {
		void refresh();
	}, [refresh]);

	return { user, setUser, loading, error, refresh };
}
