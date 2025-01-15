// NavigationMenu.js
import { Box, useTheme, useMediaQuery } from '@mui/material';
import DropdownButton from '@src/components/Header/DropdownButton';

const NavigationMenu = ({ isMobile }) => {
  const theme = useTheme();

  const moviesItems = [
    { label: 'Trending Movies', link: '/category/movie/trending' },
    { label: 'Popular Movies', link: '/category/movie/popular' },
    { label: 'Top Rated Movies', link: '/category/movie/top_rated' },
  ];

  const tvShowsItems = [
    { label: 'Trending TV Shows', link: '/category/tv/trending' },
    { label: 'Popular TV Shows', link: '/category/tv/popular' },
    { label: 'Top Rated TV Shows', link: '/category/tv/top_rated' },
  ];

  const exploreItems = [
    { label: 'Find Similar Movies or TV Shows', link: '/explore/similar' },
    { label: 'Find Similar From TMDB', link: '/explore/similar_from_tmdb' },
    { label: 'Discover Movies and TV Shows', link: '/explore/discover' },
    { label: 'Explore Movie Genres', link: '/explore/genre/movie/list' },
    { label: 'Explore TV Show Genres', link: '/explore/genre/tv/list' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: isMobile ? 'flex-start' : 'center',
        width: isMobile ? '100%' : 'auto',
      }}
    >
      <DropdownButton label="MOVIES" items={moviesItems} isMobile={isMobile} />
      <DropdownButton label="TV SHOWS" items={tvShowsItems} isMobile={isMobile} />
      <DropdownButton label="EXPLORE" items={exploreItems} isMobile={isMobile} />
    </Box>
  );
};

export default NavigationMenu;

