import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingIndicator = ({ message = 'Loading...', size = 40 }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
    }}
  >
    <CircularProgress size={size} sx={{ mb: 2 }} />
    {message && (
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {message}
      </Typography>
    )}
  </Box>
);

export default LoadingIndicator;
