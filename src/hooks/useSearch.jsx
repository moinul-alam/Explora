//useSearch.jsx@src/hooks

import { useState, useEffect } from 'react';
import api from '@src/utils/api';

const useSearch = (searchQuery) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await api.get(`/media/searchAll?query=${searchQuery}`);
          if (response.status === 'success') {
            const formattedResults = response.data.map((item) => ({
              id: item.id,
              mediaType: item.mediaType,
              title: item.title || item.name, 
              poster_path: item.poster_path,
              overview: item.overview || 'No overview available',
              genres: item.genres || [],
              vote_average: item.vote_average || 0,
              release_date: item.release_date || item.first_air_date || 'Unknown'
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

export default useSearch;

