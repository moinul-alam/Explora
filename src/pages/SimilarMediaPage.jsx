import { useState } from "react";
import { Autocomplete, TextField, Box, InputAdornment, Typography, CircularProgress } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useMediaSearch from "@src/hooks/useMediaSearch";
import useFetchData from "@src/hooks/useFetchData";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import MediaCard from "@src/components/Common/MediaCard/MediaCard";
import FallbackImage from "@src/assets/fallback-image.png";
import { useMediaQuery } from "@mui/material";

const SimilarMediaPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const searchResults = useMediaSearch(searchQuery);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch similar media only when valid media is selected
  const shouldFetch = selectedMedia?.mediaType && selectedMedia?.id;
  const { data: similarMedia, loading } = useFetchData(
    shouldFetch ? `recommender/${selectedMedia.mediaType}/${selectedMedia.id}/similar` : null,
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
      setSelectedMedia(value);
      setOpen(false);
      setSearchQuery(value.title || "");
    }
  };

  const handleMediaClick = (media) => {
    const mediaType = media.mediaType || selectedMedia?.mediaType;
    if (mediaType) {
      navigate(`/details/${mediaType}/${media.id}`);
    } else {
      console.error("Media type is missing. Cannot navigate to details.");
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" sx={{ p: 3 }}>
          Search for Similar Movies or TV Shows
        </Typography>
      </Box>

      <Box sx={{ width: "20rem", mx: "auto", mb: 2 }}>
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          freeSolo
          options={searchResults}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : `${option.title} (${option.mediaType || "unknown"})`
          }
          onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
          onChange={handleSelect}
          noOptionsText={searchQuery.trim() ? "No Results Found" : "Type to search"}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <img
                  src={option.poster_path ? `https://image.tmdb.org/t/p/w92${option.poster_path}` : FallbackImage}
                  alt={option.title}
                  loading="lazy"
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
              placeholder={isMobile ? "Search..." : "Search Movies and TV Shows"}
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

      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
    width: "100%",
    maxWidth: "1200px",
    mx: "auto",
    mt: 3,
  }}
>
  {/* Selected Media (1/5 width) */}
  {selectedMedia && (
    <Box sx={{ flex: "1 1 20%", minWidth: "200px", maxWidth: "250px" }}>
      <MediaCard mediaData={selectedMedia} onClick={() => handleMediaClick(selectedMedia)} />
    </Box>
  )}

  {/* Similar Media Showcase (4/5 width) */}
  <Box sx={{ flex: "4 1 80%", minWidth: "400px" }}>
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
      customItemsPerView={{
        xs: 1,  // 1 item on mobile
        sm: 2,  // 2 items on tablet
        md: 3,  // 3 items on desktop and up
        lg: 3
      }}
    />
    )}
    {similarMedia && similarMedia.length === 0 && <Typography align="center">No similar media found.</Typography>}
  </Box>
</Box>

    </>
  );
};

export default SimilarMediaPage;