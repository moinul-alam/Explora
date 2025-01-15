import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const LoveButton = () => {
  const [isLoved, setIsLoved] = useState(false);

  const toggleLove = (e) => {
    e.stopPropagation(); // Prevents triggering the card's onClick
    setIsLoved(!isLoved);
  };

  return (
    <IconButton
      onClick={toggleLove}
      className="love-button"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: isLoved ? 'red' : 'gray',
        opacity: 0, // Initially hidden
        transition: 'opacity 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
      }}
    >
      {isLoved ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default LoveButton;
