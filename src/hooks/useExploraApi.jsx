import { useState, useEffect } from 'react';
import api from '@src/utils/api';

const useExploraApi = (url, trigger) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    api.get(url)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [url, trigger]);

  return { data, loading };
};

export default useExploraApi;
