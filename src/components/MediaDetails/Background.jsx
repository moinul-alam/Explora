import { Box } from "@mui/material";

const Background = ({ backdropPath }) => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: -1,
      backgroundImage: `url(${backdropPath})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden",
      "&::after": { 
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      },
    }}
  />
);

export default Background;