const GENRES = [
  { label: "Action", value: 28 },
  { label: "Adventure", value: 12 },
  { label: "Animation", value: 16 },
  { label: "Comedy", value: 35 },
  { label: "Crime", value: 80 },
  { label: "Documentary", value: 99 },
  { label: "Drama", value: 18 },
  { label: "Family", value: 10751 },
  { label: "Fantasy", value: 14 },
  { label: "History", value: 36 },
  { label: "Horror", value: 27 },
  { label: "Music", value: 10402 },
  { label: "Mystery", value: 9648 },
  { label: "Romance", value: 10749 },
  { label: "Science Fiction", value: 878 },
  { label: "TV Movie", value: 10770 },
  { label: "Thriller", value: 53 },
  { label: "War", value: 10752 },
  { label: "Western", value: 37 },
];

const LANGUAGES = [
  { label: "English", value: "en-US" },
  { label: "French", value: "fr-FR" },
  { label: "Spanish", value: "es-ES" },
  { label: "German", value: "de-DE" },
];

const VALID_FILTERS = {
  with_genres: {
    type: "string",
    options: GENRES,
    label: "Include Genres",
  },
  without_genres: {
    type: "string",
    options: GENRES,
    label: "Exclude Genres",
  },
  language: {
    type: "string",
    options: LANGUAGES,
    label: "Language",
    defaultValue: "en-US",
  },
  include_adult: {
    type: "boolean",
    label: "Include Adult Content",
    defaultValue: "false",
  },
  "vote_average.gte": {
    type: "number",
    options: Array.from({ length: 10 }, (_, i) => i + 1),
    label: "Minimum Rating",
  },
  "vote_average.lte": {
    type: "number",
    options: Array.from({ length: 10 }, (_, i) => i + 1),
    label: "Maximum Rating",
  },
  with_keywords: { 
    type: "string", 
    placeholder: "Keywords", 
    label: "Keywords" },
  with_cast: {
    type: "search",
    label: "Actor",
    placeholder: "Search Actor...",
  },
  with_crew: {
    type: "search",
    label: "Director",
    placeholder: "Search Director...",
  },
  with_runtime_gte: { 
    type: "number", 
    label: "Minimum Runtime (minutes)" 
  },
  with_runtime_lte: { 
    type: "number", 
    label: "Maximum Runtime (minutes)" 
  },
};

export default VALID_FILTERS
