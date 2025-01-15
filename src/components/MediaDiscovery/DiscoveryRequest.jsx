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
import useSearch from "@src/hooks/useSearch";
import VALID_FILTERS from "@src/components/MediaDiscovery/DiscoveryFilter";
import { useState } from "react";

const DiscoveryRequest = ({
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
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedGenresExcl, setSelectedGenresExcl] = useState([]);
  const actorSearchResults = useSearch(filters.with_cast || "");
  const directorSearchResults = useSearch(filters.with_crew || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filterQuery = {
      ...filters,
      with_genres: selectedGenres.map((genre) => genre.value).join(","),
      without_genres: selectedGenresExcl.map((genre) => genre.value).join(","),
      with_cast: selectedActors.map((actor) => actor.id).join(","),
      with_crew: selectedDirectors.map((director) => director.id).join(","),
    };

    const queryParams = new URLSearchParams(
      Object.entries(filterQuery).filter(([, value]) => value !== "")
    ).toString();

    const url = `/media/discover/${mediaType}?${queryParams}`;
    setQueryUrl(url);
  };

  const renderField = (key, config) => {
    const { type, options, placeholder, label } = config;

    if (key === "with_genres" || key === "without_genres") {
      return (
        <Autocomplete
          multiple
          options={VALID_FILTERS[key].options}
          value={key === "with_genres" ? selectedGenres : selectedGenresExcl}
          onChange={(_, value) => {
            key === "with_genres"
              ? setSelectedGenres(value)
              : setSelectedGenresExcl(value);
          }}
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
            <TextField {...params} label={label} placeholder={placeholder} />
          )}
        />
      );
    }

    if (type === "boolean") {
      return (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            name={key}
            value={filters[key]}
            onChange={handleInputChange}
            label={label}
          >
            <MenuItem value="false">No</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
          </Select>
        </FormControl>
      );
    }

    if (type === "search") {
      const isActorField = key === "with_cast";
      const selectedValues = isActorField ? selectedActors : selectedDirectors;
      const setSelectedValues = isActorField
        ? setSelectedActors
        : setSelectedDirectors;

      return (
        <Autocomplete
          multiple
          options={isActorField ? actorSearchResults : directorSearchResults}
          value={selectedValues}
          getOptionLabel={(option) => option.name}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
                key={option.id}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              onChange={(e) =>
                handleInputChange({
                  target: { name: key, value: e.target.value },
                })
              }
            />
          )}
          onChange={(_, value) => setSelectedValues(value)}
        />
      );
    }

    return (
      <TextField
        fullWidth
        name={key}
        value={filters[key] || ""}
        onChange={handleInputChange}
        label={label}
        placeholder={placeholder}
        type={type}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Media Type</InputLabel>
            <Select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              label="Media Type"
            >
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="tv">TV Series</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {Object.keys(VALID_FILTERS).map((key) => (
          <Grid item xs={12} sm={4} key={key}>
            {renderField(key, VALID_FILTERS[key])}
          </Grid>
        ))}

        <Grid item xs={12} sm={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Discover
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DiscoveryRequest;
