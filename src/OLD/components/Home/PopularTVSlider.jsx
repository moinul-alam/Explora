import React from 'react';
import MediaSlider from '@src/components/MediaSlider/MediaSlider';

const PopularTVSlider = () => {
  return (
    <MediaSlider
      title="Popular TV Series"
      fetchUrl="/api/media/category/tv/popular"
      viewAllUrl="/popular-tv-series"
      detailBaseUrl="tv"
      color="primary"
    />
  );
};

export default PopularTVSlider;
