import { Paper, Typography, List, ListItem } from "@mui/material";

const UserWatchlist = ({ watchlist }) => (
  <Paper sx={{ padding: 4, marginBottom: 4 }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      Watchlist
    </Typography>
    {watchlist.length > 0 ? (
      <List>
        {watchlist.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    ) : (
      <Typography>No items in watchlist.</Typography>
    )}
  </Paper>
);

export default UserWatchlist;
