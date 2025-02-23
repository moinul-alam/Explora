import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import useFetchData from "@src/hooks/useFetchData";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import MediaCard from "@src/components/Common/MediaCard/MediaCard";
import SearchBar from "@src/components/Common/SearchBar";

const SimilarMediaPage = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const shouldFetch = Boolean(selectedMedia?.mediaType && selectedMedia?.id);
  const { data: similarMedia, loading } = useFetchData(
    shouldFetch ? `recommender/content-based/${selectedMedia.mediaType}/${selectedMedia.id}/similar` : null,
    {},
    [selectedMedia]
  );

  // Debugging: Log selected media
  useEffect(() => {
    console.log("Selected Media:", selectedMedia);
  }, [selectedMedia]);

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" sx={{ p: 3 }}>
          Search for Similar Movies or TV Shows
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ width: "20rem", mx: "auto", mb: 2 }}>
        <SearchBar onSelect={setSelectedMedia} />
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
            <Box
              component={Link}
              to={`/details/${selectedMedia.mediaType}/${selectedMedia.id}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                pt: 2,
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MediaCard
                mediaData={{
                  ...selectedMedia,
                  vote_average: Number(selectedMedia.vote_average) || 0, // Ensure it's a number
                  year: selectedMedia.release_date
                    ? new Date(selectedMedia.release_date).getFullYear()
                    : "N/A", // Extract year
                }}
              />
            </Box>
          </Box>
        )}

        {/* Similar Media Showcase (4/5 width) */}
        <Box sx={{ flex: "4 1 80%", minWidth: "400px" }}>
          {shouldFetch && loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <CircularProgress />
            </Box>
          )}
          {similarMedia && similarMedia.length > 0 && (
            <MediaShowcase
              data={similarMedia.map((media) => ({
                ...media,
                mediaType: media.mediaType || selectedMedia.mediaType,
                vote_average: Number(media.vote_average) || 0, // Ensure numeric value
                year: media.release_date ? new Date(media.release_date).getFullYear() : "N/A", // Extract year
              }))}
              detailsLink={(media) => `/details/${media.mediaType}/${media.tmdb_id}`}
              customItemsPerView={{
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
              }}
            />
          )}
          {similarMedia && similarMedia.length === 0 && (
            <Typography align="center">No similar media found.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SimilarMediaPage;