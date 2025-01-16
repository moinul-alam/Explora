import { useNavigate } from "react-router-dom";
import useFetchData from "@src/hooks/useFetchData";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';

const SimilarMedia = ( mediaType, mediaId ) => {
  const { data, loading, error } = useFetchData(`/media/${mediaType}/${mediaId}/similar`);
  const navigate = useNavigate();

  const handleCardClick = (mediaId) => {
    navigate(`/${mediaType}/${mediaId}`);
  };

  if (loading) return <SkeletonLoader type="media" count={5}/>;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>{mediaType === "movie" ? "Similar Movies from TMDB" : "Similar TV Series from TMDB"}</h2>
      <MediaShowcase data={data} onCardClick={handleCardClick} />
    </div>
  );
};

export default SimilarMedia;