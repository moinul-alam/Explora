import { useState, useEffect } from 'react';
import api from '@src/utils/API';

const useSearch = (searchQuery) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await api.get(`/api/media/search?query=${searchQuery}`);
          setSearchResults(response.data.data);
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

export default useSearch;
