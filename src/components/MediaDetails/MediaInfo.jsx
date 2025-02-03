import { Box, Typography, Chip } from '@mui/material';
import { Star } from '@mui/icons-material';
import MediaActionsBar from '@src/components/MediaDetails/MediaActionBar';
import { useNavigate } from 'react-router-dom';

const MediaInfo = ({
  mediaType,
  title,
  overview,
  genres,
  releaseDate,
  rating,
  tagline,
  homepage,
  runtime,
  numberOfSeasons,
  numberOfEpisodes,
  imdbId,
  tmdbId,
  mediaId,
}) => {
  const navigate = useNavigate();

  // console.log("mediaId: ", mediaId);
  const releaseYear = new Date(releaseDate).getFullYear();
  const formattedReleaseDate = new Date(releaseDate).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: { xs: '1rem', md: '1.25rem' },
        color: '#fff',
        gap: { xs: '1rem', md: '1.5rem' },
      }}
    >
      {/* Movie Details */}
      <Box sx={{ flex: 1 }}>
        {/* Title with Release Year */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          {title} ({releaseYear})
        </Typography>

        {/* Tagline */}
        <Typography
          variant="subtitle1"
          sx={{
            fontStyle: 'italic',
            color: '#bbb',
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          {tagline}
        </Typography>

        {/* Genres */}
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            margin: '0.5rem 0',
          }}
        >
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              onClick={() => navigate(`/explore/${genre.name}/${mediaType}?with_genres=${genre.id}`)}
              sx={{
                backgroundColor: '#444',
                color: '#fff',
                fontSize: { xs: '0.8rem', md: '1rem' },
                '&:hover': {
                  backgroundColor: '#555',
                  cursor: 'pointer',
                },
              }}
            />
          ))}
        </Box>

        {/* TMDB Rating */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '1rem 0',
            gap: '0.5rem',
          }}
        >
          <Typography sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
            TMDB Rating:
          </Typography>
          <Star sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#ff9800' }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.2rem' } }}
          >
            {rating.toFixed(1)}/10
          </Typography>
        </Box>

        <MediaActionsBar mediaType={mediaType} mediaId={mediaId} tmdbId={tmdbId} />

        {/* Storyline */}
        <Typography
          variant="h6"
          sx={{
            margin: '0.5rem 0',
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          Storyline
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: '1rem',
            fontSize: { xs: '0.9rem', md: '1rem' },
          }}
        >
          {overview}
        </Typography>

        {/* Runtime or TV Series Details */}
        {mediaType === 'tv' ? (
          <>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                marginBottom: '0.5rem',
              }}
            >
              <strong>Seasons:</strong> {numberOfSeasons}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                marginBottom: '0.5rem',
              }}
            >
              <strong>Episodes:</strong> {numberOfEpisodes}
            </Typography>
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', md: '1rem' },
              marginBottom: '0.5rem',
            }}
          >
            <strong>Runtime:</strong> {(runtime / 60).toFixed(0)}h {runtime % 60}min
          </Typography>
        )}

        {/* Release Date */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', md: '1rem' },
            marginBottom: '0.5rem',
          }}
        >
          <strong>Release Date:</strong> {formattedReleaseDate}
        </Typography>

        {/* IMDb Link */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', md: '1rem' },
            marginBottom: '0.5rem',
          }}
        >
          <strong>IMDb:</strong>{' '}
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'skyblue', textDecoration: 'none' }}
          >
            View on IMDb
          </a>
        </Typography>

        {/* Official Homepage */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', md: '1rem' },
            marginBottom: '0.5rem',
          }}
        >
          <strong>Official Homepage:</strong>{' '}
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'skyblue', textDecoration: 'none' }}
          >
            Visit
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default MediaInfo;
