import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import PersonBackground from "@src/components/PersonDetails/PersonBackground";
import PersonProfile from "@src/components/PersonDetails/PersonProfile";
import Filmography from "@src/components/PersonDetails/Filmography";

const PersonDetailsPage = () => {
  const { personID } = useParams();
  const { data, loading, error } = useFetchData(`/api/media/person/bio/${personID}`);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading person details!</Typography>;

  return (
    <>
      <PersonBackground profilePath={data.profile_path} />
      <PersonProfile personData={data} />
      <Filmography personData={data} />
    </>
  )
};

export default PersonDetailsPage;
