import HeroSlider from '@src/components/HeroSlider/HeroSlider';
import { PopularMoviesSlider, PopularTVSlider }  from '@src/components/home/index';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <PopularMoviesSlider />
      <PopularTVSlider />
    </div>
  )
};

export default Home;
