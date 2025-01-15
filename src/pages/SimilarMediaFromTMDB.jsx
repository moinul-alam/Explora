import { useState } from "react";
import { Autocomplete, TextField, Box, InputAdornment, Typography, CircularProgress } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useSearch from "@src/hooks/useSearch";
import useFetchData from "@src/hooks/useFetchData";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import FallbackImage from "@src/assets/fallback-image.png";
import { useMediaQuery } from "@mui/material";

const SimilarMediaFromTMDB = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const searchResults = useSearch(searchQuery);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch similar media using useFetchData
  const { data: similarMedia, loading, error } = useFetchData(
    selectedMedia
      ? `media/${selectedMedia.mediaType}/${selectedMedia.id}/similar`
      : null,
    {},
    [selectedMedia]
  );

  // Handle search input changes
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleSelect = (event, value) => {
    if (value) {
      setSelectedMedia(value); // Store selected media for fetching similar content
      setOpen(false);
      setSearchQuery(value.title || "");
    }
  };

  const handleMediaClick = (media) => {
    // Check if mediaType exists in `media`; otherwise, fallback to the selectedMedia's mediaType
    const mediaType = media.mediaType || selectedMedia?.mediaType;
    if (mediaType) {
      const route = `/details/${mediaType}/${media.id}`;
      navigate(route); // Navigate to media details page
    } else {
      console.error("Media type is missing. Cannot navigate to details.");
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" sx={{ p: 3 }}>
          Search for Similar Movies or TV Shows from TMDB
        </Typography>
      </Box>
      <Box sx={{ width: "20rem", mx: "auto", mb: 2 }}>
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          freeSolo
          options={searchResults}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.title || "")}
          onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
          onChange={handleSelect}
          noOptionsText={searchQuery.trim() ? "No Results Found" : "Type to search"}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
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
              placeholder={isMobile ? "Search..." : "Search Movies, TV Shows, People and more"}
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
      <Box sx={{ mt: 4 }}>
        {error && selectedMedia && ( // Show error only after user has selected media
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {similarMedia && similarMedia.length > 0 && (
          <MediaShowcase
            data={similarMedia.map((item) => ({
              ...item,
              mediaType: item.mediaType || selectedMedia.mediaType,
            }))}
            onCardClick={handleMediaClick}
          />
        )}
        {similarMedia && similarMedia.length === 0 && (
          <Typography align="center">No similar media found.</Typography>
        )}
      </Box>
    </>
  );
};

export default SimilarMediaFromTMDB;
