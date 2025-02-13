class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, stateRef) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.stateRef = stateRef; // Store conversation state
    }
  
    handleMediaTypeSelection(mediaType) {
      const message = this.createChatBotMessage(
        `You selected ${mediaType}. Now, which genres do you like?`
      );
      this.updateChatbotState({ mediaType, message });
    }
  
    handleGenreSelection(genre) {
      const message = this.createChatBotMessage(
        `Great! Looking for ${genre} movies. Fetching recommendations...`
      );
      this.updateChatbotState({ genre, message });
      this.fetchRecommendations();
    }
  
    async fetchRecommendations() {
        const { mediaType, genre } = this.stateRef.current;
      
        if (!mediaType || !genre) {
          const errorMessage = this.createChatBotMessage("Please select a media type and genre first.");
          this.updateChatbotState({ message: errorMessage });
          return;
        }
      
        const message = this.createChatBotMessage("Fetching recommendations...");
        this.updateChatbotState({ message });
      
        try {
          const response = await api.get(`/recommender/recommendations`, {
            params: { mediaType, genre }, // Send selected media type & genre
          });
      
          if (!response.data || response.data.length === 0) {
            throw new Error("No recommendations found.");
          }
      
          const recommendations = response.data.map((movie) => movie.title).join(", ");
          const newMessage = this.createChatBotMessage(`Here are some movies: ${recommendations}`);
          this.updateChatbotState({ message: newMessage });
        } catch (error) {
          console.error("Recommendation API error:", error);
          const errorMessage = this.createChatBotMessage(
            "Sorry, I couldn't fetch recommendations. Please try again later."
          );
          this.updateChatbotState({ message: errorMessage });
        }
      }
      
  
    updateChatbotState(update) {
      this.setState((prev) => ({
        ...prev,
        ...update, // Update state with new values
        messages: [...prev.messages, update.message],
      }));
    }
  }
  
  export default ActionProvider;
  