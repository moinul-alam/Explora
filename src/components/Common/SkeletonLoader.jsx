import PropTypes from 'prop-types';
import { Box, Skeleton, useTheme } from '@mui/material';

const SkeletonLoader = ({
  variant = 'rectangular',
  width = '100%',
  height = '100%',
  borderRadius = 8,
  count = 1,
  spacing = 2,
  type = 'default',
  animation = 'wave',
  showText = true,
  aspectRatio,
  className
}) => {
  const theme = useTheme();

  const baseStyles = {
    borderRadius: `${borderRadius}px`,
    marginBottom: theme.spacing(spacing),
    transition: 'all 0.3s ease',
    animation: animation === 'pulse' ? 'pulse 1.5s ease-in-out infinite' : undefined,
  };

  const responsiveWidth = (defaultWidth) => ({
    width: {
      xs: '100%',
      sm: typeof defaultWidth === 'string' ? defaultWidth : `${defaultWidth}%`,
    },
  });

  const skeletonHeight = aspectRatio
    ? { paddingTop: `${(1 / aspectRatio) * 100}%`, position: 'relative' }
    : { height };

  const MediaSkeleton = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(200px, 1fr))' }, gap: theme.spacing(spacing) }}>
      {[...Array(count)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(1) }}>
          <Box sx={{ position: 'relative', ...skeletonHeight }}>
            <Skeleton variant={variant} animation={animation} sx={{ ...baseStyles, position: aspectRatio ? 'absolute' : 'relative', top: 0, left: 0, right: 0, bottom: 0 }} />
          </Box>
          {showText && (
            <>
              <Skeleton variant="text" width="85%" animation={animation} sx={baseStyles} />
              <Skeleton variant="text" width="65%" animation={animation} sx={baseStyles} />
            </>
          )}
        </Box>
      ))}
    </Box>
  );

  const HeroSkeleton = () => (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: theme.spacing(4), alignItems: 'center' }}>
      <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '50%' }, ...skeletonHeight }}>
        <Skeleton variant={variant} animation={animation} sx={{ ...baseStyles, transform: 'scale(1)' }} />
      </Box>
      {showText && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: theme.spacing(2) }}>
          <Skeleton variant="text" width="80%" height={60} animation={animation} sx={baseStyles} />
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="text" width={`${90 - index * 10}%`} animation={animation} sx={baseStyles} />
          ))}
          <Box sx={{ display: 'flex', gap: theme.spacing(2), mt: theme.spacing(2) }}>
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} variant="rounded" width={120} height={40} animation={animation} sx={baseStyles} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );

  const DefaultSkeleton = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(spacing), ...responsiveWidth(width) }}>
      {[...Array(count)].map((_, index) => (
        <Skeleton key={index} variant={variant} animation={animation} sx={{ ...baseStyles, ...skeletonHeight }} />
      ))}
    </Box>
  );

  const skeletonMap = {
    media: MediaSkeleton,
    hero: HeroSkeleton,
    default: DefaultSkeleton,
  };

  const SelectedSkeleton = skeletonMap[type] || DefaultSkeleton;

  return <Box className={className}>{SelectedSkeleton()}</Box>;
};

SkeletonLoader.propTypes = {
  variant: PropTypes.oneOf(['rectangular', 'text', 'circular', 'rounded']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.number,
  count: PropTypes.number,
  spacing: PropTypes.number,
  type: PropTypes.oneOf(['default', 'media', 'hero']),
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  showText: PropTypes.bool,
  aspectRatio: PropTypes.number,
  className: PropTypes.string,
};

SkeletonLoader.defaultProps = {
  variant: 'rectangular',
  width: '100%',
  height: '100%',
  borderRadius: 8,
  count: 1,
  spacing: 2,
  type: 'default',
  animation: 'wave',
  showText: true,
};

export default SkeletonLoader;
