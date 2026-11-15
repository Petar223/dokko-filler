import { useCallback, useEffect, useRef, useState } from 'react';

/** Runs `fetchFunction` on mount and whenever it changes (wrap in useCallback). */
const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Only the latest request may update state; older (slower) ones are ignored.
  const latestRequest = useRef(0);

  const refetch = useCallback(async () => {
    const request = ++latestRequest.current;
    const isLatest = () => request === latestRequest.current;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      if (isLatest()) setData(result);
    } catch (err) {
      if (isLatest()) setError(err);
    } finally {
      if (isLatest()) setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
};

export default useFetch;
