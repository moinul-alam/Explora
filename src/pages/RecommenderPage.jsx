import React from 'react';
import { Button, Grid, Typography, Container, Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Movie, MovieFilter, Chat, Favorite, Star, GridOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { keyframes } from '@emotion/react';

// Define animations
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { opacity: 0.9; }
  50% { opacity: 1; }
  100% { opacity: 0.9; }
`;

const RecommenderPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Group cards by category
  const featureCards = [
    // Discovery group
    {
      title: 'Similar Movies',
      description: 'Find movies that match your favorites based on genre, cast, and style',
      icon: <Movie sx={{ fontSize: isMobile ? 36 : 48 }} />,
      color: '#3f51b5', // Indigo
      category: 'discovery',
      href: '/explore/similar'
    },
    {
      title: 'Discover Movies',
      description: `Describe what you're looking for and we'll find the perfect match`,
      icon: <MovieFilter sx={{ fontSize: isMobile ? 36 : 48 }} />,
      color: '#5c6bc0', // Lighter indigo
      category: 'discovery',
      href: '/explore/discover'
    },
    
    // Interactive group
    {
      title: 'Chat with Explora',
      description: 'Have a conversation with our AI to get tailored movie suggestions',
      icon: <Chat sx={{ fontSize: isMobile ? 36 : 48 }} />,
      color: '#f44336', // Red
      category: 'interactive',
      href: '/explore/user_chat_recommender'
    },
    {
      title: 'Select Favorites',
      description: `Pick your all-time favorites and we'll suggest what to watch next`,
      icon: <Favorite sx={{ fontSize: isMobile ? 36 : 48 }} />,
      color: '#e57373', // Lighter red
      category: 'interactive',
      href: '/explore/favorite_item_recommender'
    },
    
    // Advanced group
    {
      title: 'Rate & Get Suggestions',
      description: `Rate movies you've watched for smarter, personalized recommendations`,
      icon: <Star sx={{ fontSize: isMobile ? 36 : 48 }} />,
      color: '#2196f3', // Blue
      category: 'advanced',
      href: '/explore/user_rating_recommender'
    },
    {
      title: 'Advanced Recommender',
      description: 'Get recommendations from our most powerful recommendation engine',
      icon: <GridOn sx={{ fontSize: isMobile ? 36 : 48 }} />,
      color: '#64b5f6', // Lighter blue
      category: 'advanced',
      href: '/explore/advanced_hybrid_recommender'
    }
  ];

  // Group cards by their category
  const discoveryCards = featureCards.filter(card => card.category === 'discovery');
  const interactiveCards = featureCards.filter(card => card.category === 'interactive');
  const advancedCards = featureCards.filter(card => card.category === 'advanced');

  return (
    <Box sx={{ 
      background: isDarkMode 
        ? 'linear-gradient(135deg, #121212 0%, #212121 100%)' 
        : 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      color: isDarkMode ? 'white' : 'inherit',
      pt: 4,
      pb: 8
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: isMobile ? '240px' : '320px',
          mb: 6,
          overflow: 'hidden',
          borderRadius: 2,
          mx: 2,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            textAlign: 'center',
            px: 3
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              textShadow: isDarkMode 
                ? '0 2px 10px rgba(0,0,0,0.5)' 
                : '0 2px 10px rgba(0,0,0,0.2)',
              mb: 2,
              animation: `${pulseAnimation} 4s infinite ease-in-out`,
              color: isDarkMode ? 'white' : theme.palette.primary.main
            }}
          >
            Find Your Next Movie
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              opacity: 0.9,
              fontSize: isMobile ? '1rem' : '1.25rem',
              fontWeight: 400,
              color: 'white'
            }}
          >
            Personalized recommendations powered by AI to match your unique taste
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Categories layout */}
        <Box sx={{ mb: 8 }}>
          <CategorySection 
            title="Discover" 
            subtitle="Explore new movies based on what you already know and love" 
            cards={discoveryCards} 
            isMobile={isMobile}
            isDarkMode={isDarkMode}
            theme={theme}
          />
          
          <CategorySection 
            title="Interactive Recommendations" 
            subtitle="Engage with our system to get personalized suggestions" 
            cards={interactiveCards} 
            isMobile={isMobile} 
            isDarkMode={isDarkMode}
            theme={theme}
          />
          
          <CategorySection 
            title="Advanced Features" 
            subtitle="Fine-tune your movie recommendations with powerful tools" 
            cards={advancedCards} 
            isMobile={isMobile} 
            isDarkMode={isDarkMode}
            theme={theme}
          />
        </Box>
      </Container>
    </Box>
  );
};

// Helper component for category sections
const CategorySection = ({ title, subtitle, cards, isMobile, isDarkMode, theme }) => (
  <Box sx={{ mb: 8 }}>
    <Typography 
      variant={isMobile ? "h4" : "h3"} 
      sx={{ 
        mb: 1,
        fontWeight: 700,
        backgroundImage: 'linear-gradient(45deg, #64b5f6 10%, #2196f3 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {title}
    </Typography>
    
    <Typography 
      variant="body1" 
      sx={{ 
        mb: 4,
        color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
        fontSize: '1.1rem',
        maxWidth: '800px'
      }}
    >
      {subtitle}
    </Typography>
    
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} md={6} key={card.title}>
          <FeatureCard card={card} isMobile={isMobile} isDarkMode={isDarkMode} theme={theme} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

// Helper component for feature cards
const FeatureCard = ({ card, isMobile, isDarkMode, theme }) => {
  return (
    <Paper
      component={RouterLink}
      to={card.href}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        textAlign: isMobile ? 'center' : 'left',
        p: isMobile ? 3 : 4,
        borderRadius: 2,
        height: '100%',
        textDecoration: 'none',
        color: isDarkMode ? 'white' : theme.palette.text.primary,
        background: isDarkMode 
          ? `linear-gradient(135deg, ${card.color}50 0%, ${card.color}30 100%)` 
          : `linear-gradient(135deg, ${card.color}15 0%, ${card.color}10 100%)`,
        backdropFilter: 'blur(10px)',
        border: isDarkMode 
          ? `1px solid ${card.color}40` 
          : `1px solid ${card.color}30`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: isDarkMode 
            ? `0 12px 20px ${card.color}30` 
            : `0 12px 20px ${card.color}20`,
          border: isDarkMode 
            ? `1px solid ${card.color}60` 
            : `1px solid ${card.color}40`,
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? '100%' : '80px',
          height: isMobile ? '80px' : '100%',
          mb: isMobile ? 2 : 0,
          mr: isMobile ? 0 : 3,
          color: card.color,
          opacity: 0.9
        }}
      >
        {card.icon}
      </Box>
      
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{ 
            fontWeight: 600, 
            mb: 1, 
            color: isDarkMode ? 'white' : theme.palette.text.primary 
          }}
        >
          {card.title}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            opacity: 0.8,
            lineHeight: 1.6,
            fontSize: '0.95rem',
            color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'
          }}
        >
          {card.description}
        </Typography>
        
        <Button
          variant="text"
          sx={{
            mt: 2,
            color: card.color,
            fontWeight: 600,
            '&:hover': {
              background: `${card.color}20`
            }
          }}
        >
          Try Now
        </Button>
      </Box>
    </Paper>
  );
};

export default RecommenderPage;