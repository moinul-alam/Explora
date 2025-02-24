import { Chip, Stack, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';

const MediaTypeSelector = ({ selectedMediaType, onSelect, onSubmit }) => {
  const mediaTypes = ["movie", "tv"];

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {mediaTypes.map((type) => (
        <Chip
          key={type}
          label={type.toUpperCase()}
          onClick={() => onSelect(type)}
          color={selectedMediaType === type ? "primary" : "default"}
          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'primary.light' } }}
        />
      ))}
      <IconButton onClick={onSubmit} disabled={!selectedMediaType} sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Send />
      </IconButton>
    </Stack>
  );
};

export default MediaTypeSelector;
