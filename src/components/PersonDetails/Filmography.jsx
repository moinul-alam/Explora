import { Typography, Box, Divider } from "@mui/material";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const Filmography = ({ personData }) => {
  const { movie_credits = {}, tv_credits = {}, known_for } = personData;

  const directingMovies = movie_credits.directing || [];
  const actingMovies = movie_credits.acting || [];
  const directingTvShows = tv_credits.directing || [];
  const actingTvShows = tv_credits.acting || [];

  const sections = [];

  if (known_for === "Directing" || directingMovies.length || directingTvShows.length) {
    sections.push({
      role: "Director",
      movies: directingMovies,
      tvShows: directingTvShows,
    });
  }

  if (known_for === "Acting" || actingMovies.length || actingTvShows.length) {
    sections.push({
      role: "Actor",
      movies: actingMovies,
      tvShows: actingTvShows,
    });
  }

  return (
    <Box>
      {/* Filmography Heading */}
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Filmography
      </Typography>

      {sections.map((section, index) => (
        <Box key={index} sx={{ mt: 3, mb: 4 }}>
          {/* Role Section Header */}
          <Typography variant="h5" color="secondary" fontWeight="bold" gutterBottom>
            As {section.role}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Movies Section */}
          {section.movies.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                Movies
              </Typography>
              <MediaShowcase 
                data={section.movies}
                detailsLink={(media) => `/details/movie/${media.tmdb_id}`}
              />
            </Box>
          )}

          {/* TV Series Section */}
          {section.tvShows.length > 0 && (
            <Box>
              <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                TV Series
              </Typography>
              <MediaShowcase 
                data={section.tvShows}
                detailsLink={(media) => `/details/tv/${media.tmdb_id}`}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Filmography;
