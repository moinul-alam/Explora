import { Box, Stack, Chip, IconButton, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';

const GenreSelection = ({ genres, selectedGenres, loading, onSelect, onSubmit }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              onClick={() => onSelect(genre)}
              color={selectedGenres.some((g) => g.id === genre.id) ? 'primary' : 'default'}
              sx={{ m: 0.5 }}
            />
          ))}
        </Stack>
      )}
      <IconButton onClick={onSubmit} disabled={selectedGenres.length === 0 || loading} sx={{ mt: 2 }}>
        <Send />
      </IconButton>
    </Box>
  );
};

export default GenreSelection;
