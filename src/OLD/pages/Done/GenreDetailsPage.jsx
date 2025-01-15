import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import useMediaDiscovery from "@src/hooks/useMediaDiscovery";

const GenreDetailsPage = () => {
  const { mediaType } = useParams();
  const [searchParams] = useSearchParams();
  const withGenres = searchParams.get("with_genres"); 

  const { mediaItems, loading, error } = useMediaDiscovery(mediaType);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" gutterBottom>
        {mediaType === "movie" ? "Movies" : "TV Series"}
      </Typography>
      <Grid container spacing={3}>
        {mediaItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.title || item.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenreDetailsPage;
