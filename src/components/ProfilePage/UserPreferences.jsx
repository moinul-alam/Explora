import { Paper, Typography, Box } from "@mui/material";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const UserPreferences = ({ preferences = {} }) => {
  return (
    <Paper sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        User Preferences
      </Typography>

      {/* Favorite Movies */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Movies:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteMovies || []}
          detailsLink={(item) => `/details/movie/${item.tmdb_id}`}
        />
      </Box>

      {/* Favorite Series */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Series:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteSeries || []}
          detailsLink={(item) => `/details/tv/${item.tmdb_id}`}
        />
      </Box>

      {/* Favorite Actors */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Actors:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteActors || []}
          detailsLink={(item) => `/details/person/${item.tmdb_id}`}
        />
      </Box>

      {/* Favorite Directors */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Directors:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteDirectors || []}
          detailsLink={(item) => `/details/person/${item.tmdb_id}`}
        />
      </Box>
    </Paper>
  );
};

export default UserPreferences;
