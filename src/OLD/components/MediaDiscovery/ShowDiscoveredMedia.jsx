// /components/ShowDiscoveredMedia.jsx
import React from 'react';
import { Box, Grid, Typography, CircularProgress, Card, CardContent } from '@mui/material';

const ShowDiscoveredMedia = ({ results, loading, error }) => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      {/* Loading State */}
      {loading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" sx={{ textAlign: 'center', marginTop: '20px' }}>
          {error}
        </Typography>
      )}

      {/* Display Results */}
      {!loading && !error && results.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Results:
          </Typography>
          <Grid container spacing={2}>
            {results.map((result, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{result.title}</Typography>
                    <Typography variant="body2">{result.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* If no results are found */}
      {!loading && !error && results.length === 0 && (
        <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
          No results found. Try changing the filters.
        </Typography>
      )}
    </Box>
  );
};

export default ShowDiscoveredMedia;
