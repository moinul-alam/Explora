import { useState, useRef, useEffect } from "react";
import { Box, Typography, CircularProgress, Button, IconButton, Slider } from "@mui/material";
import { Close, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import MediaCard from "@src/components/Common/MediaCard/MediaCard";
import SearchBar from "@src/components/Common/SearchBar";
import api from "@src/utils/api";
import MovieLoader from "@src/components/Common/MovieLoader";

const SearchRateAndRecommendationsPage = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchRecommendations = async () => {
    if (selectedMedia.length === 0) return;

    setLoading(true);
    setHasFetched(true);
    
    try {
      const ratings = {};
      selectedMedia.forEach(media => {
        const id = (media.tmdb_id || media.id).toString();
        ratings[id] = media.rating;
      });

      const response = await api.post("/recommender/collaborative/user-based-recommendations", {
        ratings: ratings
      });

      if (response?.data && Array.isArray(response.data)) {
        setRecommendations(response.data);
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
      setRecommendations([]);
    }
    setLoading(false);
  };

  const handleSelect = (media) => {
    const mediaId = media.tmdb_id || media.id;
    if (!selectedMedia.some((item) => (item.tmdb_id || item.id) === mediaId)) {
      setSelectedMedia([...selectedMedia, { ...media, rating: 5 }]); // Default rating of 5
    }
  };

  const handleRemove = (id) => {
    setSelectedMedia(selectedMedia.filter((media) => (media.tmdb_id || media.id) !== id));
    if (selectedMedia.length === 1) {
      setRecommendations([]);
    }
  };

  const handleRatingChange = (id, newRating) => {
    setSelectedMedia(selectedMedia.map(media => 
      (media.tmdb_id || media.id) === id 
        ? { ...media, rating: newRating } 
        : media
    ));
  };

  const handleGetRecommendations = () => {
    if (selectedMedia.length > 0) {
      fetchRecommendations();
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Create a key based on the recommendations data itself
  const showcaseKey = recommendations.map(media => media.tmdb_id || media.id).join('-');

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h3" sx={{ p: 3 }}>
          Search, Rate and Get Recommendations
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ width: "20rem", mx: "auto", mb: 2 }}>
        <SearchBar onSelect={handleSelect} />
      </Box>

      {/* Selected Media Box with Scrollable Feature and Rating */}
      {selectedMedia.length > 0 && (
        <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto", mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 2, position: "relative" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Selected Movies</Typography>
          
          <IconButton 
            onClick={scrollLeft} 
            sx={{ 
              position: "absolute", 
              left: "-20px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              background: "rgba(255,255,255,0.7)", 
              "&:hover": { background: "rgba(255,255,255,1)" },
              display: selectedMedia.length > 3 ? "block" : "none"
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <Box 
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              gap: "16px",
              p: 1,
              scrollBehavior: "smooth",
            }}
          >
            {selectedMedia.map((media) => (
              <Box 
                key={media.tmdb_id || media.id} 
                sx={{ 
                  position: "relative", 
                  // flex: "0 0 120px",
                  // width: "120px",
                  // minWidth: "120px",
                }}
              >
                <MediaCard mediaData={{...media}} />
                <IconButton
                  onClick={() => handleRemove(media.tmdb_id || media.id)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(255,255,255,0.7)",
                    "&:hover": { background: "rgba(255,255,255,1)" },
                  }}
                  size="small"
                >
                  <Close fontSize="small" />
                </IconButton>
                {/* Rating Slider */}
                <Box sx={{ mt: 1, px: 1 }}>
                  <Slider
                    value={media.rating}
                    min={1}
                    max={5}
                    step={0.5}
                    onChange={(_, value) => handleRatingChange(media.tmdb_id || media.id, value)}
                    valueLabelDisplay="auto"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          <IconButton 
            onClick={scrollRight} 
            sx={{ 
              position: "absolute", 
              right: "-20px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              background: "rgba(255,255,255,0.7)", 
              "&:hover": { background: "rgba(255,255,255,1)" },
              display: selectedMedia.length > 3 ? "block" : "none"
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      )}

      {/* Get Recommendations Button */}
      {selectedMedia.length > 0 && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button variant="contained" onClick={handleGetRecommendations}>
            Get Recommendations
          </Button>
        </Box>
      )}

      {/* Recommendations Showcase */}
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", mt: 3 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <MovieLoader />
          </Box>
        )}
        {recommendations.length > 0 ? (
          <MediaShowcase
            key={showcaseKey}
            data={recommendations.map((media) => ({
              ...media,
              mediaType: media.mediaType || "movie",
              vote_average: Number(media.vote_average) || 0,
              year: media.release_date ? new Date(media.release_date).getFullYear() : "N/A",
            }))}
            detailsLink={(media) => `/details/${media.mediaType}/${media.tmdb_id || media.id}`}
            customItemsPerView={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          />
        ) : (
          hasFetched && !loading && recommendations.length === 0 && (
            <Typography align="center">No recommendations found.</Typography>
          )
        )}
      </Box>
    </>
  );
};

export default SearchRateAndRecommendationsPage;