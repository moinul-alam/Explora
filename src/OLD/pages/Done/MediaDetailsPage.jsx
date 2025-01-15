import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import Background from "@src/components/MediaDetails/Background";
import MediaInfo from "@src/components/MediaDetails/MediaInfo";
import Credit from "@src/components/MediaDetails/Credit";
import Trailer from "@src/components/MediaDetails/Trailer";
import SimilarMedia from "@src/components/MediaDetails/SimilarMedia";
import RecommendationMedia from "@src/components/MediaDetails/RecommendationMedia";

const MediaDetails = () => {
  const { mediaType, id } = useParams();
  const { data, loading, error } = useFetchData(`api/media/${mediaType}/${id}`);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error loading!</Typography>;

  return (
    <>
      <Background backdropPath={data.backdrop_path} />
      <MediaInfo
        mediaType={mediaType}
        title={data.title || data.original_title}
        overview={data.overview}
        genres={data.genres}
        releaseDate={data.release_date}
        rating={data.vote_average}
        posterPath={data.poster_path}
        tagline={data.tagline}
        homepage={data.homepage}
        runtime={data.runtime}
        numberOfSeasons={data.seasons}
        numberOfEpisodes={data.episodes}
        imdbId={data.imdb_id}
        mediaId={data._id}
      />
      <Credit mediaType={mediaType} credits={data.credits} />
      <Trailer trailerId={data.trailer_id} />
      <SimilarMedia mediaId={data._id} />
      <RecommendationMedia mediaId={data._id} /> 
    </>
  );
};

export default MediaDetails;
