import { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CarouselBase = ({
  items,
  visibleCount,
  transitionSpeed,
  onHoverPause,
  showArrows = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(visibleCount);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Ensure items is always an array
  const validItems = Array.isArray(items) ? items : [];

  // Clone items for infinite scrolling
  const clonedItems = [
    ...validItems.slice(-visibleCount),
    ...validItems,
    ...validItems.slice(0, visibleCount),
  ];

  useEffect(() => {
    if (onHoverPause && !isPaused) {
      const interval = setInterval(() => {
        moveNext();
      }, transitionSpeed);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  const moveNext = () => {
    setCurrentIndex((prev) => {
      // Ensure currentIndex wraps around properly for infinite scrolling
      return prev + 1 >= clonedItems.length ? visibleCount : prev + 1;
    });
  };

  const movePrev = () => {
    setCurrentIndex((prev) => {
      // Ensure currentIndex wraps around properly when going backwards
      return prev <= visibleCount ? clonedItems.length - visibleCount : prev - 1;
    });
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setCurrentIndex(validItems.length);
    } else if (currentIndex === clonedItems.length - visibleCount) {
      setCurrentIndex(visibleCount);
    }
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%', // Make sure it fills the entire placeholder
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={onHoverPause ? handleMouseEnter : null}
      onMouseLeave={onHoverPause ? handleMouseLeave : null}
    >
      {showArrows && (
        <IconButton
          sx={{
            position: 'absolute',
            left: 0,
            zIndex: 2,
            top: '50%', // Position vertically centered
            transform: 'translateY(-50%)', // Adjust positioning of arrows
          }}
          onClick={movePrev}
        >
          <ArrowBack />
        </IconButton>
      )}

      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
          transition: 'transform 0.5s ease',
          width: `${(clonedItems.length * 100) / visibleCount}%`,
          height: '100%', // Ensure the slider container fills the parent container
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {clonedItems.map((item, index) => (
          <Box key={index} sx={{ flex: `0 0 ${100 / visibleCount}%`, height: '100%' }}>
            {item}
          </Box>
        ))}
      </Box>

      {showArrows && (
        <IconButton
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 2,
            top: '50%',
            transform: 'translateY(-50%)', // Adjust positioning of arrows
          }}
          onClick={moveNext}
        >
          <ArrowForward />
        </IconButton>
      )}
    </Box>
  );
};

export default CarouselBase;
