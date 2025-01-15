import { CircularProgress, Container, Typography } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import PersonalInformation from "@src/components/profile/PersonalInformation";
import UserPreferences from "@src/components/profile/UserPreferences";
import UserWatchlist from "@src/components/profile/UserWatchlist";
import UserReviews from "@src/components/profile/UserReviews";

const Profile = () => {
  const { data, loading, error } = useFetchData("/api/user/profile/view");

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading profile!</Typography>;

  const { info, preferences, reviews, createdAt } = data.user;

  return (
    <Container sx={{ marginTop: 4 }}>
      <PersonalInformation info={info} createdAt={createdAt} />
      <UserPreferences preferences={preferences} />
      <UserWatchlist watchlist={preferences.watchlist} />
      <UserReviews reviews={reviews} />
    </Container>
  );
};

export default Profile;
