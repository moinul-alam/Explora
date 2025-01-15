import { Box, Typography } from "@mui/material";

const PersonProfile = ({ personData }) => {
  const { name, known_for, profile_path, biography } = personData;
  const profileImageUrl = `https://image.tmdb.org/t/p/w500${profile_path}`;
  const knownFor = known_for === "Directing" ? "Director" : "Actor";

  return (
    <Box sx={{ display: "flex", padding: "1.25rem", color: "#fff" }}>
      {/* Profile Photo */}
      <img
        src={profileImageUrl}
        alt={name}
        style={{
          width: "18.75rem", // 300px = 18.75rem
          borderRadius: "0.5rem", // 8px = 0.5rem
          boxShadow: "0 0.25rem 0.625rem rgba(0, 0, 0, 0.7)", // 0 4px 10px
        }}
      />

      {/* Biography */}
      <Box sx={{ marginLeft: "1.25rem", flex: 1 }}>
        {/* Person Name */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>

        {/* Known For */}
        <Typography variant="h5" component="h1" sx={{ color: "#bbb" }}>
          {knownFor}
        </Typography>

        {/* Bio */}
        <Typography variant="h6" sx={{ margin: "0.625rem 0", fontWeight: "bold" }}>
          Biography
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "1.25rem" }}>
          {biography}
        </Typography>
      </Box>
    </Box>
  );
};

export default PersonProfile;
