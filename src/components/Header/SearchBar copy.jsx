import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useSearch from '@src/hooks/useSearch';
import FallbackImage from '@src/assets/fallback-image.png';
import { useTheme, useMediaQuery } from '@mui/material';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const searchResults = useSearch(searchQuery);

  // Responsive hook for managing screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Small screen check

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
      setOpen(false); // Close dropdown after selection
      setSearchQuery(''); // Clear search after selection
    }
  };

  const showOptions = searchResults.length > 0 && open;

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '20rem',
        mx: isMobile ? 1 : 'auto', // Margin adjustment
        position: 'relative', // Helps manage dropdown position
        zIndex: 1, // Ensures dropdown is on top
      }}
    >
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        freeSolo
        options={searchResults}
        getOptionLabel={(option) => {
          return typeof option === 'string' ? option : option.title || '';
        }}
        onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
        onChange={handleSelect}
        loading={isSearching}
        loadingText="Searching..."
        noOptionsText={searchQuery.trim() ? 'No results found' : 'Type to search'}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <img
                src={
                  option.poster_path
                    ? `https://image.tmdb.org/t/p/w45${option.poster_path}`
                    : FallbackImage
                }
                alt={option.title}
                style={{
                  marginRight: 10,
                  width: 40,
                  height: 60,
                  objectFit: 'cover',
                }}
              />
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
            placeholder={
              isMobile
                ? 'Search...'
                : 'Search Movies, TV Shows, People and more'
            }
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
        PopperProps={{
          sx: {
            zIndex: theme.zIndex.modal, 
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
