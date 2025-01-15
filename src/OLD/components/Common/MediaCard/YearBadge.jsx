import React from 'react';
import { Box, Typography } from '@mui/material';

const YearBadge = ({ year }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '1px',
      left: '1px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5px',
      borderRadius: '10px',
    }}
  >
    <Typography variant="h6" sx={{ fontSize: '1rem' }}>
      {year ? new Date(year).getFullYear() : 'Unknown'}
    </Typography>
  </Box>
);

export default YearBadge;
