import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Slider from "@src/components/MediaSlider/Slider";
import useFetchData from "@src/hooks/useFetchData";
import useMediaSlider from "@src/hooks/useMediaSlider";

const MediaSlider = ({ title, fetchUrl, viewAllUrl, detailBaseUrl, color }) => {
  const {data: media, loading, error } = useMediaSlider(fetchUrl);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading profile!</Typography>;

  return (
    <Box sx={{ width: "100%", marginBottom: "40px" }}>
      {/* Section Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Button variant="text" onClick={() => (window.location.href = viewAllUrl)}>
          View All
        </Button>
      </Box>

      {/* Slider */}
      <Slider items={media} detailBaseUrl={detailBaseUrl} />
    </Box>
  );
};

export default MediaSlider;
