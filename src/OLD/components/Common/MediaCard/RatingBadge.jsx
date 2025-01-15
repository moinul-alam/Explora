import React from 'react';
import { Box, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';

const RatingBadge = ({ rating }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '1px',
      right: '1px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'gold',
      padding: '5px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}
  >
    <Star sx={{ fontSize: '1.1rem' }} />
    <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
      {rating ? rating.toFixed(1) : 'N/A'}
    </Typography>
  </Box>
);

export default RatingBadge;
