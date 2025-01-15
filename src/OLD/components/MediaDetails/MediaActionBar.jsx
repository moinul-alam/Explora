import React, { useState, useEffect } from 'react';
import { useUser } from '@src/contexts/UserContext';
import { Button, Tooltip, Modal, Box, Typography, TextField } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import api from '@src/utils/API';
import StarRatingComponent from 'react-star-rating-component';

const MediaActionBar = ({ mediaId, mediaType, title }) => {
  const { user, loading } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [review, setReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch user preferences and reviews
  useEffect(() => {
    if (!loading && user) {
      const fetchUserPreferences = async () => {
        try {
          const response = await api.get('/api/user/profile/view');
          const { preferences, reviews } = response.data.user;

          // Check favorite status
          const isFavoriteMedia =
            mediaType === 'movie'
              ? preferences.favoriteMovies.includes(mediaId)
              : preferences.favoriteSeries.includes(mediaId);
          setIsFavorite(isFavoriteMedia);

          // Check watchlist status
          const isInWatchlistMedia = preferences.watchlist.includes(mediaId);
          setIsInWatchlist(isInWatchlistMedia);

          // Check for existing reviews
          const existingReview = reviews.find(
            (review) => review.mediaID === mediaId && review.mediaType === mediaType
          );
          if (existingReview) {
            setReview(existingReview);
            setRating(existingReview.rating);
            setComment(existingReview.comment || '');
          }
        } catch (error) {
          console.error('Error fetching user preferences and reviews:', error);
        }
      };

      fetchUserPreferences();
    }
  }, [user, loading, mediaId, mediaType]);

  // Handle adding/removing favorite
  const handleFavorite = async () => {
    if (!user) {
      alert('You must register to favorite this media.');
      return;
    }

    const payload = {
      [mediaType === 'movie' ? 'favoriteMovies' : 'favoriteSeries']: [mediaId],
    };

    try {
      if (isFavorite) {
        // Remove from favorites
        await api.patch('/api/user/preferences/update', {
          userId: user._id,
          remove: payload,
        });
      } else {
        // Add to favorites
        await api.patch('/api/user/preferences/update', {
          userId: user._id,
          add: payload,
        });
      }

      // Toggle favorite state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Handle adding/removing watchlist
  const handleWatchlist = async () => {
    if (!user) {
      alert('You must register to add this media to your watchlist.');
      return;
    }

    const payload = {
      watchlist: [mediaId],
    };

    try {
      if (isInWatchlist) {
        // Remove from watchlist
        await api.patch('/api/user/preferences/update', {
          userId: user._id,
          remove: payload,
        });
      } else {
        // Add to watchlist
        await api.patch('/api/user/preferences/update', {
          userId: user._id,
          add: payload,
        });
      }

      // Toggle watchlist state
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
    }
  };

  // Open review modal
  const handleReview = () => {
    if (!user) {
      alert('You must register to review this media.');
      return;
    }
    setShowModal(true);
  };

  // Submit review
  const handleSubmitReview = async () => {
    if (!rating || rating < 1 || rating > 10) {
      alert('Please provide a valid rating between 1 and 10.');
      return;
    }

    const payload = {
        add: [{
            mediaType,
            mediaID: mediaId,
            rating,
            comment,
        }]
    };

    try {
      const response = await api.patch('/api/user/reviews/update', payload);

      if (response.status === 200) {
        alert('Thanks for your feedback!');
        setReview({
          mediaType,
          mediaID: mediaId,
          rating,
          comment,
        });
        setShowModal(false);
      } else {
        console.error('Unexpected response:', response.data);
        alert('There was an issue submitting your review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting your review.');
    }
  };

  if (loading) return null; // Wait for loading to complete

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {/* Favorite Button */}
      <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
        <Button onClick={handleFavorite} color={isFavorite ? 'primary' : 'default'}>
          {isFavorite ? <Star /> : <StarBorder />} Favorite
        </Button>
      </Tooltip>

      {/* Watchlist Button */}
      <Tooltip title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}>
        <Button onClick={handleWatchlist} color={isInWatchlist ? 'primary' : 'default'}>
          Watchlist
        </Button>
      </Tooltip>

      {/* Review Button */}
      <Tooltip title="Submit a Review">
        <Button onClick={handleReview}>Review</Button>
      </Tooltip>

      {/* Review Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 24,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6">Submit Your Review</Typography>
          <StarRatingComponent
            name="media-rating"
            starCount={10}
            value={rating}
            onStarClick={(nextValue) => setRating(nextValue)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Optional Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmitReview}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MediaActionBar;
