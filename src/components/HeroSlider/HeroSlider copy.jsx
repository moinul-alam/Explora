import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import SkeletonLoader from "@src/components/Common/SkeletonLoader";
import ErrorDisplay from "@src/components/Common/ErrorDisplay";
import HeroText from "@src/components/HeroSlider/HeroText";

const HeroSlider = () => {
  const { data: movies, loading, error } = useFetchData("/media/category/movie/trending");
  const sliderRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [isSliding, setIsSliding] = useState(false);

  const autoSlide = true; 
  const autoSlideInterval = 5000; 
  const transitionDuration = 500;

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        handleNextSlide();
        setIsSliding(true);
        setTimeout(() => setIsSliding(false), transitionDuration);
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [autoSlide, autoSlideInterval]);

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.offsetWidth;
      slider.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      currentIndexRef.current = index;
    }
  };

  const handlePrevSlide = () => {
    if (!movies?.length) return;
    const prevIndex = (currentIndexRef.current - 1 + movies.length) % movies.length;
    scrollToSlide(prevIndex);
  };

  const handleNextSlide = () => {
    if (!movies?.length) return;
    const nextIndex = (currentIndexRef.current + 1) % movies.length;
    scrollToSlide(nextIndex);
  };

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
      {/* Slider */}
      <Box
        ref={sliderRef}
        sx={{
          display: "flex",
          height: "100%",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          overflow: "hidden",
        }}
      >
        {movies.map((movie) => (
          <Box
            key={movie.id}
            sx={{
              flex: "0 0 100%",
              height: "100%",
              backgroundImage: `url(${
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "/fallback.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              scrollSnapAlign: "start",
            }}
          />
        ))}
      </Box>

      {/* Slide Controls */}
      {/* <IconButton
        onClick={() => {
          handlePrevSlide();
          setIsSliding(true);
          setTimeout(() => setIsSliding(false), transitionDuration);
        }}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          zIndex: 2,
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={() => {
          handleNextSlide();
          setIsSliding(true);
          setTimeout(() => setIsSliding(false), transitionDuration);
        }}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          zIndex: 2,
        }}
      >
        <ArrowForward />
      </IconButton> */}
      <HeroText />
    </Box>
  );
};

export default HeroSlider;