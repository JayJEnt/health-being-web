import { useEffect, useState } from "react";
import { getAdmin } from "../utils";
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

                const result = await getAdmin();
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

        fetchAdminStatus();

        return () => {
            isMounted = false;
        };
    }, []);

    return { isAdmin, loading, error };
}
