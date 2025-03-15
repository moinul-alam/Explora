import { createContext, useContext, useEffect, useState } from "react";

// Create a context for interaction tracking
const InteractionContext = createContext();

export const InteractionProvider = ({ children }) => {
  const [interactions, setInteractions] = useState([]);

  // Load interactions from local storage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("explora_interactions")) || { ratings: [] };
    // Ensure we have the correct format when loading
    const formattedData = storedData.ratings ? storedData : { ratings: [] };
    setInteractions(formattedData.ratings);
  }, []);

  // Function to add interaction (click event)
  const trackInteraction = (tmdb_id, rating) => {
    const newInteraction = { tmdb_id, rating };

    // Avoid duplicates
    const updatedInteractions = [
      ...interactions.filter((item) => item.tmdb_id !== tmdb_id),
      newInteraction,
    ].slice(-10);

    setInteractions(updatedInteractions);
    localStorage.setItem("explora_interactions", JSON.stringify({ ratings: updatedInteractions }));
  };

  return (
    <InteractionContext.Provider value={{ interactions, trackInteraction }}>
      {children}
    </InteractionContext.Provider>
  );
};

// Custom hook for using the interaction tracker
export const useInteractionTracker = () => useContext(InteractionContext);