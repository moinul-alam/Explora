import { Box, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

// Define animations
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const slide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

// Styled components
const ProjectorLight = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: theme.palette.primary.main,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: theme.palette.common.white,
    boxShadow: `0 0 40px ${theme.palette.primary.light}`
  }
}));

const FilmReel = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  border: `8px solid ${theme.palette.grey[800]}`,
  position: 'absolute',
  animation: `${rotate} 3s linear infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: `4px dashed ${theme.palette.grey[600]}`
  }
}));

const LightBeam = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 200,
  height: 0,
  borderTop: `100px solid ${theme.palette.primary.light}`,
  borderLeft: '50px solid transparent',
  borderRight: '50px solid transparent',
  opacity: 0.2,
  animation: `${flicker} 1s ease-in-out infinite`,
  transform: 'rotate(-45deg)',
  transformOrigin: '0 0'
}));

const FilmStrip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: -20,
  left: 0,
  height: 40,
  width: '200%',
  background: `repeating-linear-gradient(
    90deg,
    ${theme.palette.grey[900]} 0px,
    ${theme.palette.grey[900]} 15px,
    ${theme.palette.grey[800]} 15px,
    ${theme.palette.grey[800]} 30px
  )`,
  animation: `${slide} 2s linear infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    height: 30,
    background: `repeating-linear-gradient(
      transparent 0px,
      transparent 10px,
      ${theme.palette.grey[700]} 10px,
      ${theme.palette.grey[700]} 20px
    )`
  }
}));

const MovieLoader = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <ProjectorLight>
          <FilmReel sx={{ top: -60, left: -30 }} />
          <FilmReel sx={{ top: -60, right: -30 }} />
          <LightBeam />
        </ProjectorLight>
        <Box sx={{ position: 'relative', width: '100%', height: 40, overflow: 'hidden' }}>
          <FilmStrip />
        </Box>
      </Box>
    </Box>
  );
};

export default MovieLoader;