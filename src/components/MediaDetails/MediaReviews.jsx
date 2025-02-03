import { Box, Typography, Rating } from '@mui/material';
import moment from 'moment';

const MediaReviews = ({ reviews }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Reviews
      </Typography>

      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <Box key={review._id} sx={{ borderBottom: '1px solid #ddd', pb: 3, mb: 3 }}>
            {/* User Info and Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {review.userId.info.firstName} {review.userId.info.lastName}
              </Typography>

              {/* Display Rating with a 1 to 10 scale */}
              <Rating
                value={review.rating}  // Use the full 1-10 rating scale
                max={10}
                readOnly
                sx={{ ml: 1 }} // Small margin to the left of the name
              />
            </Box>

            {/* Review Date */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.9rem' }}>
                {moment(review.createdAt).format('MMM Do, YYYY h:mm A')}
              </Typography>
            </Box>

            {/* Review Comment */}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {review.comment}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ color: 'gray' }}>
          No reviews yet.
        </Typography>
      )}
    </Box>
  );
};

export default MediaReviews;
