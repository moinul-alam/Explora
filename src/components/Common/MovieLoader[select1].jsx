import { Box, keyframes, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Monitor, Server, Cog } from "lucide-react";

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

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const dataTravel = keyframes`
  0%, 5% { transform: translateX(0); opacity: 1; }
  20%, 25% { transform: translateX(200px); opacity: 1; }
  40%, 45% { transform: translateX(400px); opacity: 1; }
  60%, 65% { transform: translateX(200px); opacity: 1; }
  80%, 100% { transform: translateX(0); opacity: 1; }
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

const SystemNode = styled(Box)(({ theme, active }) => ({
  width: 80,
  height: 80,
  borderRadius: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  background: active ? theme.palette.primary.light : theme.palette.grey[800],
  boxShadow: active ? `0 0 20px ${theme.palette.primary.light}` : 'none',
  transition: 'all 0.3s ease',
  animation: active ? `${pulse} 1.5s ease-in-out infinite` : 'none',
  color: theme.palette.common.white,
  position: 'relative',
  padding: 2,
}));

const RotatingCog = styled(Cog)(({theme}) => ({
  animation: `${rotate} 5s linear infinite`,
}));

const BinaryPacket = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  background: theme.palette.secondary.dark,
  borderRadius: 4,
  color: theme.palette.common.white,
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  position: 'absolute',
  top: -30,
  left: 0,
  zIndex: 10,
  boxShadow: `0 0 10px ${theme.palette.secondary.main}`,
  animation: `${dataTravel} 8s linear infinite`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const MovieLoader = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        flexDirection: 'column',
        p: 3,
      }}
    >
      {/* System flow visualization */}
      <Box 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 6,
          position: 'relative',
          maxWidth: 500,
        }}
      >
        <SystemNode active={true}>
          <Monitor size={32} />
          <Typography variant="caption" sx={{ mt: 1 }}>Frontend</Typography>
        </SystemNode>
        
        <SystemNode active={true}>
          <Server size={32} />
          <Typography variant="caption" sx={{ mt: 1 }}>Backend</Typography>
        </SystemNode>
        
        <SystemNode active={true}>
          <Box sx={{ position: 'relative', display: 'flex' }}>
            <RotatingCog size={24} />
            <RotatingCog size={16} sx={{ position: 'absolute', right: -10, top: -10 }} />
          </Box>
          <Typography variant="caption" sx={{ mt: 1 }}>Recommender</Typography>
        </SystemNode>
        
        {/* Binary data packet moving between systems */}
        <BinaryPacket sx={{ width: 60 }}>
          1010
        </BinaryPacket>
      </Box>
      
      {/* Film reel in bottom middle */}
      <Box sx={{ position: 'relative', width: '100%', height: 100, display: 'flex', justifyContent: 'center', mt: 4 }}>
        <ProjectorLight sx={{ position: 'relative' }}>
          <FilmReel sx={{ top: -60, left: -30 }} />
          <FilmReel sx={{ top: -60, right: -30 }} />
        </ProjectorLight>
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', maxWidth: 400, height: 40, overflow: 'hidden' }}>
          <FilmStrip />
        </Box>
      </Box>
      
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 4, 
          color: 'primary.main',
          animation: `${flicker} 1.5s ease-in-out infinite`,
          fontWeight: 'medium'
        }}
      >
        Fetching personalized recommendations...
      </Typography>
    </Box>
  );
};

export default MovieLoader;