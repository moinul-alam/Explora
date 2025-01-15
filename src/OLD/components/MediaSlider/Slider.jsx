import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import MediaCard from "@src/components/Common/MediaCard/MediaCard";

const Slider = ({ items, detailBaseUrl, onMouseEnter, onMouseLeave }) => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        onMouseEnter: () => {
          setIsHovered(true);
          onMouseEnter?.();
        },
        onMouseLeave: () => {
          setIsHovered(false);
          onMouseLeave?.();
        },
      }}
    >
      <Box
        ref={sliderRef}
        sx={{
          display: "flex",
          animation: isHovered ? "none" : "scroll 40s linear infinite",
          "&:hover": {
            animationPlayState: "paused",
          },
          width: `${items.length * 200}%`,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{ flex: "0 0 auto", width: `${100 / items.length}%` }}
          >
            {/* Render MediaCard */}
            <MediaCard
              mediaData={item}
              onClick={() => (window.location.href = `${detailBaseUrl}/${item.id}`)}
            />
          </Box>
        ))}
      </Box>

      <style jsx="true">
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Slider;
