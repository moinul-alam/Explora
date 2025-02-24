import { Paper, Typography, Box } from "@mui/material";
import MediaShowcase from "@src/components/Common/MediaShowcase";

const UserWatchlist = ({ watchlist = [] }) => {
  return (
    <Paper sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Watchlist
      </Typography>
      <Box>
        <MediaShowcase
          data={watchlist}
          detailsLink={(item) => `/details/movie/${item.tmdb_id}`}
        />
      </Box>
    </Paper>
  );
};

export default UserWatchlist;
