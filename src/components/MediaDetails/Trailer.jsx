import { Box, Typography } from "@mui/material";

const Trailer = ({ trailerId }) => (
  <Box
    sx={{
      padding: { xs: "10px", md: "20px" },
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontSize: { xs: "1rem", md: "1.25rem" },
        marginBottom: { xs: "10px", md: "20px" },
        fontWeight: "bold",
      }}
    >
      Trailer
    </Typography>
    <Box
      sx={{
        position: "relative",
        paddingBottom: "56.25%", // 16:9 aspect ratio
        height: 0,
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${trailerId}`}
        frameBorder="0"
        allowFullScreen
        title="Trailer"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  </Box>
);

export default Trailer;
