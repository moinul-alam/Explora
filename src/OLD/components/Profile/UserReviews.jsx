import { Paper, Typography, Divider, Box } from "@mui/material";

const UserReviews = ({ reviews }) => (
  <Paper sx={{ padding: 4 }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      Reviews
    </Typography>
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <Box key={review._id} sx={{ marginBottom: 2 }}>
          <Typography>
            <strong>{review.mediaType.toUpperCase()}</strong>: {review.title}
          </Typography>
          <Typography>Rating: {review.rating}</Typography>
          <Typography>Comment: {review.comment}</Typography>
          <Typography variant="caption">
            Reviewed at: {new Date(review.reviewedAt).toLocaleString()}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
        </Box>
      ))
    ) : (
      <Typography>No reviews available.</Typography>
    )}
  </Paper>
);

export default UserReviews;
