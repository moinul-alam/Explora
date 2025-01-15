import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const RecommendationMedia = () => {
  const { mediaType, id } = useParams();
  const { data, loading, error } = useFetchData(`api/media/recommendations/${mediaType}/${id}`);
  const navigate = useNavigate();

  const handleCardClick = (mediaId) => {
    navigate(`/${mediaType}/${mediaId}`);
  }

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading recommendations!</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{mediaType === "movie" ? "Recommended Movies from TMDB" : "Recommended TV Series from TMDB"}</h2>
      <MediaShowcase data={data} onCardClick={handleCardClick} />
    </div>
  );
};

export default RecommendationMedia;
