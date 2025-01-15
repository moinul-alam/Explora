import { forwardRef } from "react";
import { Box } from "@mui/material";

const HeroCard = forwardRef(({ movies }, ref) => (
  <Box
    ref={ref}
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
              : DarkLogo
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          scrollSnapAlign: "start",
        }}
      />
    ))}
  </Box>
));

export default HeroCard;
