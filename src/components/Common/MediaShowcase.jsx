import { useRef, useEffect, useState, useCallback } from 'react';
import { IconButton, Box } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaShowcase = ({
  data = [],
  onCardClick,
  // New prop for custom items per view configuration
  customItemsPerView,
  // Default values as fallback
  defaultItemsPerView = {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 5,
  },
  spacing = 2
}) => {
  const scrollContainerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(defaultItemsPerView.xs);

  // Use custom configuration if provided, otherwise use defaults
  const itemsPerView = customItemsPerView || defaultItemsPerView;

  // Calculate the number of items to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 600) setItemsToShow(itemsPerView.xs);
      else if (viewportWidth < 960) setItemsToShow(itemsPerView.sm);
      else if (viewportWidth < 1280) setItemsToShow(itemsPerView.md);
      else setItemsToShow(itemsPerView.lg);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // Calculate the width of each item based on the number of items to show
  const calculateItemWidth = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;

    const totalSpacing = (itemsToShow - 1) * (spacing * 8); // Convert spacing to pixels
    const availableWidth = container.clientWidth - totalSpacing;
    return Math.floor(availableWidth / itemsToShow);
  }, [itemsToShow, spacing]);

  // Update item width when the container size changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      setItemWidth(calculateItemWidth());
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [calculateItemWidth]);

  // Handle scrolling
  const scroll = useCallback((direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Update scroll button visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    handleScroll(); // Initial check
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [data]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && showLeftButton) {
        scroll('left');
      } else if (e.key === 'ArrowRight' && showRightButton) {
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLeftButton, showRightButton, scroll]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Main container */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing }}>
        {/* Left scroll button (visible on desktop) */}
        <IconButton
          onClick={() => scroll('left')}
          disabled={!showLeftButton}
          aria-label="Scroll left"
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            padding: 1,
            visibility: showLeftButton ? 'visible' : 'hidden',
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Scrollable content */}
        <Box
          ref={scrollContainerRef}
          role="region"
          aria-label="Media Showcase"
          tabIndex={0}
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
            flex: 1,
          }}
        >
          {data.map((media) => (
            <Box
              key={media.id}
              role="group"
              aria-label={`Media item: ${media.title}`}
              sx={{
                flexShrink: 0,
                scrollSnapAlign: 'start',
                width: `${itemWidth}px`,
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

        {/* Right scroll button (visible on desktop) */}
        <IconButton
          onClick={() => scroll('right')}
          disabled={!showRightButton}
          aria-label="Scroll right"
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            padding: 1,
            visibility: showRightButton ? 'visible' : 'hidden',
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Mobile scroll buttons (visible on mobile) */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          gap: 1,
          mt: 1,
        }}
      >
        <IconButton
          onClick={() => scroll('left')}
          disabled={!showLeftButton}
          size="small"
          aria-label="Scroll left"
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => scroll('right')}
          disabled={!showRightButton}
          size="small"
          aria-label="Scroll right"
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MediaShowcase;