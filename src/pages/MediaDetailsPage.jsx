import { useParams } from 'react-router-dom';
import useFetchData from '@src/hooks/useFetchData';
import Background from '@src/components/MediaDetails/Background';
import MediaInfo from '@src/components/MediaDetails/MediaInfo';
import Credit from '@src/components/MediaDetails/Credit';
import Trailer from '@src/components/MediaDetails/Trailer';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';
import { Box } from '@mui/material';

const MediaDetails = () => {
  const { mediaType, mediaId } = useParams();
  const { data, loading, error } = useFetchData(`/media/${mediaType}/${mediaId}`);

  if (loading) return <SkeletonLoader count={3} aspectRatio={16 / 9} />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 4 },
      }}
    >
      {/* Background Section */}
      <Box>
        <Background backdropPath={data.backdrop_path} />
      </Box>

      {/* Media Info Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, sm: 4 },
        }}
      >
        {/* Poster/Image */}
        <Box
          sx={{
            flex: '0 0 auto',
            width: { xs: '100%', md: '30%' },
            margin: 'auto'
          }}
        >
          <img
            src={data.poster_path}
            alt={data.title || data.original_title}
            style={{
              width: '100%',
              borderRadius: '8px',
            }}
          />
        </Box>

        {/* Media Info */}
        <Box sx={{ flex: 1 }}>
          <MediaInfo
            mediaType={mediaType}
            title={data.title || data.original_title}
            overview={data.overview}
            genres={data.genres}
            releaseDate={data.release_date}
            rating={data.vote_average}
            tagline={data.tagline}
            homepage={data.homepage}
            runtime={data.runtime}
            numberOfSeasons={data.seasons}
            numberOfEpisodes={data.episodes}
            imdbId={data.imdb_id}
            mediaId={data._id}
          />
        </Box>
      </Box>

      {/* Credits Section */}
      <Box>
        <Credit mediaType={mediaType} credits={data.credits} />
      </Box>

      {/* Trailer Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          mb: { xs: 2, sm: 4 },
        }}
      >
        <Trailer trailerId={data.trailer_id} />
      </Box>
    </Box>
  );
};

export default MediaDetails;
