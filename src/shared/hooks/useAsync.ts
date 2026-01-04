import { useEffect, useState } from "react";
import type { ApiError } from "../api/client";

type AsyncResultProps<T> = {
	data: T | null;
	loading: boolean;
	error: ApiError | null;
};

export function useAsync<T>(fetcher: () => Promise<T>): AsyncResultProps<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<ApiError | null>(null);

	useEffect(() => {
		let mounted = true;

		setLoading(true);
		setError(null);

		fetcher()
			.then((res) => mounted && setData(res))
			.catch((err) => mounted && setError(err))
			.finally(() => mounted && setLoading(false));

		return () => {
			mounted = false;
		};
	}, [fetcher]);

	return { data, loading, error };
}
