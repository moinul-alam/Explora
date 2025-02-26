import { useState, useEffect } from "react";
import { Autocomplete, TextField, Box, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useSearch from "@src/hooks/useSearch";
import FallbackImage from "@src/assets/fallback-image.png";
import { useTheme, useMediaQuery } from "@mui/material";

const SearchBar = ({ searchTypes = ["movie", "tv", "person"], placeholderText = "Search Movies and TV Shows . . .", onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const searchResults = useSearch(searchQuery);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleSelect = (event, value) => {
    if (value) {
      if (onSelect) {
        onSelect(value);
      } else {
        const route =
          value.mediaType === "person"
            ? `/person/${value.id}`
            : `/details/${value.mediaType}/${value.id}`;
        navigate(route);
      }
      setOpen(false);
      setSearchQuery("");
      setInputValue(""); // Add this line to clear input value
    }
  };

  // Filter results based on `searchTypes`
  const filteredResults = searchResults.filter((item) => searchTypes.includes(item.mediaType));

  return (
    <Box sx={{ width: isMobile ? "100%" : "20rem", mx: isMobile ? 1 : "auto", position: "relative", zIndex: 1 }}>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        freeSolo
        options={filteredResults}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.title || "")}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue); // Add this line to update input value
          setSearchQuery(newInputValue);
        }}
        inputValue={inputValue} // Add this line to control input value
        value={null} // Add this line to ensure the value is always null after selection
        onChange={handleSelect}
        loading={isSearching}
        loadingText="Searching..."
        noOptionsText={searchQuery.trim() ? "No results found" : "Type to search"}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <img
                src={option.poster_path ? `https://image.tmdb.org/t/p/w45${option.poster_path}` : FallbackImage}
                alt={option.title}
                style={{ marginRight: 10, width: 40, height: 60, objectFit: "cover" }}
              />
              <Box sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {option.title}
              </Box>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={placeholderText}
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
        PopperProps={{ sx: { zIndex: theme.zIndex.modal } }}
      />
    </Box>
  );
};

export default SearchBar;