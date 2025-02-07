import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";
import usePersonSearch from "@src/hooks/usePersonSearch";
import VALID_FILTERS from "@src/components/MediaDiscovery/DiscoveryFilter";
import { useState } from "react";
import FallbackImage from '@src/assets/fallback-image.png';

const RequestSimilarMedia = ({
  mediaType,
  setMediaType,
  filters,
  setFilters,
  selectedActors,
  setSelectedActors,
  selectedDirectors,
  setSelectedDirectors,
  setQueryUrl,
}) => {
  const [storyline, setStoryline] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [actorSearchQuery, setActorSearchQuery] = useState("");
  const [directorSearchQuery, setDirectorSearchQuery] = useState("");

  // Fetch results based on user input
  const actorSearchResults = usePersonSearch(actorSearchQuery);
  const directorSearchResults = usePersonSearch(directorSearchQuery);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filterQuery = {
      ...filters,
      storyline,
      with_genres: selectedGenres.map((genre) => genre.value).join(","),
      with_cast: selectedActors.map((actor) => actor.id).join(","),
      with_crew: selectedDirectors.map((director) => director.id).join(","),
    };

    const queryParams = new URLSearchParams(
      Object.entries(filterQuery).filter(([, value]) => value !== "")
    ).toString();

    const url = `/media/discover/${mediaType}?${queryParams}`;
    setQueryUrl(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Storyline Input */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Storyline"
            multiline
            rows={3}
            value={storyline}
            onChange={(e) => setStoryline(e.target.value)}
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
            multiple
            options={VALID_FILTERS.with_genres.options}
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
              <TextField {...params} label="Genres" />
            )}
          />
        </Grid>

        {/* Language Selection */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              name="language"
              value={filters.language || ""}
              onChange={handleInputChange}
              label="Language"
            >
              {VALID_FILTERS.language.options.map((lang) => (
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
              name="vote_average.gte"
              value={filters["vote_average.gte"] || ""}
              onChange={handleInputChange}
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
    value={selectedActors}
    getOptionLabel={(option) => option.name}
    onChange={(_, value) => setSelectedActors(value)}
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
          style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }}
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
            name="with_keywords"
            label="Keywords"
            placeholder="Enter keywords"
            value={filters.with_keywords || ""}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Release Year */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="release_year"
            label="Release Year"
            placeholder="YYYY"
            value={filters.release_year || ""}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12} sm={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Discover
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RequestSimilarMedia;
