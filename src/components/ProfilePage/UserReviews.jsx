import { Paper, Typography, Box } from "@mui/material";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const UserReviews = ({ reviews }) => {

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
          detailsLink={(item) => `/details/${item.type}/${item.tmdb_id}`}
        />
      ) : (
        <Typography>No reviews available.</Typography>
      )}
    </Paper>
  );
};

export default UserReviews;
