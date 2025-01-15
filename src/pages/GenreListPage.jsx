import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import useFetchData from '@src/hooks/useFetchData';

const GenreListPage = () => {
  const { mediaType } = useParams();
  const navigate = useNavigate();
  const { data: genreData, loading, error } = useFetchData(`/media/genre/${mediaType}/list`);

  const handleGenreClick = (genre) => {
    const genreName = encodeURIComponent(genre.name);
    navigate(`/explore/${genreName}/${mediaType}?with_genres=${genre.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color='error'>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ mr: 5, ml: 5 }}>
      <Typography variant='h3' sx={{ textAlign: 'center', p: 3 }}>
        {mediaType === 'movie' ? 'ALL MOVIE GENRES' : 'ALL TV GENRES'}
      </Typography>
      <Grid container spacing={3}>
        {genreData?.genres?.map((genre) => (
          <Grid item xs={16} sm={6} md={4} key={genre.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  backgroundColor: '#080',
                  transform: 'scale(1.10)',
                },
              }}
              onClick={() => handleGenreClick(genre)}
            >
              <CardContent>
                <Typography variant='h6' textAlign='center'>
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