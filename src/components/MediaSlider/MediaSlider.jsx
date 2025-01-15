import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Slider from "@src/components/MediaSlider/Slider";
import useMediaSlider from "@src/hooks/useMediaSlider";
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';
import { useNavigate } from 'react-router-dom';

const MediaSlider = ({ title, fetchUrl, viewAllUrl, detailBaseUrl, color }) => {
  const { data: media, loading, error } = useMediaSlider(fetchUrl);
  const navigate = useNavigate();

  if (loading) return <SkeletonLoader type="media" count={10}/>;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box sx={{ width: "100%", margin: "0.5rem" }}>
      {/* Section Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          {title}
        </Typography>
        <Button onClick={() => navigate(viewAllUrl)}
        >
        <Typography variant="h4">
          View All
        </Typography>
        </Button>
      </Box>

      {/* Slider */}
      <Slider items={media} detailBaseUrl={detailBaseUrl} />
    </Box>
  );
};

export default MediaSlider;
