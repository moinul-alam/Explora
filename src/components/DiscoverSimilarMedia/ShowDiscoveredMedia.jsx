import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const ShowDiscoveredMedia = ({ mediaResults }) => {
  return (
    <Grid container spacing={3}>
      {mediaResults.map((media) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={media.id}>
          <Card>
            <CardMedia
              component="img"
              height="250"
              image={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : "/placeholder.jpg"}
              alt={media.title || media.name}
            />
            <CardContent>
              <Typography variant="h6" noWrap>
                {media.title || media.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {media.release_date || media.first_air_date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowDiscoveredMedia;
