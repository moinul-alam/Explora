import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useSearch from '@src/hooks/useSearch';
import ImageNotFound from '@src/assets/ImageNotFound.png';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const searchResults = useSearch(searchQuery);

  useEffect(() => {
    let debounceTimeout;
    if (searchQuery.trim()) {
      setIsSearching(true);
      debounceTimeout = setTimeout(() => setIsSearching(false), 500);
    } else {
      setIsSearching(false);
    }
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Handle keydown event to disable Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // Handle select event when an item is clicked
  const handleSelect = (event, value) => {
    if (value) {
      const route =
        value.mediaType === 'person'
          ? `/person/${value.id}`
          : `/${value.mediaType}/${value.id}`;
      navigate(route);
    }
  };

  // Custom loading state logic
  const loading = isSearching;
  const showNoResults = !loading && searchQuery.trim() && searchResults.length === 0 && open;

  return (
    <Box sx={{ width: '300px', mx: 'auto' }}>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        freeSolo
        options={searchResults}
        getOptionLabel={(option) => option.title || option.name || ''}
        onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
        onChange={handleSelect}
        loading={loading}
        loadingText="Searching..."
        noOptionsText={showNoResults ? "No results found" : null}
        renderOption={(props, option) => (
          <li {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={
                  option.mediaType === 'person'
                    ? option.profile_path
                      ? `https://image.tmdb.org/t/p/w45${option.profile_path}`
                      : ImageNotFound
                    : option.poster_path
                    ? `https://image.tmdb.org/t/p/w45${option.poster_path}`
                    : ImageNotFound
                }
                alt={option.name || option.title}
                style={{ marginRight: 10, width: 40, height: 60 }}
              />
              <span>{option.title || option.name}</span>
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search Movies, Series, or Actors"
            size="small"
            fullWidth
            onKeyDown={handleKeyDown}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;