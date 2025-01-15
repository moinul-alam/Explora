import { Avatar, Box, Typography, Paper } from "@mui/material";

const PersonalInformation = ({ info, createdAt }) => (
  <Paper
    sx={{
      padding: 4,
      marginBottom: 4,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      background: "linear-gradient(135deg, #4c6ef5, #6c8cf5)",
      color: "white",
    }}
  >
    <Avatar
      src={info.avatar || ""}
      sx={{
        width: 100,
        height: 100,
        marginRight: 3,
        border: "2px solid white",
      }}
    >
      {!info.avatar && "N/A"}
    </Avatar>
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {info.username || "Guest"}
      </Typography>
      <Typography>{info.firstName} {info.lastName}</Typography>
      <Typography>{info.email}</Typography>
      <Typography>{info.gender || "Gender not specified"}</Typography>
      <Typography>{info.location || "Location not specified"}</Typography>
      <Typography>Active since: {createdAt}</Typography>
    </Box>
  </Paper>
);

export default PersonalInformation;
