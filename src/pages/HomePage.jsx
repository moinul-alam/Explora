import { Box } from '@mui/material';
import HeroSlider from '@src/components/HeroSlider/HeroSlider';
import PopularMovieSlider from '@src/components/HomePage/PopularMovieSlider';
import PopularTvSlider from '@src/components/HomePage/PopularTvSlider';

const HomePage = () => {
  return (
    <Box>
      <HeroSlider />
      <PopularMovieSlider />
      <PopularTvSlider />
    </Box>
  );
};

export default HomePage;