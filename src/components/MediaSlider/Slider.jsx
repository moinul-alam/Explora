import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const Slider = ({ items, detailBaseUrl, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        onMouseEnter: () => {
          setIsHovered(true);
          onMouseEnter?.();
        },
        onMouseLeave: () => {
          setIsHovered(false);
          onMouseLeave?.();
        },
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
          width: `${items.length * 200}%`,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{ flex: '0 0 auto', width: `${130 / items.length}%` }}
          >
            <MediaCard
              mediaData={item}
              onClick={() => navigate(`${detailBaseUrl}/${item.id}`)}
            />
          </Box>
        ))}
      </Box>

      <style jsx="true">
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
  );
};

export default Slider;
