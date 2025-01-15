import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";

const GenreListPage = () => {
  const { mediaType } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetchData(`/api/media/genre/${mediaType}/list`);

  const handleGenreClick = (genre) => {
    navigate(`/media/genre/${mediaType}?with_genres=${genre.id}`);
  };

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
        {mediaType === "movie" ? "Movie Genres" : "TV Series Genres"}
      </Typography>
      <Grid container spacing={3}>
        {data?.genres?.map((genre) => (
          <Grid item xs={16} sm={6} md={4} key={genre.id}>
            <Card
              sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => handleGenreClick(genre)}
            >
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {genre.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GenreListPage;
