import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Chip, 
  IconButton, 
  Paper, 
  Typography,
  Rating,
  Stack,
  Button,
  CircularProgress
} from '@mui/material';
import { 
  Favorite, 
  Send, 
  ChevronRight, 
  Bookmark,
  FavoriteBorder 
} from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';
import api from "@src/utils/api";
import useFetchData from '@src/hooks/useFetchData';

const mediaTypes = ["movie", "tv"];

const ExploraChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'system', content: 'Greetings, what do you like to watch?' }
  ]);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentStep, setCurrentStep] = useState('mediaType-selection');
  const [ratedMovies, setRatedMovies] = useState([]);
  const [availableMovies, setAvailableMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Only fetch genres when media type is selected AND we're in genre-selection step
  const { data: genreData, loading: genreLoading } = useFetchData(
    selectedMediaType && currentStep === 'genre-selection' 
      ? `/media/genre/${selectedMediaType}/list` 
      : null
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMediaTypeSelect = (mediaType) => {
    setSelectedMediaType(mediaType);
    setSelectedGenres([]); // Reset selected genres when media type changes
  };

  const handleMediaTypeSubmit = async () => {
    if (!selectedMediaType) return;

    setMessages([
      ...messages,
      { sender: 'user', content: `I prefer watching ${selectedMediaType}s` },
      { sender: 'system', content: 'Which genres do you like most?' }
    ]);
    setCurrentStep('genre-selection');
  };

  const handleGenreSelect = (genre) => {
    if (selectedGenres.some(g => g.id === genre.id)) {
      setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleGenreSubmit = async () => {
    if (selectedGenres.length === 0) return;

    setMessages([
      ...messages,
      { sender: 'user', content: selectedGenres.map(g => g.name).join(', ') },
      { sender: 'system', content: 'Thinking...' }
    ]);

    setIsLoading(true);
    try {
      const genreIds = selectedGenres.map(g => g.id).join(',');
      const fetchGenreURL = `/media/discover/${selectedMediaType}?with_genres=${genreIds}`;
      const response = await api.get(fetchGenreURL);
      
      // Check if we have a successful response with data
      if (response.data.status === 'success' && Array.isArray(response.data.data)) {
        const movies = response.data.data;
        
        if (movies.length === 0) {
          throw new Error('No movies found');
        }

        setAvailableMovies(movies);

        setCurrentMovieIndex(0);
        setMessages(messages => messages.slice(0, -1).concat(
          { sender: 'system', content: `Rate this ${selectedMediaType} please` }
        ));
        setCurrentStep('rating');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessages(messages => messages.slice(0, -1).concat(
        { sender: 'system', content: 'Sorry, I had trouble finding movies. Please try different genres.' }
      ));
      setCurrentStep('genre-selection');
    }
    setIsLoading(false);
  };

  const handleRating = async (movie, rating, liked = false) => {
    const updatedRatedMovies = [...ratedMovies, { ...movie, rating, liked }];
    setRatedMovies(updatedRatedMovies);

    if (updatedRatedMovies.length >= 5) {
      setMessages([
        ...messages,
        { 
          sender: 'user', 
          content: `Rated ${movie.title}: ${rating} stars${liked ? ' ❤️' : ''}`
        },
        { sender: 'system', content: 'Thinking...' }
      ]);

      try {
        const response = await api.post(`recommender/recommendations`, {
          updatedRatedMovies
        });
        const recommendations = response.data;
        setRecommendedMovies(recommendations);
        setCurrentStep('recommendations');
        setMessages(messages => messages.slice(0, -1).concat(
          { sender: 'system', content: 'Based on your ratings, you might enjoy these movies:' }
        ));
      } catch (error) {
        console.error('Error getting recommendations:', error);
      }
    } else {
      setMessages([
        ...messages,
        { 
          sender: 'user', 
          content: `Rated ${movie.title}: ${rating} stars${liked ? ' ❤️' : ''}`
        },
        { sender: 'system', content: 'Rate this movie please' }
      ]);
      setCurrentMovieIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleHaventWatched = () => {
    const currentMovie = availableMovies[currentMovieIndex];
    setMessages([
      ...messages,
      { sender: 'user', content: `Haven't watched ${currentMovie.title}` },
      { sender: 'system', content: 'Rate this movie please' }
    ]);
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendationIndex(prev => 
      prev + 3 >= recommendedMovies.length ? 0 : prev + 3
    );
  };

  const handleSaveToWatchlist = () => {
    alert('Please register to save to watchlist');
  };

  const renderMessage = (message, index) => (
    <Box
      key={index}
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
        mb: 2
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          bgcolor: message.sender === 'user' ? 'primary.light' : 'background.warning',
          borderRadius: 2
        }}
      >
        <Typography>{message.content}</Typography>
      </Paper>
    </Box>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'mediaType-selection':
        return (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {mediaTypes.map((mediaType) => (
                <Chip
                  key={mediaType}
                  label={mediaType.toUpperCase()}
                  onClick={() => handleMediaTypeSelect(mediaType)}
                  color={selectedMediaType === mediaType ? "primary" : "default"}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
            <IconButton 
              onClick={handleMediaTypeSubmit}
              disabled={!selectedMediaType}
              sx={{ mt: 2 }}
            >
              <Send />
            </IconButton>
          </Box>
        );

      case 'genre-selection':
        return (
          <Box sx={{ mt: 2 }}>
            {genreLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {genreData?.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    onClick={() => handleGenreSelect(genre)}
                    color={selectedGenres.some(g => g.id === genre.id) ? "primary" : "default"}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            )}
            <IconButton 
              onClick={handleGenreSubmit}
              disabled={selectedGenres.length === 0 || genreLoading}
              sx={{ mt: 2 }}
            >
              <Send />
            </IconButton>
          </Box>
        );

      case 'rating':
        if (isLoading) {
          return <CircularProgress />;
        }
        
        if (!availableMovies || !availableMovies[currentMovieIndex]) {
          return (
            <Typography color="error">
              No more movies available. Please try different genres.
            </Typography>
          );
        }

        const currentMovie = availableMovies[currentMovieIndex];
        return (
          <Box sx={{ mt: 2 }}>
            <MediaCard mediaData={currentMovie} />
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <IconButton onClick={() => handleRating(currentMovie, 0, true)}>
                <Favorite color="error" />
              </IconButton>
              <Rating
                onChange={(_, value) => handleRating(currentMovie, value)}
                size="large"
              />
              <Button 
                variant="outlined" 
                onClick={handleHaventWatched}
              >
                Haven't watched
              </Button>
            </Stack>
          </Box>
        );

      case 'recommendations':
        return (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {recommendedMovies
                .slice(currentRecommendationIndex, currentRecommendationIndex + 3)
                .map((movie) => (
                  <Box key={movie.id} sx={{ position: 'relative' }}>
                    <MediaCard mediaData={movie} />
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button 
                        variant="outlined" 
                        onClick={() => setCurrentRecommendationIndex(prev => 
                          prev + 1 >= recommendedMovies.length ? 0 : prev + 1
                        )}
                      >
                        Watched already
                      </Button>
                      <IconButton onClick={handleSaveToWatchlist}>
                        <Bookmark />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
            </Stack>
            <Button 
              variant="contained" 
              onClick={handleNextRecommendation}
              sx={{ mt: 2 }}
              endIcon={<ChevronRight />}
            >
              Show next
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      p: 2,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper 
        elevation={3}
        sx={{
          flex: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 32px)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          mb: 2
        }}>
          {messages.map((message, index) => renderMessage(message, index))}
          <div ref={chatEndRef} />
        </Box>
        {renderCurrentStep()}
      </Paper>
    </Box>
  );
};

export default ExploraChat;