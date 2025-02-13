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
  Send, 
  ChevronRight, 
  Bookmark
} from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';
import api from "@src/utils/api";
import useFetchData from '@src/hooks/useFetchData';

const mediaTypes = ["movie", "tv"];

const ExploraChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'system', content: 'Greetings, what do you like to watch?' }
  ]);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentStep, setCurrentStep] = useState('mediaType-selection');
  const [previousStep, setPreviousStep] = useState(null);
  const [availableMovies, setAvailableMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const chatEndRef = useRef(null);

  const { data: genreList, loading: genreLoading } = useFetchData(
    selectedMediaType && currentStep === 'genre-selection'
      ? `/media/genre/${selectedMediaType}/list`
      : null
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleMediaTypeSelect = (mediaType) => {
    setSelectedMediaType(mediaType);
    setSelectedGenres([]);
  };

  const handleMediaTypeSubmit = async () => {
    if (!selectedMediaType) return;

    setPreviousMessages([...messages]);
    setMessages([
      ...messages,
      { sender: 'user', content: `I prefer watching ${selectedMediaType}s` },
      { sender: 'system', content: 'Which genres do you like most?' }
    ]);
    setPreviousStep('mediaType-selection');
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
  
    setPreviousMessages([...messages]);
    setMessages([
      ...messages,
      { sender: 'user', content: selectedGenres.map(g => g.name).join(', ') },
      { sender: 'system', content: 'Thinking...' }
    ]);
  
    setIsLoading(true);
    try {
      const genreId = selectedGenres.map(g => g.id).join(',');
      const fetchGenreURL = `/media/discover/${selectedMediaType}?with_genres=${genreId}`;
  
      const response = await api.get(fetchGenreURL);
  
      if (response.status === 'success' && response.data.length > 0) {
        const movies = response.data;
        
        setAvailableMovies(movies);
  
        setCurrentMovieIndex(0);
        setPreviousMessages([...messages]);
        setMessages(messages => messages.slice(0, -1).concat(
          { sender: 'system', content: `Rate this ${selectedMediaType} please` }
        ));
        setPreviousStep('genre-selection');
        setCurrentStep('rating');
      } else {
        throw new Error('No valid movie data');
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

  const handleRating = async () => {
    const movie = availableMovies[currentMovieIndex];
    const updatedRatedMovies = [...ratedMovies, { tmdb_id: movie.id, rating: currentRating }];
    console.log('Rated movies:', updatedRatedMovies);
    setRatedMovies(updatedRatedMovies);
    setCurrentRating(0);
  
    setMessages([
      ...messages,
      { 
        sender: 'user', 
        content: `Rated ${movie.title}: ${currentRating} stars`
      },
      { sender: 'system', content: 'Rate this movie please' }
    ]);
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
  };

  // const handleRating = async () => {
  //   const movie = availableMovies[currentMovieIndex];
  //   const updatedRatedMovies = [...ratedMovies, { tmdb_id: movie.id, rating: currentRating }];
  //   console.log('Rated movies:', updatedRatedMovies);
  //   setRatedMovies(updatedRatedMovies);
  //   setCurrentRating(0);
  
  //   if (updatedRatedMovies.length >= 5) {
  //     setPreviousMessages([...messages]);
  //     setMessages([
  //       ...messages,
  //       { 
  //         sender: 'user', 
  //         content: `Rated ${movie.title}: ${currentRating} stars`
  //       },
  //       { sender: 'system', content: 'Thinking...' }
  //     ]);
  
  //     try {
  //       const ratedMoviesMap = updatedRatedMovies.reduce((acc, movie) => {
  //         acc[movie.id] = movie.rating;
  //         return acc;
  //       }, {});
  
  //       const response = await api.post(`recommender/recommendations`, ratedMoviesMap);
  //       const recommendations = response.data;
  //       setRecommendedMovies(recommendations);
  //       setPreviousStep('rating');
  //       setCurrentStep('recommendations');
  //       setMessages(messages => messages.slice(0, -1).concat(
  //         { sender: 'system', content: 'Based on your ratings, you might enjoy these movies:' }
  //       ));
  //     } catch (error) {
  //       console.error('Error getting recommendations:', error);
  //     }
  //   } else {
  //     setMessages([
  //       ...messages,
  //       { 
  //         sender: 'user', 
  //         content: `Rated ${movie.title}: ${currentRating} stars`
  //       },
  //       { sender: 'system', content: 'Rate this movie please' }
  //     ]);
  //     setCurrentMovieIndex(prevIndex => prevIndex + 1);
  //   }
  // };

  const handleHaventWatched = () => {
    const currentMovie = availableMovies[currentMovieIndex];
    setMessages([
      ...messages,
      { sender: 'user', content: `Haven't watched ${currentMovie.title}` },
      { sender: 'system', content: 'Rate this movie please' }
    ]);
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
    setCurrentRating(0); // Reset the rating component
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendationIndex(prev => 
      prev + 3 >= recommendedMovies.length ? 0 : prev + 3
    );
  };

  const handleSaveToWatchlist = () => {
    alert('Please register to save to watchlist');
  };

  const handlePreviousStep = () => {
    setMessages(previousMessages);
    setCurrentStep(previousStep);
  };

  const handleGetRecommendations = async () => {
    try {
      const ratings = ratedMovies.reduce((acc, movie) => {
        acc[movie.tmdb_id] = movie.rating;
        return acc;
      }, {});
  
      const payload = {
        mediaType: selectedMediaType,
        ratings: ratings
      };
  
      const response = await api.post(`recommender/collaborative/recommendations`, payload);
      const recommendations = response.data;
      setRecommendedMovies(recommendations);
      setPreviousStep('rating');
      setCurrentStep('recommendations');
      setMessages(messages => messages.slice(0, -1).concat(
        { sender: 'system', content: 'Based on your ratings, you might enjoy these movies:' }
      ));
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
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
          bgcolor: message.sender === 'user' ? 'error.dark' : 'background.secondary',
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
                {genreList?.genres.map((genre) => (
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
            {previousStep && (
              <Button 
                variant="outlined" 
                onClick={handlePreviousStep}
                sx={{ mt: 2 }}
              >
                Previous step
              </Button>
            )}
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
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MediaCard mediaData={currentMovie} />
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Rating
                value={currentRating}
                onChange={(_, value) => setCurrentRating(value)}
                size="large"
              />
              <Button 
                variant="contained" 
                onClick={handleRating}
                sx={{ ml: 2 }}
              >
                Submit
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={handleHaventWatched}
              >
                Haven't watched
              </Button>
              {previousStep && (
                <Button 
                  variant="outlined" 
                  onClick={handlePreviousStep}
                >
                  Previous step
                </Button>
              )}
            </Stack>
            {ratedMovies.length >= 5 && (
              <Button 
                variant="contained" 
                onClick={handleGetRecommendations}
                sx={{ mt: 2 }}
              >
                Get Recommendations
              </Button>
            )}
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
            {previousStep && (
              <Button 
                variant="outlined" 
                onClick={handlePreviousStep}
                sx={{ mt: 2 }}
              >
                Previous step
              </Button>
            )}
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