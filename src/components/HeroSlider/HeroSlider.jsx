import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import SkeletonLoader from "@src/components/Common/SkeletonLoader";
import ErrorDisplay from "@src/components/Common/ErrorDisplay";
import HeroText from "@src/components/HeroSlider/HeroText";

const HeroSlider = () => {
  const { data: movies, loading, error } = useFetchData("/media/category/movie/trending");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effect, setEffect] = useState("zoomIn");

  const autoEffectInterval = 5000;
  const transitionDuration = 1000;

  const effects = ["zoomIn", "fade", "scale", "rotate"];

  useEffect(() => {
    if (movies?.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setEffect(effects[Math.floor(Math.random() * effects.length)]);
      }, autoEffectInterval);

      return () => clearInterval(interval);
    }
  }, [movies]);

  if (loading) return <SkeletonLoader type="hero" />;
  if (error) return <ErrorDisplay message={error.message} />;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "50vh", sm: "60vh", md: "600px" },
        overflow: "hidden",
      }}
    >
      {/* Display Current Slide */}
      {movies.map((movie, index) => (
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
      <HeroText />
    </Box>
  );
};

export default HeroSlider;