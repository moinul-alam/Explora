import { Box, Stack, Button, IconButton } from '@mui/material';
import { Bookmark, ChevronRight } from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const Recommendations = ({ recommendations, currentIndex, onNext, onSave }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {recommendations.slice(currentIndex, currentIndex + 3).map((movie) => (
          <Box key={movie.id} sx={{ position: 'relative' }}>
            <MediaCard mediaData={movie} />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button variant="outlined" onClick={onNext}>
                Watched already
              </Button>
              <IconButton onClick={onSave}>
                <Bookmark />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Button variant="contained" onClick={onNext} sx={{ mt: 2 }} endIcon={<ChevronRight />}>
        Show next
      </Button>
    </Box>
  );
};

export default Recommendations;
