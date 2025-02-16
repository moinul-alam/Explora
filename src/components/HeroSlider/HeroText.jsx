import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroText = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: 1,
        px: 2,
      }}
    >
      <Typography
        variant='h2'
        sx={{
          mb: 2,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        Welcome to EXPLORA
      </Typography>
      <Typography
        variant='h5'
        sx={{
          mt: 2,
          maxWidth: '35rem',
          lineHeight: 1.5,
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        }}
      >
        Discover movies and TV shows with AI-powered recommendation engine.
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#8B0000',
            color: 'white',
            px: 4,
            py: 1,
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#E50914' },
          }}
          onClick={() => navigate('/recommender')}
        >
          Try Now
        </Button>
        <Button
          variant='outlined'
          sx={{
            borderColor: 'white',
            color: 'white',
            px: 4,
            py: 1,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'white',
            },
          }}
          onClick={() => navigate('/about')}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default HeroText;
