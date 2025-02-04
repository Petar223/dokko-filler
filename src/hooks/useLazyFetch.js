import { useState, useCallback } from "react";

const useLazyFetch = (fetchFunction) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const runFetch = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(...params);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction],
  );

  const resetData = () => {
    setData(null);
  };

  return [runFetch, { loading, data, error, resetData }];
};

export default useLazyFetch;
