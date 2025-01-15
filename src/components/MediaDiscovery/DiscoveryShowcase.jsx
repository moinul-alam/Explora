import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";

const DiscoveryShowcase = ({ queryUrl, mediaType }) => {
  const { data, loading, error } = useFetchData(queryUrl);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error fetching data</div>;

  const results = data?.data?.results || [];

  if (results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      <h3>Results for {mediaType}</h3>
      <Grid container spacing={3}>
        {results.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/default-image.jpg"
                  }
                  alt={item.title || item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title || item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.overview || "No overview available."}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DiscoveryShowcase;
