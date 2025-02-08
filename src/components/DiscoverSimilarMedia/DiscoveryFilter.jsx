const GENRES = [
  { label: "Action", value: "action" },
  { label: "Adventure", value: "adventure" },
  { label: "Animation", value: "animation" },
  { label: "Comedy", value: "comedy" },
  { label: "Crime", value: "crime" },
  { label: "Documentary", value: "documentary" },
  { label: "Drama", value: "drama" },
  { label: "Family", value: "family" },
  { label: "Fantasy", value: "fantasy" },
  { label: "History", value: "history" },
  { label: "Horror", value: "horror" },
  { label: "Music", value: "music" },
  { label: "Mystery", value: "mystery" },
  { label: "Romance", value: "romance" },
  { label: "Science Fiction", value: "science fiction" },
  { label: "TV Movie", value: "tv movie" },
  { label: "Thriller", value: "thriller" },
  { label: "War", value: "war" },
  { label: "Western", value: "western" },
];

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
  { label: "German", value: "de" },
];

const VALID_FILTERS = {
  genres: {
    type: "string",
    options: GENRES,
    label: "Include Genres",
  },
  spoken_languages: {
    type: "string",
    options: LANGUAGES,
    label: "Language",
  },
  "vote_average": {
    type: "number",
    options: Array.from({ length: 10 }, (_, i) => i + 1),
    label: "Minimum Rating",
  },
  keywords: {
    type: "string",
    placeholder: "Keywords",
    label: "Keywords"
  },
  cast: {
    type: "search",
    label: "Actor",
    placeholder: "Search Actor...",
  },
  director: {
    type: "search",
    label: "Director",
    placeholder: "Search Director...",
  },
};

export default VALID_FILTERS;