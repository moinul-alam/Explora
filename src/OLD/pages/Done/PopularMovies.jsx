//PopularMovies.jsx

import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const PopularMovies = () => {
  return (
    <MediaGallery
      title="Popular Movies"
      fetchUrl="/api/media/popular/movie"
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

export default PopularMovies;
