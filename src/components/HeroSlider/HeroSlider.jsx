import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import SkeletonLoader from "@src/components/Common/SkeletonLoader";
import ErrorDisplay from "@src/components/Common/ErrorDisplay";
import HeroText from "@src/components/HeroSlider/HeroText";
import MediaShowcase from "@src/components/Common/MediaShowcase";
import getRecommendationsFromInteraction from "@src/utils/getRecommendationsFromInteraction";

const HeroSlider = () => {
  const { data: mediaData, loading, error } = useFetchData("/media/category/movie/trending");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effect, setEffect] = useState("zoomIn");
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  const autoEffectInterval = 5000;
  const transitionDuration = 1000;

  const effects = ["zoomIn", "fade", "scale", "rotate"];

  // Fetch recommendations on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      const recommendedMedia = await getRecommendationsFromInteraction();
      setRecommendations(recommendedMedia);
      setLoadingRecommendations(false);
    };

    fetchRecommendations();
  }, []);

  // Handle hero slider auto-rotation
  useEffect(() => {
    if (mediaData?.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaData.length);
        setEffect(effects[Math.floor(Math.random() * effects.length)]);
      }, autoEffectInterval);

      return () => clearInterval(interval);
    }
  }, [mediaData]);

  if (loading) return <SkeletonLoader type="hero" />;
  if (error) return <ErrorDisplay message={error.message} />;

  // Create a function to generate detail links for MediaShowcase
  const getDetailsLink = (media) => {
    const mediaType = media.title ? "movie" : "tv";
    return `/${mediaType}/${media.id}`;
  };

  // Determine if we should show recommendations
  const hasRecommendations = recommendations.length > 0;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "45vh", sm: "50vh", md: "500px" },
          overflow: "hidden",
        }}
      >
        {/* Display Current Slide */}
        {mediaData.map((movie, index) => (
          <Box
            key={movie.id}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "/fallback.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentIndex === index ? 1 : 0,
              transform:
                currentIndex === index
                  ? effect === "zoomIn"
                    ? "scale(1.1)"
                    : effect === "scale"
                    ? "scale(1.05)"
                    : effect === "rotate"
                    ? "rotate(3deg) scale(1.1)"
                    : "none"
                  : "scale(1)",
              transition: `opacity ${transitionDuration}ms ease-in-out, transform ${transitionDuration}ms ease-in-out`,
            }}
          />
        ))}

        {/* Hero Text is positioned at the top if recommendations exist, otherwise centered */}
        <Box
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: hasRecommendations ? "flex-start" : "center",
            paddingTop: hasRecommendations ? { xs: "2rem", md: "3rem" } : 0,
          }}
        >
          <HeroText />
        </Box>
      </Box>

      {/* Recommendations section OUTSIDE the hero container */}
      {hasRecommendations && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            marginTop: { xs: "-2rem", md: "-3rem" },
            padding: "0 1rem",
            position: "relative",
            zIndex: 10, // Ensure it's above other elements
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: "1rem",
              color: "primary.main",
              fontWeight: "bold",
              paddingLeft: "0.5rem"
            }}
          >
            Recommended For You
          </Typography>
          
          <MediaShowcase
            data={recommendations}
            detailsLink={getDetailsLink}
            customItemsPerView={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
            }}
            spacing={1}
          />
        </Box>
      )}
    </Box>
  );
};

export default HeroSlider;