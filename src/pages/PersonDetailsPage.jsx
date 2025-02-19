import { useParams } from 'react-router-dom';
import useFetchData from '@src/hooks/useFetchData';
import PersonBackground from '@src/components/PersonDetails/PersonBackground';
import PersonProfile from '@src/components/PersonDetails/PersonProfile';
import Filmography from '@src/components/PersonDetails/Filmography';
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';
import { Box } from '@mui/material';

const PersonDetailsPage = () => {
  const { personId } = useParams();
  const { data, loading, error } = useFetchData(`/media/person/bio/${personId}`);

  if (loading) return <SkeletonLoader count={1} aspectRatio={16 / 9} />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box
      sx={{
        margin: { xs: '1rem', sm: '2rem', md: '3rem' },
      }}
    >
      <PersonBackground profilePath={data.profile_path} />
      <PersonProfile personData={data} />
      <Filmography personData={data} />
    </Box>
  );
};

export default PersonDetailsPage;
