import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/system';
import tmdbLogo from '@src/assets/tmdb.svg';

const Footer = () => {
  const theme = useTheme(); // Access the current theme
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        backgroundColor: isDarkMode ? '#121212' : theme.palette.background.paper,
        color: isDarkMode ? 'gold' : theme.palette.text.primary,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        Copyright © CoRE Project, 2024
      </Typography>
      <Typography variant="body2">
        This project uses {' '}
        <Link
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: isDarkMode ? 'gold' : theme.palette.primary.main,
            textDecoration: 'none',
          }}
        >
          TMDB API
        </Link>{' '}
        but is not endorsed or certified by TMDB.
      </Typography>
      <img
        src={tmdbLogo}
        alt="TMDB"
        style={{ width: '80px', height: '40px', cursor: 'pointer' }}
        onClick={() => (window.location.href = 'https://www.themoviedb.org/')}
      />
    </Box>
  );
};

export default Footer;
