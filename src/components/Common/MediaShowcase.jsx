import { useRef, useEffect, useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaShowcase = ({
  data = [],
  onCardClick,
  itemsPerView = {
    xs: 1,    // mobile
    sm: 2,    // tablet
    md: 3,    // small desktop
    lg: 4,    // large desktop
  },
  spacing = 2,             // spacing between items
}) => {
  const scrollContainerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  // Function to calculate item width based on screen size
  const calculateItemWidth = () => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    
    const viewportWidth = window.innerWidth;
    let itemsToShow;
    
    if (viewportWidth < 600) itemsToShow = itemsPerView.xs;
    else if (viewportWidth < 960) itemsToShow = itemsPerView.sm;
    else if (viewportWidth < 1280) itemsToShow = itemsPerView.md;
    else itemsToShow = itemsPerView.lg;

    const totalSpacing = (itemsToShow - 1) * (spacing * 8);
    const availableWidth = container.clientWidth - totalSpacing;
    return Math.floor(availableWidth / itemsToShow);
  };

  // Recalculate item width when data changes or window is resized
  useEffect(() => {
    const updateItemWidth = () => {
      setItemWidth(calculateItemWidth());
    };

    // Initial calculation
    updateItemWidth();

    // Recalculate on window resize
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [data]); // Add `data` as a dependency

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isStartDisabled = () => {
    return scrollContainerRef.current?.scrollLeft === 0;
  };

  const isEndDisabled = () => {
    const container = scrollContainerRef.current;
    if (!container) return true;
    return Math.abs(container.scrollWidth - container.clientWidth - container.scrollLeft) < 1;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        scroll('left');
      } else if (e.key === 'ArrowRight') {
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Main container */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing }}>
        {/* Left scroll button */}
        <IconButton 
          onClick={() => scroll('left')} 
          disabled={isStartDisabled()}
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            padding: 1
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Scrollable content */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: spacing,
            padding: '16px 8px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            flex: 1
          }}
        >
          {data.map((media) => (
            <Box
              key={media.id}
              sx={{
                flexShrink: 0,
                scrollSnapAlign: 'start',
                width: `${itemWidth}px`, // Use the calculated item width
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <MediaCard
                mediaData={media}
                onClick={() => onCardClick(media)}
              />
            </Box>
          ))}
        </Box>

        {/* Right scroll button */}
        <IconButton
          onClick={() => scroll('right')}
          disabled={isEndDisabled()}
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            padding: 1
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Mobile scroll buttons */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          gap: 1,
          mt: 1
        }}
      >
        <IconButton
          onClick={() => scroll('left')}
          disabled={isStartDisabled()}
          size="small"
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => scroll('right')}
          disabled={isEndDisabled()}
          size="small"
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MediaShowcase;