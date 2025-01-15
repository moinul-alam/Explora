// MediaOverview.js
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

const MediaOverview = ({ overview }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        color: 'white',
        padding: '1rem',
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
        opacity: isHovered ? 1 : 0,
        display: 'flex',
        alignItems: 'flex-end',
        '&:hover': {
          opacity: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: '1rem',
          lineHeight: '2rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
          textAlign: 'center',
        }}
      >
        {overview || 'No overview available'}
      </Typography>
    </Box>
  );
};

export default MediaOverview;