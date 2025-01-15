import React from "react";
import { Box, Typography, Button } from "@mui/material";

const WelcomeMessage = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      zIndex: 1,
    }}
  >
    <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
      Welcome to EXPLORA
    </Typography>
    <Typography variant="h6" sx={{ mt: 4 }}>
      AI-Powered Recommendation Engine to Discover Movies and TV Shows
    </Typography>
    <Box sx={{ mt: 4 }}>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#ff4081", color: "white", marginRight: 2 }}
        onClick={() => (window.location.href = "/recommendation")}
      >
        Try Now
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: "white", color: "white" }}
        onClick={() => (window.location.href = "/about")}
      >
        Learn More
      </Button>
    </Box>
  </Box>
);

export default WelcomeMessage;
