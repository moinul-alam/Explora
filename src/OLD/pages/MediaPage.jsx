import { useParams } from 'react-router-dom';
import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaPage = () => {
  const { category, mediaType } = useParams();

  const titles = {
    movie: {
      'top-rated': 'Top Rated Movies',
      'popular': 'Popular Movies'
    },
    tv: {
      'top-rated': 'Top Rated TV Series',
      'popular': 'Popular TV Series'
    }
  };

  // Handle invalid routes
  if (!titles[mediaType]?.[category]) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">Invalid Category or mediaType</h2>
        <p>Please check your URL and try again.</p>
      </div>
    );
  }

  return (
    <MediaGallery
      title={titles[mediaType][category]}
      fetchUrl={`/api/media/${category}/${mediaType}`}
      mediaType={mediaType}
      renderItem={(item) => (
        <MediaCard
          mediaData={item}
          onClick={() => (window.location.href = `/${mediaType}/${item.id}`)}
        />
      )}
    />
  );
};

export default MediaPage;