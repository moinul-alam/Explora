import { Box } from '@mui/material';
import { MediaImage, RatingBadge, TitleOverlay, YearBadge } from '@src/components/Common/MediaCard/index';

const MediaCard = ({ mediaData, onClick }) => {
  const { title, name, poster_path, vote_average, release_date, first_air_date } = mediaData;
  const displayTitle = title || name;

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        minWidth: '200px',
        maxWidth: '250px',
        padding: '10px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.05)' },
      }}
    >
      <MediaImage posterPath={poster_path}>
        <RatingBadge rating={vote_average} />
        <YearBadge year={release_date || first_air_date} />
        <TitleOverlay title={displayTitle} />
      </MediaImage>
    </Box>
  );
};

export default MediaCard;
