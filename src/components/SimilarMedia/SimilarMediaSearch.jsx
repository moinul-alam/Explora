import { useState, useEffect } from "react";
import { Autocomplete, TextField, Box, InputAdornment, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useSearch from '@src/hooks/useSearch';
import FallbackImage from '@src/assets/fallback-image.png';
import { useMediaQuery } from '@mui/material'; 

const SimilarMediaSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();
  const searchResults = useSearch(searchQuery);
  
  const isMobile = useMediaQuery('(max-width:600px)'); 

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleSelect = (event, value) => {
    if (value) {
      const route =
        value.mediaType === 'person'
          ? `/person/${value.id}`
          : `/details/${value.mediaType}/${value.id}`;
      navigate(route);
      setOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <><Box sx={{ mr: 5, ml: 5 }}>
      <Typography sx={{m:'auto'}}>
        Search for Similar Movies or TV Shows
      </Typography>
    </Box><Box sx={{ width: '20rem', mx: 'auto' }}>
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          freeSolo
          options={searchResults}
          getOptionLabel={(option) => {
            return typeof option === 'string' ? option : option.title || '';
          } }
          onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
          onChange={handleSelect}
          loading={isSearching}
          loadingText="Searching..."
          noOptionsText={searchQuery.trim() ? 'No Results Found' : 'Type to search'}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <img
                  src={option.poster_path
                    ? `https://image.tmdb.org/t/p/w45${option.poster_path}`
                    : FallbackImage}
                  alt={option.title}
                  style={{
                    marginRight: 10,
                    width: 40,
                    height: 60,
                    objectFit: 'cover',
                  }} />
                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {option.title}
                </Box>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder={isMobile ? 'Search...' : 'Search Movies, TV Shows, People and more'}
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
              }} />
          )} />
      </Box></>
  );
};

export default SimilarMediaSearch;
