import { Box, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

const RatingBadge = ({ rating }) => (
  <Box
    sx={{
      position: 'absolute',
      right: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'gold',
      padding: '0.3125rem',
      borderRadius: '0 0.625rem 0 0.625rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    }}
  >
    <Star sx={{ fontSize: '1.1rem' }} />
    <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
      {rating ? rating.toFixed(1) : ''}
    </Typography>
  </Box>
);

export default RatingBadge;
