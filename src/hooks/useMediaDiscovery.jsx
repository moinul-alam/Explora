
import { useState, useEffect } from "react";
import api from "@src/utils/api";

const useMediaDiscovery = (mediaType) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mediaType) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/media/discover/${mediaType}`);
        setMediaItems(response.data.results || []);
      } catch (err) {
        setError(err.message || "Failed to fetch media.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mediaType]); // Only depend on mediaType

  return { mediaItems, loading, error };
};

export default useMediaDiscovery;