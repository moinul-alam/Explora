import { useState, useEffect } from "react";
import api from "@src/utils/api";

const useMediaGallery = (fetchUrl, fetchMoreOnScroll = true) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Reset states when fetchUrl changes
  useEffect(() => {
    setMediaItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [fetchUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${fetchUrl}?page=${page}`);
        const newItems = response.data;

        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setMediaItems(prev => 
            // If it's page 1, replace the array, otherwise append
            page === 1 ? newItems : [...prev, ...newItems]
          );
        }
      } catch (err) {
        setError("Failed to fetch media items.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl, page]);

  useEffect(() => {
    if (!fetchMoreOnScroll) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (hasMore && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreOnScroll, hasMore, loading]);

  return { mediaItems, loading, error, hasMore };
};

export default useMediaGallery;