import PropTypes from 'prop-types';
import { Box, Typography, Grid, useMediaQuery, useTheme, Divider } from '@mui/material';
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

  // Responsive items per row
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const adjustedItemsPerRow = isSmallScreen ? 1 : isMediumScreen ? 3 : itemsPerRow;

  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box sx={{ padding: '2rem', backgroundColor: 'background.default' }}>
      {/* Title Section */}
      <Box sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Divider sx={{ marginTop: '0.5rem', width: '50%', mx: 'auto', backgroundColor: 'primary.main' }} />
      </Box>

      {/* Grid Layout */}
      <Grid
        container
        spacing={spacing}
        justifyContent={mediaItems.length === 1 ? 'center' : 'flex-start'}
        alignItems={mediaItems.length === 1 ? 'center' : 'stretch'}
        sx={{
          minHeight: mediaItems.length === 1 ? '300px' : 'auto',
          backgroundColor: 'background.paper',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        {mediaItems.map((item) => (
          <Grid
            item
            xs={mediaItems.length === 1 ? 12 : 12 / adjustedItemsPerRow}
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '4px',
              boxShadow: theme.shadows[1],
              '&:hover': {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <SkeletonLoader type="media" count={10} aspectRatio={16 / 9} />
        </Box>
      )}

      {/* End of Content */}
      {!hasMore && !loading && (
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Typography variant="body1" color="textSecondary">
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
