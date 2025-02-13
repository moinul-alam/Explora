import { Box, Stack, Chip, IconButton, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';

const MediaTypeSelection = ({ mediaTypes = [], selectedMediaType, onSelect, onSubmit }) => {
  // Show a loading indicator if mediaTypes is not loaded yet
  if (!mediaTypes || mediaTypes.length === 0) {
    return (
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <CircularProgress size={24} />
        <Box mt={1}>Loading media types...</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {mediaTypes.map((mediaType) => (
          <Chip
            key={mediaType}
            label={mediaType.toUpperCase()}
            onClick={() => onSelect(mediaType)}
            color={selectedMediaType === mediaType ? 'primary' : 'default'}
            sx={{ m: 0.5 }}
          />
        ))}
      </Stack>
      <IconButton onClick={onSubmit} disabled={!selectedMediaType} sx={{ mt: 2 }}>
        <Send />
      </IconButton>
    </Box>
  );
};

export default MediaTypeSelection;
