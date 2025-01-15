import { useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import MediaCard from '@src/components/Common/MediaCard/MediaCard';

const MediaShowcase = ({ data, onCardClick }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={() => scroll('left')} disabled={scrollContainerRef.current?.scrollLeft === 0}>
        <ArrowBack />
      </IconButton>
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '10px',
          padding: '10px 0',
          flex: 1,
          scrollBehavior: 'smooth',
          overflow: 'hidden',
        }}
      >
        {data?.map((media) => (
          <MediaCard
            key={media.id}
            mediaData={media}
            onClick={() => onCardClick(media)}
          />
        ))}
      </div>
      <IconButton
        onClick={() => scroll('right')}
        disabled={
          scrollContainerRef.current?.scrollWidth ===
          scrollContainerRef.current?.scrollLeft + scrollContainerRef.current?.clientWidth
        }
      >
        <ArrowForward />
      </IconButton>
    </div>
  );
};

export default MediaShowcase;
