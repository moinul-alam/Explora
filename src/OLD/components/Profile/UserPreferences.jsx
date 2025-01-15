import { Paper, Typography, List, ListItem } from "@mui/material";

const UserPreferences = ({ preferences }) => (
  <Paper sx={{ padding: 4, marginBottom: 4 }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      User Preferences
    </Typography>
    <Typography>Languages: {preferences.language.join(", ") || "None"}</Typography>
    <Typography>Genres: {preferences.genre.join(", ") || "None"}</Typography>
    <Typography>Favorite Movies: {preferences.favoriteMovies.join(", ") || "None"}</Typography>
    <Typography>Favorite Series: {preferences.favoriteSeries.join(", ") || "None"}</Typography>
    <Typography>Favorite Actors: {preferences.favoriteActors.join(", ") || "None"}</Typography>
    <Typography>Favorite Directors: {preferences.favoriteDirectors.join(", ") || "None"}</Typography>
  </Paper>
);

export default UserPreferences;
