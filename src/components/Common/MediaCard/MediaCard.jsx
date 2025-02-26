import { Box, Typography } from "@mui/material";
import RatingBadge from "@src/components/Common/MediaCard/RatingBadge";
import YearBadge from "@src/components/Common/MediaCard/YearBadge";
import MediaOverview from "@src/components/Common/MediaCard/MediaOverview";
import GenreBadge from "@src/components/Common/MediaCard/GenreBadge";
import FallbackImage from "@src/assets/fallback-image.png";
import { useState } from "react";

const MediaCard = ({ mediaData = {} }) => {
  // Safely handle potentially undefined mediaData
  if (!mediaData) {
    mediaData = {};
  }
  
  const { 
    title, 
    name, 
    poster_path, 
    overview = '', 
    vote_average, 
    release_date, 
    first_air_date, 
    genres = [] 
  } = mediaData;
  
  const displayTitle = title || name || "Untitled";
  const [isHovering, setIsHovering] = useState(false);
  
  // Determine media type safely
  const mediaType = title ? "movie" : "tv";
  
  // Safe check for genres array
  const safeGenres = Array.isArray(genres) ? genres : [];

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "10rem", sm: "12.5rem", md: "15rem" },
        margin: "0.5rem",
        cursor: "pointer",
        transition: "transform 0.5s ease, box-shadow 0.3s ease, border 0.3s ease",
        border: "2px solid transparent",
        borderRadius: "0.625rem",
        "&:hover": { 
          transform: "scale(1.05)", 
          border: "2px solid #00bcd4",
          boxShadow: "0px 0px 15px rgba(0, 188, 212, 0.8)"
        },
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Poster */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "15rem", sm: "18rem", md: "20rem" },
          backgroundImage: `url(${poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : FallbackImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0.625rem 0.625rem 0 0",
          overflow: "hidden",
          boxShadow: "0px 0.25rem 0.625rem rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Only render if vote_average exists and is a number */}
        {typeof vote_average === 'number' && <RatingBadge rating={vote_average} />}
        
        {/* Only render if there's a valid date */}
        {(release_date || first_air_date) && (
          <YearBadge year={release_date || first_air_date} />
        )}
        
        {/* Only render overview if it exists */}
        {overview && <MediaOverview overview={overview} />}
        
        {/* Genre badge with position and hover styling */}
        {safeGenres.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              opacity: isHovering ? 1 : 0,
              visibility: isHovering ? "visible" : "hidden",
              transition: "opacity 0.3s ease, visibility 0.3s ease",
              zIndex: 3,
            }}
          >
            <GenreBadge genres={safeGenres} mediaType={mediaType} />
          </Box>
        )}
      </Box>

      {/* Title */}
      <Box
        sx={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "0 0 0.625rem 0.625rem",
          boxShadow: "0px 0.25rem 0.625rem rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default MediaCard;