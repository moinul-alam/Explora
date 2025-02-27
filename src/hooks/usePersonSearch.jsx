import { useState, useEffect } from 'react';
import api from '@src/utils/api';

const usePersonSearch = (searchQuery, debounceTime = 500) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await api.get(`/media/searchAll?query=${searchQuery}`);
        if (response.status === 'success') {
          const formattedResults = response.data
            .filter((item) => item.mediaType === "person")
            .map((item) => ({
              id: item.id,
              name: item.title || item.name, 
              poster_path: item.poster_path,
            }));
          setSearchResults(formattedResults);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error(`Error fetching search results for query "${searchQuery}":`, error);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, debounceTime);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, debounceTime]);

  return searchResults;
};

export default usePersonSearch;