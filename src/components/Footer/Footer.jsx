import { Box, Typography, Link, useTheme, Stack } from '@mui/material';
import tmdbLogo from '@src/assets/tmdb.svg';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box component="footer">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center" // Ensures all items are vertically centered in the row
        sx={{
          margin: '0 auto',
          width: '100%',
          px: 3,
          py: 1, // Adds vertical padding to center the content
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Typography variant="body2">
            Copyright © CoRE Project, 2024
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Ensures logo and text are vertically centered
            flex: 1,
            textAlign: 'center',
          }}
        >
          <img
            src={tmdbLogo}
            alt="TMDB"
            style={{
              width: '80px',
              height: '40px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onClick={() => window.open('https://www.themoviedb.org/', '_blank')}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          <Typography variant="body2">
            This project uses{' '}
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              TMDB API
            </Link>{' '}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Link
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
                display: 'block',
                mb: 1,
              }}
            >
              Developed By
            </Link>
            <Link
              href="https://moinul-alam.github.io"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
                display: 'block',
              }}
            >
              Moinul Alam
            </Link>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
