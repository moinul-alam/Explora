import { Box, Typography, Avatar, Paper } from "@mui/material";

const ProfileHeader = ({ avatar, username, firstName, lastName, email }) => (
  <Paper
    sx={{
      padding: 4,
      marginBottom: 4,
      borderRadius: 2,
      background: "linear-gradient(135deg, #4c6ef5, #6c8cf5)",
      color: "white",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          marginRight: 3,
          border: "2px solid white",
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          "N/A"
        )}
      </Avatar>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {username || "Guest"}
        </Typography>
        <Typography variant="body1">
          {firstName || "Not provided"} {lastName || ""}
        </Typography>
        <Typography variant="body1">{email || "No Email"}</Typography>
      </Box>
    </Box>
  </Paper>
);

export default ProfileHeader;
