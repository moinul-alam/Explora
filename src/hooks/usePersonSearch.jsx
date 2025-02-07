import { useState, useEffect } from 'react';
import api from '@src/utils/api';

const usePersonSearch = (searchQuery) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
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
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSearchResults, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return searchResults;
};

export default usePersonSearch;
