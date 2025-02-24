import { Box, Typography, Rating, Button } from '@mui/material';

const MovieRating = ({ movie, currentRating, onRate, onSkip }) => (
  <Box textAlign="center">
    <Typography variant="h6">{movie.title || movie.name}</Typography>
    <Rating value={currentRating} onChange={(e, newValue) => onRate(newValue)} />
    <Box mt={2}>
      <Button variant="contained" onClick={() => onRate(currentRating)}>Rate</Button>
      <Button variant="text" onClick={onSkip}>Haven’t watched</Button>
    </Box>
  </Box>
);

export default MovieRating;
