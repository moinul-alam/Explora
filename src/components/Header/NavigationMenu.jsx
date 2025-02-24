import { Box } from '@mui/material';
import DropdownButton from '@src/components/Header/DropdownButton';

const NavigationMenu = ({ isMobile, onItemClick }) => {
  const moviesItems = [
    { label: 'Upcoming Movies', link: '/category/movie/upcoming' },
    { label: 'Trending Movies', link: '/category/movie/trending' },
    { label: 'Popular Movies', link: '/category/movie/popular' },
    { label: 'Top Rated Movies', link: '/category/movie/top_rated' },
    { label: 'Explore Movie Genres', link: '/explore/genre/movie/list' }
  ];

  const tvShowsItems = [
    { label: 'Trending TV Shows', link: '/category/tv/trending' },
    { label: 'Popular TV Shows', link: '/category/tv/popular' },
    { label: 'Top Rated TV Shows', link: '/category/tv/top_rated' },
    { label: 'Explore TV Show Genres', link: '/explore/genre/tv/list' },
  ];

  const exploreItems = [
    { label: 'All Recommender Features', link: '/explore/recommenders' },
    { label: 'Find Similar Movies or TV Shows', link: '/explore/similar' },
    { label: 'Discover Movies and TV Shows', link: '/explore/discover' },
    { label: 'Chat and Get Recommendations', link: '/explore/user_chat_recommender' },
    { label: 'Select and Get Recommendations', link: '/explore/favorite_item_recommender' },
    { label: 'Select, Rate and Get Recommendations', link: '/explore/user_rating_recommender' },
    { label: 'Find Similar From TMDB', link: '/explore/similar_from_tmdb' },
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
      <DropdownButton
        label="MOVIES"
        items={moviesItems}
        isMobile={isMobile}
        onItemClick={onItemClick}
      />
      <DropdownButton
        label="TV SHOWS"
        items={tvShowsItems}
        isMobile={isMobile}
        onItemClick={onItemClick}
      />
      <DropdownButton
        label="EXPLORE"
        items={exploreItems}
        isMobile={isMobile}
        onItemClick={onItemClick}
      />
    </Box>
  );
};

export default NavigationMenu;
