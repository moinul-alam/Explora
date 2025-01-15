import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LogoLight from '@src/assets/logo-light.png';
import LogoDark from '@src/assets/logo-dark.png';

const Logo = ({ mode, isMobile }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={() => navigate('/')} 
    >
      <img
        src={mode === 'light' ? LogoLight : LogoDark}
        alt="Logo"
        style={{
          width: isMobile ? '80px' : '210px',
          height: 'auto',
        }}
      />
    </Box>
  );
};

export default Logo;
