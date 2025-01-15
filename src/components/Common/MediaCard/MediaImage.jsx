import { Box } from '@mui/material';

const MediaImage = ({ posterPath, children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '300px',
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${posterPath || '/fallback.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        '&:hover .love-button': {
          opacity: 1,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default MediaImage;
