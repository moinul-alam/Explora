import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";

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
  if (error) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

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
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {/* End of Content */}
      {!hasMore && !loading && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
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
