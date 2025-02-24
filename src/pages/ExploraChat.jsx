import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Chip, 
  IconButton, 
  Paper, 
  Typography,
  Rating,
  Stack,
  Button,
  CircularProgress,
  Fade
} from '@mui/material';
import { 
  Send, 
  ChevronRight, 
  Bookmark,
  ArrowBack
} from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';
import api from "@src/utils/api";
import useFetchData from '@src/hooks/useFetchData';

const mediaTypes = ["movie", "tv"];

const ExploraChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'system', content: 'What do you like to watch?' }
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
  const navigate = useNavigate();

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
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleGenreSubmit = async () => {
    if (selectedGenres.length === 0) return;
  
    setPreviousMessages([...messages]);
    setMessages([
      ...messages,
      { sender: 'user', content: `Selected genres: ${selectedGenres.map(g => g.name).join(', ')}` },
      { sender: 'system', content: 'Finding the best content for you...' }
    ]);
  
    setIsLoading(true);
    try {
      const genreId = selectedGenres.map(g => g.id).join(',');
      const fetchGenreURL = `/media/discover/${selectedMediaType}?with_genres=${genreId}`;
      
      const response = await api.get(fetchGenreURL);
  
      if (response.status === 'success' && response.data.length > 0) {
        setAvailableMovies(response.data);
        setCurrentMovieIndex(0);
        setPreviousMessages([...messages]);
        setMessages(messages => messages.slice(0, -1).concat(
          { sender: 'system', content: `How would you rate this ${selectedMediaType}?` }
        ));
        setPreviousStep('genre-selection');
        setCurrentStep('rating');
      } else {
        throw new Error('No valid movie data');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessages(messages => messages.slice(0, -1).concat(
        { sender: 'system', content: 'Sorry, I had trouble finding content. Please try different genres.' }
      ));
      setCurrentStep('genre-selection');
    }
    setIsLoading(false);
  };

  const handleRating = async () => {
    if (!currentRating) return;

    const movie = availableMovies[currentMovieIndex];
    const updatedRatedMovies = [...ratedMovies, { tmdb_id: movie.id, rating: currentRating }];
    setRatedMovies(updatedRatedMovies);
    setCurrentRating(0);
  
    setMessages([
      ...messages,
      { 
        sender: 'user', 
        content: `Rated ${movie.title || movie.name}: ${currentRating} stars`
      },
      { 
        sender: 'system', 
        content: updatedRatedMovies.length >= 5 
          ? 'Great! Want to see your recommendations now?'
          : 'How about this one?' 
      }
    ]);
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
  };

  const handleHaventWatched = () => {
    const currentMovie = availableMovies[currentMovieIndex];
    setMessages([
      ...messages,
      { sender: 'user', content: `Haven't seen ${currentMovie.title || currentMovie.name} yet` },
      { sender: 'system', content: 'No problem! How about this one?' }
    ]);
    setCurrentMovieIndex(prevIndex => prevIndex + 1);
    setCurrentRating(0);
  };

  const handleNextRecommendation = () => {
    setCurrentRecommendationIndex(prev => 
      prev + 3 >= recommendedMovies.length ? 0 : prev + 3
    );
  };


  const handlePreviousStep = () => {
    setMessages(previousMessages);
    setCurrentStep(previousStep);
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const ratings = ratedMovies.reduce((acc, movie) => {
        acc[movie.tmdb_id] = movie.rating;
        return acc;
      }, {});
  
      const payload = {
        mediaType: selectedMediaType,
        ratings: ratings
      };
  
      const response = await api.post(`recommender/collaborative/user-based-recommendations`, payload);
      const recommendations = response.data;
      setRecommendedMovies(recommendations);
      setPreviousStep('rating');
      setCurrentStep('recommendations');
      setMessages(messages => messages.slice(0, -1).concat(
        { sender: 'system', content: 'Based on your ratings, here are some recommendations just for you:' }
      ));
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setMessages(messages => messages.concat(
        { sender: 'system', content: 'Sorry, the recommender is currently unavailable, try again later.' }
      ));
    }
    setIsLoading(false);
  };

  const handleSeenIt = (movieId) => {
    setRecommendedMovies(recommendedMovies.filter(movie => movie.id !== movieId));
  };
  
  const renderMessage = (message, index) => (
    <Fade in timeout={300}>
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
          mb: 2
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 2,
            maxWidth: '70%',
            bgcolor: message.sender === 'user' ? 'error.dark' : 'background.secondary',
            borderRadius: message.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.01)',
              elevation: 3
            }
          }}
        >
          <Typography>{message.content}</Typography>
        </Paper>
      </Box>
    </Fade>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'mediaType-selection':
        return (
          <Fade in timeout={500}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
                  {mediaTypes.map((mediaType) => (
                    <Chip
                      key={mediaType}
                      label={mediaType.toUpperCase()}
                      onClick={() => handleMediaTypeSelect(mediaType)}
                      color={selectedMediaType === mediaType ? "primary" : "default"}
                      sx={{ 
                        m: 0.5, 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { 
                          bgcolor: 'primary.light',
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                  ))}
                </Stack>
                <IconButton 
                  onClick={handleMediaTypeSubmit}
                  disabled={!selectedMediaType}
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </Fade>
        );

  
        case 'genre-selection':
          return (
            <Fade in timeout={500}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  {genreLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center">
                      {genreList?.genres.map((genre) => (
                        <Chip
                          key={genre.id}
                          label={genre.name}
                          onClick={() => handleGenreSelect(genre)}
                          color={selectedGenres.some(g => g.id === genre.id) ? "primary" : "default"}
                          disabled={selectedGenres.length >= 3 && !selectedGenres.some(g => g.id === genre.id)}
                          sx={{ 
                            m: 0.5, 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': { 
                              bgcolor: 'primary.light',
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                  <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                    {previousStep && (
                      <Button 
                        variant="outlined" 
                        onClick={handlePreviousStep}
                        startIcon={<ArrowBack />}
                      >
                        Back
                      </Button>
                    )}
                    <IconButton 
                      onClick={handleGenreSubmit}
                      disabled={selectedGenres.length === 0 || genreLoading}
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { 
                          bgcolor: 'primary.dark',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <Send />
                    </IconButton>
                  </Stack>
                  <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
                    Select up to 3 genres
                  </Typography>
                </Box>
              </Box>
            </Fade>
          );
        
  
      case 'rating':
        if (isLoading) {
          return <CircularProgress />;
        }
        
        if (!availableMovies || !availableMovies[currentMovieIndex]) {
          return (
            <Typography color="error">
              No more content available. Please try different genres.
            </Typography>
          );
        }
  
        const currentMovie = availableMovies[currentMovieIndex];
        return (
          <Fade in timeout={500}>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
  {/* MediaCard on the left */}
  <MediaCard 
    mediaData={currentMovie} 
    onClick={() => navigate(`/details/${selectedMediaType}/${currentMovie.id}`)} 
    sx={{ flexShrink: 0, mr: 3 }} // Prevents shrinking and adds spacing
  />
        {/* Rating and buttons on the right */}
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%', maxWidth: 400 }}>
          <Rating
            value={currentRating}
            onChange={(_, value) => setCurrentRating(value)}
            size="large"
            sx={{
              '& .MuiRating-iconFilled': { color: 'primary.main' },
              '& .MuiRating-iconHover': { color: 'primary.light' }
            }}
          />
          <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              onClick={handleRating}
              disabled={!currentRating}
              sx={{
                transition: 'all 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Rate
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleHaventWatched}
              sx={{
                transition: 'all 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Haven't watched
            </Button>
          </Stack>
          {ratedMovies.length >= 5 && (
            <Button 
              variant="contained" 
              onClick={handleGetRecommendations}
              color="success"
              sx={{
                mt: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Get Recommendations
            </Button>
          )}
          <Typography variant="caption" color="text.secondary">
            {5 - ratedMovies.length} more ratings needed for recommendations
          </Typography>
        </Stack>
      </Box>
          </Fade>
        );
  
      case 'recommendations':
        return (
          <Fade in timeout={500}>
            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap justifyContent="center">
                {recommendedMovies
                  .slice(currentRecommendationIndex, currentRecommendationIndex + 3)
                  .map((movie) => (
                    <Box 
                      key={movie.id} 
                      sx={{ 
                        position: 'relative',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { transform: 'scale(1.02)' }
                      }}
                    >
                      <MediaCard mediaData={movie} onClick={() => navigate(`/details/${selectedMediaType}/${movie.id}`)} />
                      <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'center' }}>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleSeenIt(movie.id)}
                          sx={{
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': { transform: 'scale(1.05)' }
                          }}
                        >
                          Seen it
                        </Button>
                      </Stack>
                    </Box>
                  ))}
              </Stack>
              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  mt: 2,
                  justifyContent: 'center'
                }}
              >
                <Button 
                  variant="contained" 
                  onClick={handleNextRecommendation}
                  endIcon={<ChevronRight />}
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                >
                  Show more
                </Button>
                {previousStep && (
                  <Button 
                    variant="outlined" 
                    onClick={handlePreviousStep}
                    startIcon={<ArrowBack />}
                    sx={{
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    Back to rating
                  </Button>
                )}
              </Stack>
            </Box>
          </Fade>
        );
  
      default:
        return null;
    }
  };
  
  return (
    <Box sx={{ 
      maxWidth: '70rem', 
      margin: '0 auto', 
      p: 2,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Paper 
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          bgcolor: 'background.paper',
          overflow: 'hidden',
          boxShadow: theme => `0 8px 32px ${theme.palette.primary.main}15`
        }}
      >
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          mb: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme => theme.palette.primary.main + '40',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme => theme.palette.primary.main + '60',
          }
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