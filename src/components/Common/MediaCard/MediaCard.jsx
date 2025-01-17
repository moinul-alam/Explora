import { Box, Typography } from '@mui/material';
import RatingBadge from '@src/components/Common/MediaCard/RatingBadge';
import YearBadge from '@src/components/Common/MediaCard/YearBadge';
import MediaOverview from '@src/components/Common/MediaCard/MediaOverview';

const MediaCard = ({ mediaData, onClick }) => {
  const { title, name, poster_path, overview, vote_average, release_date, first_air_date } = mediaData;
  const displayTitle = title || name;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        width: { xs: '10rem', sm: '12.5rem', md: '15rem' },
        margin: '0.5rem',
        cursor: 'pointer',
        transition: 'transform 0.5s ease',
        '&:hover': { transform: 'scale(1.05)' },
      }}
    >
      {/* Poster */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '15rem', sm: '18rem', md: '20rem' },
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path || '/fallback.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0.625rem 0.625rem 0 0',
          overflow: 'hidden',
          boxShadow: '0px 0.25rem 0.625rem rgba(0, 0, 0, 0.3)',
        }}
      >
        <RatingBadge rating={vote_average} />
        <YearBadge year={release_date || first_air_date} />
        <MediaOverview overview={overview} />
      </Box>

      {/* Title */}
      <Box
        sx={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0 0 0.625rem 0.625rem',
          boxShadow: '0px 0.25rem 0.625rem rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }, 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default MediaCard;
