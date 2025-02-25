import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroText = () => {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: 1,
        px: 3,
      }}
    >
      <Typography
        component={motion.h2}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        variant='h2'
        sx={{
          mb: 2,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
        }}
      >
        Welcome to <span style={{ color: '#E50914' }}>Explora</span>
      </Typography>
      <Typography
        component={motion.h5}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
        variant='h5'
        sx={{
          mt: 2,
          maxWidth: '40rem',
          lineHeight: 1.6,
          fontSize: '1.3rem',
          opacity: 0.9,
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Your personal AI-powered guide to discovering the best movies and TV shows.
      </Typography>
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
        sx={{ mt: 4, display: 'flex', gap: 2 }}
      >
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#E50914',
            color: 'white',
            px: 5,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': { backgroundColor: '#B20710', transform: 'scale(1.05)' },
          }}
          onClick={() => navigate('/explore/recommenders')}
        >
          Start Exploring
        </Button>
        <Button
          variant='outlined'
          sx={{
            borderColor: 'white',
            color: 'white',
            px: 5,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'white',
              transform: 'scale(1.05)',
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
