import { useState, useEffect, useCallback } from 'react';
import api from '@src/utils/api';

const useFetchData = (endpoint, options = {}, extraDependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(endpoint, options);
      setData(response.data.results || response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(options), ...extraDependencies]); 

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;

