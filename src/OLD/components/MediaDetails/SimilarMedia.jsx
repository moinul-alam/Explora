import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const SimilarMedia = () => {
  const { mediaType, id } = useParams();
  const { data, loading, error } = useFetchData(`api/media/similar/${mediaType}/${id}`);
  const navigate = useNavigate();

  const handleCardClick = (mediaId) => {
    navigate(`/${mediaType}/${mediaId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading similar media!</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{mediaType === "movie" ? "Similar Movies from TMDB" : "Similar TV Series from TMDB"}</h2>
      <MediaShowcase data={data} onCardClick={handleCardClick} />
    </div>
  );
};

export default SimilarMedia;
