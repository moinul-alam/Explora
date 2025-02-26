import { Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GenreBadge = ({ genres, mediaType }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          sx={{
            backgroundColor: "#444",
            color: "#fff",
            fontSize: { xs: "0.5rem", md: "0.8rem" },
            "&:hover": {
              backgroundColor: "#555",
              cursor: "pointer",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default GenreBadge;
