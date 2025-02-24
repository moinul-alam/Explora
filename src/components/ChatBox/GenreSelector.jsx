import { Chip, Stack, CircularProgress, Button } from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';

const GenreSelector = ({ genres, selectedGenres, onSelect, onSubmit, onBack, isLoading }) => (
  <Stack justifyContent="center" spacing={2}>
    {isLoading ? <CircularProgress size={24} /> : (
      <Stack direction="row" flexWrap="wrap" justifyContent="center">
        {genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            onClick={() => onSelect(genre)}
            color={selectedGenres.some(g => g.id === genre.id) ? "primary" : "default"}
            disabled={selectedGenres.length >= 3 && !selectedGenres.some(g => g.id === genre.id)}
          />
        ))}
      </Stack>
    )}
    <Stack direction="row" justifyContent="center">
      <Button onClick={onBack} startIcon={<ArrowBack />} disabled={!onBack}>Back</Button>
      <Button onClick={onSubmit} startIcon={<Send />} disabled={selectedGenres.length === 0 || isLoading}>Next</Button>
    </Stack>
  </Stack>
);

export default GenreSelector;
