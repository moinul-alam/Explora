import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const SlideControls = ({ 
  handlePrevSlide, 
  handleNextSlide, 
  autoSlide = true, 
  autoSlideInterval = 5000, 
  transitionDuration = 500 
}) => {
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        handleNextSlide();
        setIsSliding(true);
        setTimeout(() => setIsSliding(false), transitionDuration);
      }, autoSlideInterval);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [autoSlide, autoSlideInterval, handleNextSlide, transitionDuration]);

  return (
    <>
      <IconButton
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
      </IconButton>
    </>
  );
};

export default SlideControls;
