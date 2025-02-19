import { Box, Typography, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetchData from '@src/hooks/useFetchData';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaSlider = ({ title, fetchUrl, viewAllUrl, detailBaseUrl, color }) => {
  const { data: media, loading, error } = useFetchData(fetchUrl);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  if (loading) return <SkeletonLoader type="media" count={10} />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <Box sx={{ width: '100%', margin: '0.5rem' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: color,
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          {title}
        </Typography>
        <Link to={viewAllUrl} style={{ textDecoration: 'none', color: 'inherit'}}>
          <Button sx={{fontWeight: 'bold', fontSize: '1rem' }}>View All</Button>
        </Link>
      </Box>

      {/* Media Slider */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          ref={sliderRef}
          sx={{
            display: 'flex',
            width: `${media.length * 150}%`,
            animation: `scroll 80s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {media.map((item) => (
            <Box key={item.id} sx={{ flex: '0 0 auto', width: `${100 / media.length}%` }}>
              <Link to={`${detailBaseUrl}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <MediaCard mediaData={item} />
              </Link>
            </Box>
            
          ))}
        </Box>

        <style jsx="true">
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default MediaSlider;