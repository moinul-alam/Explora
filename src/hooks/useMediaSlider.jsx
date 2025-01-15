import { useState, useEffect } from "react";
import api from "@src/utils/API";

const useMediaSlider = (fetchUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(fetchUrl);
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error(`Error fetching data from ${fetchUrl}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return { data, loading };
};

export default useMediaSlider;
