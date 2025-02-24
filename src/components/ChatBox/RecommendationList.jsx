import { Stack, Button } from '@mui/material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const RecommendationList = ({ recommendations, onNext, onSeen }) => (
  <Stack spacing={2} alignItems="center">
    {recommendations.slice(0, 3).map((movie) => (
      <MediaCard key={movie.id} movie={movie} />
    ))}
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={onNext}>Next</Button>
    </Stack>
  </Stack>
);

export default RecommendationList;
