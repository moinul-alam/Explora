import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import MediaShowcase from "@src/components/Common/MediaShowcase";

const UserWatchlist = ({ watchlist = [] }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path); 
  };

  return (
    <Paper sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Watchlist
      </Typography>
      <Box>
        <MediaShowcase
          data={watchlist}
          onCardClick={(item) =>
            handleClick(`/details/${item.media_type}/${item.tmdb_id}`)
          }
        />
      </Box>
    </Paper>
  );
};

export default UserWatchlist;
