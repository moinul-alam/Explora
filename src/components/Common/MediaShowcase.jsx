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

  const itemsPerView = customItemsPerView || defaultItemsPerView;

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 600) setItemsToShow(itemsPerView.xs);
      else if (viewportWidth < 960) setItemsToShow(itemsPerView.sm);
      else if (viewportWidth < 1280) setItemsToShow(itemsPerView.md);
      else setItemsToShow(itemsPerView.lg);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  const calculateItemWidth = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
  
    const availableWidth = container.clientWidth;
    const totalSpacing = (itemsToShow - 1) * theme.spacing(spacing);
  
    return Math.floor((availableWidth - totalSpacing) / itemsToShow);
  }, [itemsToShow, spacing, theme]);
  

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      setItemWidth(calculateItemWidth());
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [calculateItemWidth]);

  const scroll = useCallback((direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [data]);

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
    <Box>
      {/* Showcase Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          boxShadow: theme.shadows[1],
        }}
      >
        {/* Left scroll button */}
        <IconButton
          onClick={() => scroll('left')}
          disabled={!showLeftButton}
          aria-label="Scroll left"
          sx={{
            display: { xs: 'none', md: 'flex' },
            padding: 1,
            visibility: showLeftButton ? 'visible' : 'hidden',
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' },
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
                borderRadius: '4px',
                boxShadow: theme.shadows[1],
                '&:hover': { boxShadow: theme.shadows[4] },
              }}
            >
              <Link to={detailsLink(media)} style={{ textDecoration: 'none', color: 'inherit'}}>
                <MediaCard mediaData={media} />
              </Link>
            </Box>
          ))}
        </Box>

        {/* Right scroll button */}
        <IconButton
          onClick={() => scroll('right')}
          disabled={!showRightButton}
          aria-label="Scroll right"
          sx={{
            display: { xs: 'none', md: 'flex' },
            padding: 1,
            visibility: showRightButton ? 'visible' : 'hidden',
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' },
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
          mt: 1,
        }}
      >
        <IconButton
          onClick={() => scroll('left')}
          disabled={!showLeftButton}
          size="small"
          aria-label="Scroll left"
          sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => scroll('right')}
          disabled={!showRightButton}
          size="small"
          aria-label="Scroll right"
          sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MediaShowcase;
