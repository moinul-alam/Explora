import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import MediaGallery from '@src/components/MediaGallery/MediaGallery';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const GenreDetailsPage = () => {
  const { genreName, mediaType } = useParams();
  const newGenreName = decodeURIComponent(genreName);
  const [searchParams] = useSearchParams();
  const withGenres = searchParams.get('with_genres');
  const navigate = useNavigate();

  const fetchUrl = `/media/discover/${mediaType}?with_genres=${withGenres}`;

  return (
      <MediaGallery
        title={`${mediaType === 'movie' ? `${newGenreName} Movies` : `${newGenreName} TV Shows`}`}
        fetchUrl={fetchUrl}
        mediaType={mediaType}
        renderItem={(item) => (
          <MediaCard
            mediaData={item}
            onClick={() => navigate(`/details/${mediaType}/${item.id}`)}
          />
        )}
      />
  );
};

export default GenreDetailsPage;
