import React from 'react';
import { Box, Typography } from '@mui/material';

const TitleOverlay = ({ title }) => (
  <Box
    sx={{
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      padding: '5px',
      width: '100%',
      textAlign: 'center',
    }}
  >
    <Typography variant="h6">{title}</Typography>
  </Box>
);

export default TitleOverlay;
