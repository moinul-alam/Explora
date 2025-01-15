import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const Filmography = ({ personData }) => {
  const { movie_credits = {}, tv_credits = {}, known_for } = personData;

  const navigate = useNavigate();

  const handleCardClick = (mediaType, mediaId) => {
    navigate(`/${mediaType}/${mediaId}`);
  };

  // Safely access properties with default empty arrays
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
    <div>
      <Typography variant="h5" gutterBottom>
        Filmography
      </Typography>
      {sections.map((section, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            {section.role}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Movies
          </Typography>
          <MediaShowcase
            data={section.movies}
            onCardClick={(mediaId) => handleCardClick("movie", mediaId)}
          />
          <Typography variant="subtitle1" gutterBottom>
            TV Series
          </Typography>
          <MediaShowcase
            data={section.tvShows}
            onCardClick={(mediaId) => handleCardClick("tv", mediaId)}
          />
        </div>
      ))}
    </div>
  );
};

export default Filmography;
