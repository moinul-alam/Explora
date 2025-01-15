//PopularTvSeries.jsx

import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const PopularTVSeries = () => {
  return (
    <MediaGallery
      title="Popular TV Series"
      fetchUrl="/api/media/popular/tv"
      mediaType="tv"
      renderItem={(item) => (
        <MediaCard
          mediaData={item}
          onClick={() => (window.location.href = `/tv/${item.id}`)}
        />
      )}
    />
  );
};

export default PopularTVSeries;
