import { useParams, Link } from 'react-router-dom';
import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaCategoryPage = () => {
  const { mediaType, mediaCategory } = useParams();

  const formatCategory = (category) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatMediaType = (type) => {
    const formatted = type.charAt(0).toUpperCase() + type.slice(1);
    return formatted.endsWith('s') ? formatted : `${formatted}s`;
  };

  const formattedTitle = `${formatCategory(mediaCategory)} ${formatMediaType(mediaType)}`;

  const fetchUrl = `media/category/${mediaType}/${mediaCategory}`;

  return (
    <MediaGallery
      title={formattedTitle}
      fetchUrl={fetchUrl}
      mediaType={mediaType}
      renderItem={(item) => (
        <Link to={`/details/${mediaType}/${item.id}` } style={{ textDecoration: 'none', color: 'inherit'}}>
          <MediaCard mediaData={item} />
        </Link>
      )}
    />
  );  
};

export default MediaCategoryPage;