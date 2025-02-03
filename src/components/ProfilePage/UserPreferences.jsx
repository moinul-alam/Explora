import { Paper, Typography, Box } from "@mui/material";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import { useNavigate } from "react-router-dom";

const UserPreferences = ({ preferences = {} }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Paper sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        User Preferences
      </Typography>

      {/* Languages
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Languages:
        </Typography>
        <Typography>{preferences.language?.join(", ") || "None"}</Typography>
      </Box> */}

      {/* Genres */}
      {/* <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Genres:
        </Typography>
        <Typography>{preferences.genre?.join(", ") || "None"}</Typography>
      </Box> */}

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Movies:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteMovies || []}
          onCardClick={(media) =>
            handleClick(`/details/${media.media_type}/${media.tmdb_id}`)
          }
        />
      </Box>

      {/* Favorite Series */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Series:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteSeries || []}
          onCardClick={(media) =>
            handleClick(`/details/${media.media_type}/${media.tmdb_id}`)
          }
        />
      </Box>

      {/* Favorite Actors */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Actors:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteActors || []}
          onCardClick={(actor) =>
            handleClick(`/details/person/${actor.tmdb_id}`)
          }
        />
      </Box>

      {/* Favorite Directors */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Favorite Directors:
        </Typography>
        <MediaShowcase
          data={preferences.favoriteDirectors || []}
          onCardClick={(director) =>
            handleClick(`/details/person/${director.tmdb_id}`)
          }
        />
      </Box>
    </Paper>
  );
};

export default UserPreferences;
