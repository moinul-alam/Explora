import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from '@mui/material';
import usePersonSearch from '@src/hooks/usePersonSearch';
import VALID_FILTERS from '@src/components/DiscoverSimilarMedia/DiscoveryFilter';
import FallbackImage from '@src/assets/fallback-image.png';
import api from "@src/utils/api";
import MediaShowcase from "@src/components/Common/MediaShowcase";


const DiscoverSimilarMediaPage = () => {
  // Form state
  const [mediaType, setMediaType] = useState('movie');
  const [overview, setOverview] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCast, setSelectedCast] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [voteAverage, setVoteAverage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  
  // Search state
  const [actorSearchQuery, setActorSearchQuery] = useState('');
  const [directorSearchQuery, setDirectorSearchQuery] = useState('');
  
  // Results state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch person search results
  const actorSearchResults = usePersonSearch(actorSearchQuery);
  const directorSearchResults = usePersonSearch(directorSearchQuery);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format keywords into array
    const keywordsArray = keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    // Format data according to backend schema
    const metadata = {
      media_type: mediaType,
      title: '', // Optional in this case
      overview,
      spoken_languages: spokenLanguages.length > 0 ? [spokenLanguages] : ['en'], // Default to English if none selected
      vote_average: voteAverage ? Number(voteAverage) : 0,
      release_year: releaseYear,
      genres: selectedGenres.map(genre => genre.value),
      director: selectedDirectors.map(director => director.name),
      cast: selectedCast.map(actor => actor.name),
      keywords: keywordsArray
    };

    try {
      const response = await api.post('recommender/discover', {
        metadata
      });

      console.log('response data: ', response.data);

      setResults(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch similar media');
    } finally {
      setLoading(false);
    }
  };


  return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" textAlign="center" component="h1" gutterBottom>
          Discover Similar Media
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Storyline Input */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Storyline"
                multiline
                rows={3}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                error={!overview.trim()}
                helperText={!overview.trim() && "Storyline is required"}
              />
            </Grid>

            {/* Media Type Dropdown */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Media Type</InputLabel>
                <Select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  label="Media Type"
                >
                  <MenuItem value="movie">Movie</MenuItem>
                  <MenuItem value="tv">TV Show</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Genre Selection */}
            <Grid item xs={12} sm={4}>
              <Autocomplete
                required
                multiple
                options={VALID_FILTERS.genres.options}
                value={selectedGenres}
                onChange={(_, value) => setSelectedGenres(value)}
                getOptionLabel={(option) => option.label}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.label}
                      {...getTagProps({ index })}
                      key={option.value}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Genres" 
                    error={selectedGenres.length === 0}
                    helperText={selectedGenres.length === 0 && "At least one genre is required"}
                  />
                )}
              />
            </Grid>

            {/* Language Selection */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={spokenLanguages}
                  onChange={(e) => setSpokenLanguages(e.target.value)}
                  label="Language"
                >
                  {VALID_FILTERS.spoken_languages.options.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Minimum Rating */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Minimum Rating</InputLabel>
                <Select
                  value={voteAverage}
                  onChange={(e) => setVoteAverage(e.target.value)}
                  label="Minimum Rating"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Actor Search */}
            <Grid item xs={12} sm={4}>
              <Autocomplete
                multiple
                options={actorSearchResults}
                value={selectedCast}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => setSelectedCast(value)}
                onInputChange={(_, newValue) => setActorSearchQuery(newValue)}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <img
                      src={option.poster_path ? `https://image.tmdb.org/t/p/w45${option.poster_path}` : FallbackImage}
                      alt={option.name}
                      style={{ width: 40, height: 60, objectFit: 'cover', marginRight: 10 }}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Search Actor" />
                )}
              />
            </Grid>

            {/* Director Search */}
            <Grid item xs={12} sm={4}>
              <Autocomplete
                multiple
                options={directorSearchResults}
                value={selectedDirectors}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => setSelectedDirectors(value)}
                onInputChange={(_, newValue) => setDirectorSearchQuery(newValue)}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <img
                      src={option.poster_path ? `https://image.tmdb.org/t/p/w45${option.poster_path}` : FallbackImage}
                      alt={option.name}
                      style={{ width: 40, height: 60, marginRight: 10 }}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Search Director" />
                )}
              />
            </Grid>

            {/* Keywords */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Keywords"
                placeholder="Enter keywords (comma-separated)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                helperText="Separate keywords with commas"
              />
            </Grid>

            {/* Release Year */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Release Year"
                placeholder="YYYY"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sm={4}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                disabled={loading || !overview.trim() || selectedGenres.length === 0}
              >
                {loading ? 'Discovering...' : 'Discover'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 4 }}>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
            <MediaShowcase
              data={results.map((item) => ({
                ...item,
                mediaType: item.mediaType || mediaType,
              }))}
              detailsLink={(media) => `/details/${media.mediaType}/${media.id}`}
            />
        </Box>
      </Box>
  );
};

export default DiscoverSimilarMediaPage;