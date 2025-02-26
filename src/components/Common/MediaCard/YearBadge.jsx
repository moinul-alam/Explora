import { Box, Typography } from '@mui/material';

const YearBadge = ({ year }) => (
  <Box
    sx={{
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '0.3125rem',
      borderRadius: '0.625rem 0 0.625rem 0',
    }}
  >
    <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>
      {year ? new Date(year).getFullYear() : ''}
    </Typography>
  </Box>
);

export default YearBadge;
