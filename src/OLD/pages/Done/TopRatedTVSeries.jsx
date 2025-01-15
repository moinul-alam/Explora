//TopRatedTVSeries.jsx

import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const TopRatedTVSeries = () => {
  return (
    <MediaGallery
      title="Top Rated TV Series"
      fetchUrl="/api/media/top-rated/tv"
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

export default TopRatedTVSeries;
