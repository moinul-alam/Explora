import { Box, Typography } from '@mui/material';

const PersonProfile = ({ personData }) => {
  const { name, known_for, profile_path, biography } = personData;
  const profileImageUrl = `https://image.tmdb.org/t/p/w500${profile_path}`;
  const knownFor = known_for === 'Directing' ? 'Director' : 'Actor';

  const truncateBiography = (bio, wordLimit) => {
    if (!bio) return 'Biography not available.';
    const words = bio.split(' ');
    if (words.length <= wordLimit) return bio; 
    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  const truncatedBiography = truncateBiography(biography, 195);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        padding: '1.25rem',
        color: '#fff',
        alignItems: { xs: 'center', sm: 'flex-start' },
      }}
    >
      {/* Profile Photo */}
      <img
        src={profileImageUrl}
        alt={name}
        style={{
          width: '100%', // Default to full width
          maxWidth: '18.75rem', // 300px = 18.75rem
          borderRadius: '0.5rem', // 8px = 0.5rem
          boxShadow: '0 0.25rem 0.625rem rgba(0, 0, 0, 0.7)', // 0 4px 10px
        }}
      />

      {/* Biography */}
      <Box
        sx={{
          marginLeft: { xs: '0', sm: '1.25rem' },
          marginTop: { xs: '1.25rem', sm: '0' },
          flex: 1,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        {/* Person Name */}
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', sm: '2.5rem' }, // Responsive font size
          }}
        >
          {name}
        </Typography>

        {/* Known For */}
        <Typography
          variant='h5'
          component='h1'
          sx={{
            color: '#bbb',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          {knownFor}
        </Typography>

        {/* Bio */}
        <Typography
          variant='h6'
          sx={{
            margin: '0.625rem 0',
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Biography
        </Typography>
        <Typography
          variant='body1'
          sx={{
            marginBottom: '1.25rem',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            textAlign: 'justify', // Justify text
          }}
        >
          {truncatedBiography}
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonProfile;
