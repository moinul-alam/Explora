import React from 'react';
import { Button, Grid, Typography, Container } from '@mui/material';
import { Theaters, MovieFilter, Chat, Favorite } from '@mui/icons-material';

const RecommenderPage = () => {
  const buttonStyles = {
    height: 120,
    fontSize: '1.1rem',
    fontWeight: 500,
    borderRadius: 2,
    textTransform: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: 3,
    '&:hover': {
      transform: 'translateY(-2px)',
      transition: 'transform 0.2s ease-in-out'
    }
  };

  const featureCards = [
    {
      title: 'Find Similar Movies',
      description: 'Discover movies similar to your favorites',
      icon: <Theaters sx={{ fontSize: 40 }} />,
      color: 'primary',
      href: '/explore/similar'
    },
    {
      title: 'Discover Movies',
      description: 'Explore new movies based on your interests',
      icon: <MovieFilter sx={{ fontSize: 40 }} />,
      color: 'secondary',
      href: '/explore/discover'
    },
    {
      title: 'Chat for Recommendations',
      description: 'Get personalized recommendations through chat',
      icon: <Chat sx={{ fontSize: 40 }} />,
      color: 'success',
      href: '/chat_recommender'
    },
    {
      title: 'Select & Get Recommendations',
      description: 'Select favorite movies to receive tailored suggestions',
      icon: <Favorite sx={{ fontSize: 40 }} />,
      color: 'warning',
      href: '/search_recommender'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 2,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}
      >
        Movie Recommendations
      </Typography>
      
      <Typography 
        variant="h6" 
        align="center" 
        sx={{ 
          mb: 6,
          color: 'text.secondary',
          maxWidth: 600,
          mx: 'auto'
        }}
      >
        Discover your next favorite movie through our personalized recommendation features
      </Typography>

      <Grid container spacing={4}>
        {featureCards.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <a 
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="contained"
                fullWidth
                color={card.color}
                sx={buttonStyles}
              >
                {card.icon}
                <div>
                  <Typography variant="h6" component="div">
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
                </div>
              </Button>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecommenderPage;