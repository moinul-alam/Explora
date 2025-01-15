import { Box, Typography, CircularProgress, Chip } from "@mui/material";
import MediaActionsBar from "@src/components/MediaDetails/MediaActionBar";

const MediaInfo = ({
  mediaType,
  title,
  overview,
  genres,
  releaseDate,
  rating,
  posterPath,
  tagline,
  homepage,
  runtime,
  numberOfSeasons,
  numberOfEpisodes,
  imdbId,
  mediaId

}) => {
  const releaseYear = new Date(releaseDate).getFullYear();
  const formattedReleaseDate = new Date(releaseDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Box sx={{ display: "flex", padding: "20px", color: "#fff" }}>
      {/* Movie Poster */}
      <img
        src={posterPath}
        alt={title}
        style={{
          width: "300px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
        }}
      />

      {/* Movie Details */}
      <Box sx={{ marginLeft: "20px", flex: 1 }}>
        {/* Title with Release Year */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
          {title} ({releaseYear})
        </Typography>

        {/* Tagline */}
        <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "#bbb" }}>
          {tagline}
        </Typography>

        {/* Genres */}
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "10px 0" }}>
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              onClick={() => window.location.href = `/genres/${genre.id}`}
              sx={{
                backgroundColor: "#444",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#555",
                  cursor: "pointer",
                },
              }}
            />
          ))}
        </Box>

        <MediaActionsBar mediaType={mediaType} mediaId={mediaId} />
        

        {/* TMDB Rating with Circular Progress */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
            gap: "10px",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "1rem" }}
          >
            TMDB Rating:
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={rating * 10}
              sx={{ color: "#ff9800" }}
              size={60}
              thickness={5}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {rating.toFixed(1)}
            </Box>
          </Box>
        </Box>

        {/* Storyline */}
        <Typography variant="h6" sx={{ margin: "10px 0", fontWeight: "bold" }}>
          Storyline
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          {overview}
        </Typography>

        {/* Runtime or TV Series Details */}
        {mediaType === "tv" ? (
          <>
            <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: "10px" }}>
              <strong>Seasons:</strong> {numberOfSeasons}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: "10px" }}>
              <strong>Episodes:</strong> {numberOfEpisodes}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: "10px" }}>
            <strong>Runtime:</strong> {(runtime / 60).toFixed(0)}h {runtime % 60}min
          </Typography>
        )}

        {/* Release Date */}
        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: "10px" }}>
          <strong>Release Date:</strong> {formattedReleaseDate}
        </Typography>

        {/* IMDb Link */}
        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: "10px" }}>
          <strong>IMDb:</strong>{" "}
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "skyblue", textDecoration: "none" }}
          >
            View on IMDb
          </a>
        </Typography>

        {/* Official Homepage */}
        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: "10px" }}>
          <strong>Official Homepage:</strong>{" "}
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            style={{ color: "skyblue", textDecoration: "none" }}
          >
            Visit
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default MediaInfo;
