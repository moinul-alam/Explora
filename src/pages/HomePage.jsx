import { Box } from '@mui/material';
import HeroSlider from '@src/components/HeroSlider/HeroSlider';
import MediaSlider from '@src/components/MediaSlider/MediaSlider';

const HomePage = () => {
  return (
    <Box>
      <HeroSlider />
      <MediaSlider
        title="Popular Movies"
        fetchUrl="/media/category/movie/popular"
        viewAllUrl="/category/movie/popular"
        detailBaseUrl="details/movie"
        color="primary"
      />
      
      <MediaSlider
        title="Popular TV Shows"
        fetchUrl="/media/category/tv/popular"
        viewAllUrl="/category/tv/popular"
        detailBaseUrl="details/tv"
        color="primary"
      />
    </Box>
  );
};

export default HomePage;