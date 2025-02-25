import { Box } from "@mui/material";

const GenreBadge = ({ genres }) => {
  return (
    <Box
      className="genre-overlay"
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        textAlign: "center",
        padding: "0.5rem",
        fontSize: "0.75rem",
        borderRadius: "0 0 0.625rem 0.625rem",
        opacity: 0,
        visibility: "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
      }}
    >
      {genres.length > 0 ? genres.join(", ") : ""}
    </Box>
  );
};

export default GenreBadge;
