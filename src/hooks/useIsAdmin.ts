import { useEffect, useState } from "react";

import { tokenDataApi } from "../api/endpoints/user_role/token_data";
import { isLoggedIn } from "../utils";

export function useIsAdmin() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function fetchAdminStatus() {
			try {
				if (!isLoggedIn()) {
					if (isMounted) {
						setIsAdmin(false);
						setLoading(false);
					}
					return;
				}

				const result = await tokenDataApi.hasAdminRole();
				if (isMounted) {
					setIsAdmin(Boolean(result));
				}
			} catch (err) {
				if (isMounted) {
					console.error("Error checking admin role:", err);
					setError(err as Error);
					setIsAdmin(false);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		void fetchAdminStatus();

		return () => {
			isMounted = false;
		};
	}, []);

	return { isAdmin, loading, error };
}
