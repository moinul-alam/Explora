import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const UserReviews = ({ reviews }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path); 
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Reviews
      </Typography>
      {reviews.length > 0 ? (
        <MediaShowcase
          data={reviews.map((review) => ({
            ...review.media,
            userComment: review.comment,
            userRating: review.rating,
          }))}
          onCardClick={(media) =>
            handleClick(`/details/${media.media_type}/${media.tmdb_id}`)
          }
        />
      ) : (
        <Typography>No reviews available.</Typography>
      )}
    </Paper>
  );
};

export default UserReviews;
