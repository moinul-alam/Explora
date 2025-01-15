import { CircularProgress, Container, Typography } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import PersonalInformation from "@src/components/ProfilePage/PersonalInformation";
import UserPreferences from "@src/components/ProfilePage/UserPreferences";
import UserWatchlist from "@src/components/ProfilePage/UserWatchlist";
import UserReviews from "@src/components/ProfilePage/UserReviews";
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';

const ProfilePage = () => {
  const { data: profileData, loading, error } = useFetchData("/user/profile/view");

  if (loading) return <SkeletonLoader type="media" count={2}/>;
  if (error) return <ErrorDisplay message={error.message} />;

  const { info, preferences, reviews, createdAt } = profileData;

  return (
    <Container sx={{ marginTop: 4 }}>
      <PersonalInformation info={info} createdAt={createdAt} />
      <UserPreferences preferences={preferences} />
      <UserWatchlist watchlist={preferences.watchlist} />
      <UserReviews reviews={reviews} />
    </Container>
  );
};

export default ProfilePage;
