import PropTypes from 'prop-types';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import useMediaGallery from '@src/hooks/useMediaGallery';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';

const MediaGallery = ({
  title,
  fetchUrl,
  renderItem,
  mediaType,
  itemsPerRow = 5,
  spacing = 2,
  fetchMoreOnScroll = true,
}) => {
  const { mediaItems, loading, error, hasMore } = useMediaGallery(fetchUrl, fetchMoreOnScroll);
  const theme = useTheme();

  // Adjust number of items per row based on screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const adjustedItemsPerRow = isSmallScreen ? 1 : isMediumScreen ? 3 : itemsPerRow;

  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box sx={{ padding: '1.5rem' }}>
      {/* Title */}
      <Typography variant='h4' fontWeight='bold' textAlign='center' gutterBottom>
        {title}
      </Typography>

      {/* Grid Layout */}
      <Grid
        container
        spacing={spacing}
        justifyContent={mediaItems.length === 1 ? 'center' : 'flex-start'}
        alignItems={mediaItems.length === 1 ? 'center' : 'stretch'}
        sx={{ minHeight: mediaItems.length === 1 ? '300px' : 'auto' }} // Optional: set a minimum height for better centering
      >
        {mediaItems.map((item) => (
          <Grid
            item
            xs={mediaItems.length === 1 ? 12 : 12 / adjustedItemsPerRow} // For a single item, use full width
            key={item.id}
            sx={{ display: 'flex', justifyContent: 'center' }} // Center the item itself
          >
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>

      {/* Loading Spinner */}
      {loading && (
        <SkeletonLoader type='media' count={10} aspectRatio={16 / 9} />
      )}

      {/* End of Content */}
      {!hasMore && !loading && (
        <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Typography variant='body1' color='textSecondary'>
            No more {mediaType}s to display.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

MediaGallery.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number,
  spacing: PropTypes.number,
  fetchMoreOnScroll: PropTypes.bool,
};

export default MediaGallery;
