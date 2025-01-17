import { Box, Typography, Button } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useMediaSlider from '@src/hooks/useMediaSlider';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaGallery = ({ title, fetchUrl, viewAllUrl, detailBaseUrl, color }) => {
  const { data: media, loading, error } = useMediaSlider(fetchUrl);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  if (loading) return <SkeletonLoader type='media' count={10} />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box sx={{ width: '100%', margin: '0.5rem' }}>
      {/* Section Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h3' fontWeight='bold'>
          {title}
        </Typography>
        <Button onClick={() => navigate(viewAllUrl)}>
          <Typography variant='h4'>View All</Typography>
        </Button>
      </Box>

      {/* Slider */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        }}
      >
        <Box
          ref={sliderRef}
          sx={{
            display: 'flex',
            animation: isHovered ? 'none' : 'scroll 40s linear infinite',
            '&:hover': {
              animationPlayState: 'paused',
            },
            width: `${media.length * 200}%`,
          }}
        >
          {media.map((item) => (
            <Box
              key={item.id}
              sx={{ flex: '0 0 auto', width: `${130 / media.length}%` }}
            >
              <MediaCard
                mediaData={item}
                onClick={() => navigate(`${detailBaseUrl}/${item.id}`)}
              />
            </Box>
          ))}
        </Box>

        <style jsx='true'>
          {`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default MediaGallery;