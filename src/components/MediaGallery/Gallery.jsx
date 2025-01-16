import PropTypes from "prop-types";
import { Box, Typography, Grid } from "@mui/material";
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';

const Gallery = ({ 
  title, 
  mediaItems, 
  renderItem, 
  mediaType, 
  itemsPerRow = 5, 
  spacing = 2, 
  loading, 
  hasMore, 
  error 
}) => {
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box sx={{ padding: "1.5rem" }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        {title}
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={spacing}>
        {mediaItems.map((item) => (
          <Grid item xs={12 / itemsPerRow} key={item.id}>
            {renderItem(item)}
          </Grid>
        ))}
      </Grid>

      {/* Loading Spinner */}
      {loading && (
        <SkeletonLoader type="media" count={10} aspectRatio={16 / 9} />
      )}

      {/* End of Content */}
      {!hasMore && !loading && (
        <Box sx={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Typography variant="body1" color="textSecondary">
            No more {mediaType}s to display.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  mediaItems: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number,
  spacing: PropTypes.number,
  loading: PropTypes.bool,
  hasMore: PropTypes.bool,
  error: PropTypes.string,
};

export default Gallery;
