import { Box, Typography } from '@mui/material';
import LightLogo from '@src/assets/LightLogo.png';
import DarkLogo from '@src/assets/DarkLogo.png';

const LogoSection = ({ darkMode, isMobile }) => {
  return (
    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
      <img
        src={darkMode ? DarkLogo : LightLogo}
        alt="Logo"
        style={{ width: isMobile ? '80px' : '210px', height: '40px', cursor: 'pointer' }}
        onClick={() => (window.location.href = '/')}
      />
      {!isMobile && (
        <Typography
          variant=""
          onClick={() => (window.location.href = '/')}
          sx={{ cursor: 'pointer', ml: 2, color: darkMode ? 'white' : 'white' }}
        >
          Content Recommendation Engine
        </Typography>
      )}
    </Box>
  );
};

export default LogoSection;
