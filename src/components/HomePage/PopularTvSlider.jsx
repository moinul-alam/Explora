import MediaSlider from '@src/components/MediaSlider/MediaSlider';

const PopularTvSlider = () => {
  return (
    <MediaSlider
      title="Popular TV Shows"
      fetchUrl="/media/category/tv/popular"
      viewAllUrl="/category/tv/popular"
      detailBaseUrl="details/tv"
      color="primary"
    />
  );
};

export default PopularTvSlider;
