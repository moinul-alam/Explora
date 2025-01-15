import { useRef } from "react";
import { Box } from "@mui/material";
import useFetchData from "@src/hooks/useFetchData";
import { Slider, SlideControls, HeroText } from "@src/components/HeroSlider/index";
import SkeletonLoader from '@src/components/Common/SkeletonLoader';
import ErrorDisplay from '@src/components/Common/ErrorDisplay';

const HeroSlider = () => {
  // Move all hooks to the top level
  const { data: movies, loading, error } = useFetchData("/media/category/movie/trending");
  const sliderRef = useRef(null);
  const currentIndexRef = useRef(0);

  // Then handle conditional returns
  if (loading) return <SkeletonLoader type="hero" />;
  if (error) return <ErrorDisplay message={error.message} />;

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
      <HeroText />
    </Box>
  );
};

export default HeroSlider;
