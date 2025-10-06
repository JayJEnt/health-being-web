import { useEffect, useState } from 'react';

type UseDebouncedSearchParams<T> = {
  query: string;
  fetcher: (q: string, signal: AbortSignal) => Promise<T>;
  delay?: number;
  minLength?: number;
  enabled?: boolean;
};

type UseDebouncedSearchResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  reset: () => void;
};

export function useDebouncedSearch<T>({
  query,
  fetcher,
  delay = 300,
  minLength = 2,
  enabled = true,
}: UseDebouncedSearchParams<T>): UseDebouncedSearchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query.trim();

    if (!enabled || q.length < minLength) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcher(q, controller.signal);
        setData(result);
      } catch (err: unknown) {
        if (
          typeof err === 'object' &&
          err !== null &&
          (('name' in err && (err as { name?: string }).name === 'AbortError') ||
            ('name' in err && (err as { name?: string }).name === 'CanceledError') ||
            ('code' in err && (err as { code?: string }).code === 'ERR_CANCELED'))
        ) {
          return;
        }

        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error'));
        }
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, fetcher, delay, minLength, enabled]);

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return { data, loading, error, reset };
}
