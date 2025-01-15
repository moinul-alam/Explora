import { Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
        padding: '3rem',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: '5rem',
          color: '#ff6b6b',
          marginBottom: '1rem',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: '#333',
          marginBottom: '1.5rem',
        }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#666',
          marginBottom: '2rem',
          fontSize: '1.1rem',
        }}
      >
        Sorry, the page you're looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{
          padding: '0.75rem 2rem',
          borderRadius: 5,
          fontWeight: 'bold',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFound;
