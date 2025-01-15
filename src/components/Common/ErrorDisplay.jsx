import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorDisplay = ({ message = 'An error occurred.', onRetry }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
      backgroundColor: 'background.paper',
      borderRadius: '8px',
      padding: 3,
    }}
  >
    <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
    <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
      {message}
    </Typography>
    {onRetry && (
      <Button variant="contained" color="primary" onClick={onRetry}>
        Retry
      </Button>
    )}
  </Box>
);

export default ErrorDisplay;
