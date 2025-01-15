import { useNavigate } from 'react-router-dom';
import FallbackImage from '@src/assets/fallback-image.png';
import { Box, Typography } from '@mui/material';

const Credit = ({ credits, mediaType }) => {
  const navigate = useNavigate();

  const crew =
    mediaType === 'movie'
      ? credits.filter((c) => c.type === 'director')
      : credits.filter((c) => c.type === 'creator');

  const cast = credits.filter((c) => c.type === 'cast');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: { xs: '1rem', md: '1.25rem' },
        color: '#fff',
        gap: { xs: '1rem', md: '1.5rem' },
      }}
    >
      {/* Crew Section */}
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1rem', md: '1.25rem' },
          fontWeight: 'bold',
          marginBottom: { xs: '0.5rem', md: '0.75rem' },
        }}
      >
        {mediaType === 'movie'
          ? crew.length === 1
            ? 'Director'
            : 'Directors'
          : crew.length === 1
          ? 'Creator'
          : 'Creators'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: '0.75rem', md: '1.25rem' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          marginBottom: '1.25rem',
        }}
      >
        {crew.map((person) => (
          <Box
            key={person.id}
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              width: { xs: '5rem', md: '6.25rem' },
            }}
            onClick={() => navigate(`/person/${person.id}`)}
          >
            <img
              src={person.image || FallbackImage}
              alt={person.name || 'No Name Available'}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2 / 3',
                borderRadius: '0.5rem',
                objectFit: 'cover',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
              }}
            />
            <Typography
              sx={{
                mt: '0.5rem',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', md: '1rem' },
              }}
            >
              {person.name || 'Unknown'}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Top Cast Section */}
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1rem', md: '1.25rem' },
          fontWeight: 'bold',
          marginBottom: { xs: '0.5rem', md: '0.75rem' },
        }}
      >
        Top Cast
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: '0.75rem', md: '1.25rem' },
        }}
      >
        {cast.map((c) => (
          <Box
            key={c.id}
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              width: { xs: '5rem', md: '7.5rem' },
            }}
            onClick={() => navigate(`/person/${c.id}`)}
          >
            <img
              src={c.image || FallbackImage}
              alt={c.name || 'No Name Available'}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2 / 3',
                borderRadius: '0.5rem',
                objectFit: 'cover',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
              }}
            />
            <Typography
              sx={{
                mt: '0.5rem',
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', md: '0.875rem' },
              }}
            >
              {c.name || 'Unknown'}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.65rem', md: '0.75rem' },
                color: '#aaa',
              }}
            >
              as {c.character || 'Unknown Role'}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Credit;
