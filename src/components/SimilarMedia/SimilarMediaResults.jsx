import { useNavigate } from 'react-router-dom';
import MediaShowcase from "@src/components/Common/MediaShowcase";

const SimilarMediaResults = ({ mediaData }) => { 
  const navigate = useNavigate();

  const handleCardClick = (mediaType, mediaId) => {
    navigate(`/details/${mediaType}/${mediaId}`);
  };

  return (
    <MediaShowcase
      data={mediaData}
      onCardClick={(mediaId) => handleCardClick(mediaData.mediaType, mediaId)}
    />
  );
}

export default SimilarMediaResults;
