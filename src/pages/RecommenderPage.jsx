import React from 'react';
import { Button, Grid, Typography, Container, Box } from '@mui/material';
import { Movie, CameraRoll, Theaters, MovieFilter, Chat, Favorite, Star, LocalMovies, GridOn } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

// Define a subtle animation for the buttons
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const RecommenderPage = () => {
  const buttonStyles = {
    height: 140,
    fontSize: '1.1rem',
    fontWeight: 500,
    borderRadius: 2,
    textTransform: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: 3,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      animation: `${floatAnimation} 3s ease-in-out infinite`
    }
  };

  const featureCards = [
    {
      title: 'Similar Movies',
      description: 'Find similar movies to your favorite ones',
      icon: <Movie sx={{ fontSize: 40 }} />,
      color: 'success',
      href: '/explore/similar'
    },
    {
      title: 'Discover Movies',
      description: 'Discover a movie by providing a brief description',
      icon: <MovieFilter sx={{ fontSize: 40 }} />,
      color: 'success',
      href: '/explore/discover'
    },
    {
      title: 'Chat with Explora',
      description: 'Get personalized recommendations through chat',
      icon: <Chat sx={{ fontSize: 40 }} />,
      color: 'warning',
      href: '/explore/user_chat_recommender'
    },
    {
      title: 'Select & Get Recommendations',
      description: 'Select favorite movies to receive tailored suggestions',
      icon: <Favorite sx={{ fontSize: 40 }} />,
      color: 'warning',
      href: '/explore/favorite_item_recommender'
    },
    {
      title: 'Select, Rate & Get Recommendations',
      description: 'Rate favorite movies to receive tailored suggestions',
      icon: <Star sx={{ fontSize: 40 }} />,
      color: 'error',
      href: '/explore/user_rating_recommender'
    },
    {
      title: 'Advanced Recommendations',
      description: 'Rate favorite movies to receive tailored suggestions',
      icon: <GridOn sx={{ fontSize: 40 }} />,
      color: 'error',
      href: '/explore/weighed_hybrid_recommender'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Movie Recommendations
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Discover your next favorite movie through our personalized recommendation features
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {featureCards.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <Box
              component="a"
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <Button
                variant="contained"
                fullWidth
                color={card.color}
                sx={buttonStyles}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  {card.icon}
                  <Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1,
                        opacity: 0.9,
                        color: 'inherit'
                      }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecommenderPage;