import { Box, Typography } from "@mui/material";

const PersonProfile = ({ personData }) => {
  const { name, known_for, profile_path, biography } = personData;
  const profileImageUrl = `https://image.tmdb.org/t/p/w500${profile_path}`;
  const knownFor = known_for === "Directing" ? "Director" : "Actor";

  return (
    <Box sx={{ display: "flex", padding: "20px", color: "#fff" }}>
      {/* Profile Photo */}
      <img
        src={profileImageUrl}
        alt={name}
        style={{
          width: "300px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
        }}
      />

      {/* Biography */}
      <Box sx={{ marginLeft: "20px", flex: 1 }}>
        {/* Person Name */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>

        {/* Known For */}
        <Typography variant="h5" component="h1" sx={{ color: "#bbb" }}>
          {knownFor}
        </Typography>

        {/* Bio */}
        <Typography variant="h6" sx={{ margin: "10px 0", fontWeight: "bold" }}>
          Biography
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          {biography}
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonProfile;
