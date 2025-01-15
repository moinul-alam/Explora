import { useState, useEffect } from "react";
import api from "@src/utils/api";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(url);
        const result = response.data ;
        console.log("Raw API Response:", result);
        setData(result.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };    

    if (url) fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
