import api from "@src/utils/api";

/**
 * @returns {Promise<Array>}
 */
export const getRecommendationsFromInteraction = async () => {
  try {
    const storedData = JSON.parse(localStorage.getItem("explora_interactions")) || { ratings: [] };
    
    const ratings = storedData.ratings && Array.isArray(storedData.ratings) ? storedData.ratings : [];
    
    if (ratings.length === 0) {
      return [];
    }
    
    const response = await api.post("/recommender/hybrid/switching", {
      ratings: ratings
    });
    
    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

export default getRecommendationsFromInteraction;