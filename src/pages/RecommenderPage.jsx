import React from 'react';
import { Button, Grid, Typography, Container } from '@mui/material';
import { Movie, Search, Chat, RateReview } from '@mui/icons-material';

const RecommenderPage = () => {
  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Movie Recommendation Features
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {/* Find Similar Movie */}
        <Grid item xs={12} sm={6} md={4}>
          <a
            href="/explore/similar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              fullWidth
              color="primary"
              startIcon={<Movie />}
              sx={{ height: 100, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Find Similar Movie
            </Button>
          </a>
        </Grid>
        {/* Find A Movie */}
        <Grid item xs={12} sm={6} md={4}>
          <a
            href="/explore/discover"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              startIcon={<Search />}
              sx={{ height: 100, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Find A Movie
            </Button>
          </a>
        </Grid>

        {/* Chat and Get Recommendations */}
        <Grid item xs={12} sm={6} md={4}>
          <a
            href="/chat_recommender"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              fullWidth
              color="success"
              startIcon={<Chat />}
              sx={{ height: 100, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Chat and Get Recommendations
            </Button>
          </a>
        </Grid>

        {/* Search, Rate and Get Recommendations */}
        <Grid item xs={12} sm={6} md={4}>
          <a
            href="/rating_recommender"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="contained"
              fullWidth
              color="warning"
              startIcon={<RateReview />}
              sx={{ height: 100, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Search, Rate and Get Recommendations
            </Button>
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecommenderPage;
