import MediaSlider from '@src/components/MediaSlider/MediaSlider';

const PopularMoviesSlider = () => {
  return (
    <MediaSlider
      title="Popular Movies"
      fetchUrl="/api/media/category/movie/popular"
      viewAllUrl="/popular-movies"
      detailBaseUrl="movie"
      color="warning"
    />
  );
};

export default PopularMoviesSlider;