import { useState, useEffect } from 'react';
import { useAuth } from '@src/context/AuthContext';
import { IconButton, Tooltip, Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder, Star, StarBorder } from '@mui/icons-material';
import Rating from 'react-rating';
import api from '@src/utils/api';

const MediaActionBar = ({ mediaType, mediaId, tmdbId, title }) => {
  const { user, loading } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (!user) return;

      try {
        const response = await api.get(`/user/profile/view`);
        const { preferences, reviews } = response.data;

        // Check favorite status based on media type
        const isFavoriteMedia = mediaType === 'movie' 
        ? preferences.favoriteMovies?.some(media => media._id.toString() === mediaId)
        : preferences.favoriteSeries?.some(media => media._id.toString() === mediaId);

        setIsFavorite(isFavoriteMedia);

        // Check watchlist status
        const isInWatchlistMedia = preferences.watchlist?.some(media => media._id.toString() === mediaId);
        setIsInWatchlist(isInWatchlistMedia);

        // Check for existing review
        const existingReview = reviews?.find(
          (review) => review.media._id === mediaId && review.media.media_type === mediaType
        );

        if (existingReview) {
          setUserReview(existingReview);
          setRating(existingReview.rating);
          setComment(existingReview.comment || '');
        } else {
          // Reset review state if no existing review
          setUserReview(null);
          setRating(0);
          setComment('');
        }
      } catch (error) {
        console.error('Error fetching user preferences and reviews:', error);
      }
    };

    if (!loading) {
      fetchUserPreferences();
    }
  }, [user, loading, mediaId, mediaType]);

  const handleFavorite = async () => {
    if (!user) {
      alert('You must register to favorite this media.');
      return;
    }

    const endpoint = '/user/preferences/update';
    const payload = {
      userId: user._id,
      [isFavorite ? 'remove' : 'add']: {
        [mediaType === 'movie' ? 'favoriteMovies' : 'favoriteSeries']: [mediaId],
      },
    };

    try {
      await api.patch(endpoint, payload);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert state if API call fails
      alert('Failed to update favorites. Please try again.');
    }
  };

  const handleWatchlist = async () => {
    if (!user) {
      alert('You must register to add this media to your watchlist.');
      return;
    }

    const endpoint = '/user/preferences/update';
    const payload = {
      userId: user._id,
      [isInWatchlist ? 'remove' : 'add']: {
        watchlist: [mediaId],
      },
    };

    try {
      await api.patch(endpoint, payload);
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      alert('Failed to update watchlist. Please try again.');
    }
  };

  const handleReview = () => {
    if (!user) {
      alert('You must register to review this media.');
      return;
    }
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    if (!rating || rating < 1 || rating > 10) {
      alert('Please provide a valid rating between 1 and 10.');
      return;
    }
    

    const newReview = {
      mediaType: mediaType,
      tmdb_id: tmdbId,
      mediaId: mediaId,
      rating,
      comment,
    };

    console.log("newReview: ", newReview);

    try {
      const response = await api.patch('/user/reviews/update', {
        add: [newReview],
      });

      if (response.status === 'success') {
        setUserReview(newReview);
        setShowModal(false);
        alert('Thanks for your feedback!');
      } else {
        alert('There was an issue submitting your review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting your review.');
    }
  };

  if (loading) return null;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          boxShadow: 3,
          p: 1,
          borderRadius: '0.25rem',
          width: 'fit-content',
          gap: 3,
          mt: 3,
        }}
      >
        <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
          <IconButton
            onClick={handleFavorite}
            color={isFavorite ? 'primary' : 'default'}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>

        <Tooltip title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}>
          <IconButton
            onClick={handleWatchlist}
            color={isInWatchlist ? 'primary' : 'default'}
          >
            {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Tooltip>

        <Tooltip title={userReview ? 'Update Review' : 'Submit a Review'}>
          <IconButton 
            onClick={handleReview} 
            color={userReview ? 'primary' : 'default'}
          >
            {userReview ? <Star /> : <StarBorder />}
          </IconButton>
        </Tooltip>
      </Box>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: '2rem',
            boxShadow: 24,
            borderRadius: '0.5rem',
          }}
        >
          <Typography variant="h6">
            {userReview ? 'Update Your Review' : 'Submit Your Review'}
          </Typography>
          <Rating
            initialRating={rating}
            stop={10}
            emptySymbol={<StarBorder />}
            fullSymbol={<Star />}
            onChange={(value) => setRating(value)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Optional Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: '1.5rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: '1.5rem' }}
            onClick={handleSubmitReview}
          >
            {userReview ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MediaActionBar;