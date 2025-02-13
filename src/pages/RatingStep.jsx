import { Box, Stack, IconButton, Rating, Button, CircularProgress } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const RatingStep = ({ isLoading, movie, onRate, onHaventWatched }) => {
  if (isLoading) return <CircularProgress />;

  if (!movie) {
    return <Typography color="error">No more movies available. Please try different genres.</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <MediaCard mediaData={movie} />
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <IconButton onClick={() => onRate(movie, 0, true)}>
          <Favorite color="error" />
        </IconButton>
        <Rating onChange={(_, value) => onRate(movie, value)} size="large" />
        <Button variant="outlined" onClick={onHaventWatched}>
          Haven't watched
        </Button>
      </Stack>
    </Box>
  );
};

export default RatingStep;
