import MenuButton from '@src/components/Header/MenuButton';

const NavigationMenu = ({ darkMode }) => {

  const exploreMenuItems = [
    { label: 'Top Rated Movies', link: '/top-rated/movie' },
    { label: 'Top Rated TV Series', link: '/top-rated/tv' },
    { label: 'Popular Movies', link: '/popular/movie' },
    { label: 'Popular TV Series', link: '/popular/tv' },
  ];

  const discoverMenuItems = [
    { label: 'Discover Movies and TV Series', link: '/media-discovery' },
    { label: 'Similar Movies/TV Series' , link: '/media/similar'},
    { label: 'Movie Genres', link: '/movie/genres' },
    { label: 'TV Series Genres', link: '/tv/genres' },
  ];

  return (
    <>
      <MenuButton label="EXPLORE" menuItems={exploreMenuItems} darkMode={darkMode} />
      <MenuButton label="DISCOVER" menuItems={discoverMenuItems} darkMode={darkMode} />
    </>
  );
};

export default NavigationMenu;
