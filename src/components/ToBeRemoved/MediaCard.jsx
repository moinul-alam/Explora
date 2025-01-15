import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Star } from '@mui/icons-material';

const MediaCard = ({
  mediaData,
  imagePath = 'poster_path', // Default key for image path
  baseImageUrl = 'https://image.tmdb.org/t/p/w500', // Default base URL
  fallbackImageUrl = '@src/assets/fallback-image.png', // Fallback image
  title = mediaData?.title || mediaData?.original_title, // Default title logic
  imageSize = '100%', // Default image size
  overlayEffect = false, // Default to true, allow overlay on media card
  mediaType = 'movie', // Media type (movie, tv, person)
  releaseYear = mediaData?.release_date?.slice(0, 4), // Extract year from release date
  showReleaseYear = true, // Prop to toggle display of release year
  rating = mediaData?.vote_average, // Rating for media
  showRating = true, // Prop to toggle display of rating
}) => {
  const imageUrl = mediaData[imagePath]
    ? `${baseImageUrl}${mediaData[imagePath]}`
    : fallbackImageUrl;

  const mediaId = mediaData?.id;

  // Dynamic routing for details page
  const detailsUrl = `/details/${mediaType}/${mediaId}`;

  return (
    <Link to={detailsUrl} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: { xs: 0, sm: 2 }, // Remove padding for single media and add for multiple
          cursor: 'pointer',
          borderRadius: '8px', // Optional: border-radius for a rounded look
          overflow: 'hidden', // Ensure content stays within the card boundaries
        }}
      >
        {/* Image */}
        <img
          src={imageUrl}
          alt={title || 'Media'}
          style={{
            width: imageSize,
            borderRadius: '8px',
            objectFit: 'cover',
            maxHeight: '350px',
          }}
        />

        {/* Overlay Effect */}
        {overlayEffect && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)', // Dim background with overlay
              zIndex: 1,
            }}
          />
        )}

        {/* Release Year */}
        {showReleaseYear && releaseYear && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              padding: '5px 10px',
              background: 'rgba(0, 0, 0, 0.7)', // Dark background for better visibility
              color: 'white',
              borderRadius: '20px',
              fontWeight: 'bold',
              zIndex: 2,
            }}
          >
            {releaseYear}
          </Box>
        )}

        {/* Rating */}
        {showRating && rating && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              padding: '5px 10px',
              background: 'rgba(0, 0, 0, 0.7)', // Dark background for better visibility
              color: 'white',
              borderRadius: '20px',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Star sx={{ color: 'gold', fontSize: '1.2rem', marginRight: '5px' }} />
            {rating}
          </Box>
        )}

        {/* Title Below Card */}
        {title && (
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              textAlign: 'center',
              fontWeight: 'bold',
              width: '100%',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Optional: background for better text visibility
              color: 'white',
              borderRadius: '20px', // Rounded rectangle for the title
            }}
          >
            {title}
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default MediaCard;
