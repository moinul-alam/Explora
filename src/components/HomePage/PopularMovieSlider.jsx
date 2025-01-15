import MediaSlider from '@src/components/MediaSlider/MediaSlider';

const PopularMovieSlider = () => {
  return (
    <MediaSlider
      title="Popular Movies"
      fetchUrl="/media/category/movie/popular"
      viewAllUrl="/category/movie/popular"
      detailBaseUrl="details/movie"
    />
  );
};

export default PopularMovieSlider;