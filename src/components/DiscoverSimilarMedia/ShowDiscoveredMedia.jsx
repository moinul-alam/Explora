import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from "@mui/material";
import FallbackImage from "@src/assets/fallback-image.png";

const ShowDiscoveredMedia = ({ mediaResults, loading }) => {
  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      {mediaResults.length === 0 ? (
        <Typography variant="h6">No results found.</Typography>
      ) : (
        mediaResults.map((media) => (
          <Grid item xs={12} sm={6} md={4} key={media.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={media.poster_path ? `https://image.tmdb.org/t/p/w300${media.poster_path}` : FallbackImage}
                alt={media.title || media.name}
              />
              <CardContent>
                <Typography variant="h6">{media.title || media.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {media.overview ? media.overview.slice(0, 100) + "..." : "No description available."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ShowDiscoveredMedia;
