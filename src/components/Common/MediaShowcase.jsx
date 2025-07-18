import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, useTheme } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaShowcase = ({
  data = [],
  detailsLink,
  customItemsPerView,
  defaultItemsPerView = {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 5,
  },
  spacing = 2,
}) => {
  const theme = useTheme();
  const scrollContainerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(defaultItemsPerView.xs);
  const [isContainerFocused, setIsContainerFocused] = useState(false);

  const itemsPerView = customItemsPerView || defaultItemsPerView;

  // Memoize the resize handler to prevent unnecessary recreations
  const handleResize = useCallback(() => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 600) setItemsToShow(itemsPerView.xs);
    else if (viewportWidth < 960) setItemsToShow(itemsPerView.sm);
    else if (viewportWidth < 1280) setItemsToShow(itemsPerView.md);
    else setItemsToShow(itemsPerView.lg);
  }, [itemsPerView]);

  // Debounced resize handler
  useEffect(() => {
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  const calculateItemWidth = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
  
    const availableWidth = container.clientWidth;
    const totalSpacing = (itemsToShow - 1) * theme.spacing(spacing);
    return Math.floor((availableWidth - totalSpacing) / itemsToShow);
  }, [itemsToShow, spacing, theme]);

  // Optimize ResizeObserver with debouncing
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setItemWidth(calculateItemWidth()), 150);
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [calculateItemWidth]);

  const scroll = useCallback((direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Memoize scroll button visibility check
  const updateScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => container.removeEventListener('scroll', updateScrollButtons);
  }, [data, updateScrollButtons]);

  // Add focus handling for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isContainerFocused) return;
      
      if (e.key === 'ArrowLeft' && showLeftButton) {
        e.preventDefault();
        scroll('left');
      } else if (e.key === 'ArrowRight' && showRightButton) {
        e.preventDefault();
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLeftButton, showRightButton, scroll, isContainerFocused]);

  // Common styles using MUI's sx prop
  const scrollButtonStyles = {
    backgroundColor: 'primary.main',
    color: 'white',
    '&:hover': { 
      backgroundColor: 'primary.dark' 
    },
    '&.Mui-disabled': {
      backgroundColor: 'action.disabledBackground',
      color: 'action.disabled',
    }
  };

  const mediaItemStyles = {
    flexShrink: 0,
    scrollSnapAlign: 'start',
    width: `${itemWidth}px`,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    boxShadow: theme.shadows[1],
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': { 
      boxShadow: theme.shadows[4] 
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          boxShadow: theme.shadows[1],
        }}
      >
        <IconButton
          onClick={() => scroll('left')}
          disabled={!showLeftButton}
          aria-label="Scroll left"
          sx={{
            display: { xs: 'none', md: 'flex' },
            padding: 1,
            visibility: showLeftButton ? 'visible' : 'hidden',
            ...scrollButtonStyles,
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box
          ref={scrollContainerRef}
          role="region"
          aria-label="Media Showcase"
          tabIndex={0}
          onFocus={() => setIsContainerFocused(true)}
          onBlur={() => setIsContainerFocused(false)}
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
              sx={mediaItemStyles}
            >
              <Box
                component={Link}
                to={detailsLink(media)}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  width: '100%',
                }}
              >
                <MediaCard mediaData={media} />
              </Box>
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={() => scroll('right')}
          disabled={!showRightButton}
          aria-label="Scroll right"
          sx={{
            display: { xs: 'none', md: 'flex' },
            padding: 1,
            visibility: showRightButton ? 'visible' : 'hidden',
            ...scrollButtonStyles,
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

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
          sx={scrollButtonStyles}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => scroll('right')}
          disabled={!showRightButton}
          size="small"
          aria-label="Scroll right"
          sx={scrollButtonStyles}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MediaShowcase;