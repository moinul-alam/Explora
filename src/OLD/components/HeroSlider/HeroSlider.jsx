import { useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import useMediaSlider from "@src/hooks/useMediaSlider";
import { Slider, SlideControls, WelcomeMessage } from "@src/components/HeroSlider/index";

const HeroSlider = () => {
  const { data: movies, loading, error} = useMediaSlider("/api/media/category/movie/trending");
  
  if (error) return <p>Error: {error.message}</p>;

  const sliderRef = useRef(null);
  const currentIndexRef = useRef(0); 

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.offsetWidth;
      slider.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      currentIndexRef.current = index;
    }
  };

  const handlePrevSlide = () => {
    if (!movies.length) return;
    const prevIndex = (currentIndexRef.current - 1 + movies.length) % movies.length;
    scrollToSlide(prevIndex);
  };

  const handleNextSlide = () => {
    if (!movies.length) return;
    const nextIndex = (currentIndexRef.current + 1) % movies.length;
    scrollToSlide(nextIndex);
  };

  if (loading) return <CircularProgress />

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "50vh", sm: "60vh", md: "600px" },
        backgroundColor: "#333",
        overflow: "hidden",
      }}
    >
      <Slider ref={sliderRef} movies={movies} />
      <SlideControls handlePrevSlide={handlePrevSlide} handleNextSlide={handleNextSlide} />
      <WelcomeMessage />
    </Box>
  );
};

export default HeroSlider;
