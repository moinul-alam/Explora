//TopRatedMovies.jsx

import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const TopRatedMovies = () => {
  return (
    <MediaGallery
      title="Top Rated Movies"
      fetchUrl="/api/media/top-rated/movie"
      mediaType="movie"
      renderItem={(item) => (
        <MediaCard
          mediaData={item}
          onClick={() => (window.location.href = `/movie/${item.id}`)}
        />
      )}
    />
  );
};

export default TopRatedMovies;
