import React, { useState } from 'react';
import useGameStore from '../store/gameStore';
import { generateGameRecommendation } from '../services/llamaService';
import { searchGames } from '../services/rawgService';

const RecommendationForm = ({ onSearchComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { setRecommendations, setSearchResults, setLoading, setError } = useGameStore();

  const handleGetRecommendations = async () => {
    if (!prompt.trim()) {
      setError("Please input your game preferences");
      return;
    }

    try {
      setIsProcessing(true);
      setLoading(true);
      setError(null);

      // Generate Recommendations
      const recommendedText = await generateGameRecommendation(prompt);
      console.log("AI Response:", recommendedText);

      const recommendedGames = recommendedText.split(',').map((game) => game.trim());
      setRecommendations(recommendedGames);

      // Cari Game di RAWG API
      const gameDetailsPromises = recommendedGames.map((game) => searchGames(game));
      console.log("Searching for games:", recommendedGames);
      
      const gameDetailsResults = await Promise.all(gameDetailsPromises);
      console.log("Search results:", gameDetailsResults);

      // Filter hasil yang valid (pastikan bahwa item ada dan mengandung data)
      const gameDetails = gameDetailsResults
        .flatMap(result => Array.isArray(result) && result.length > 0 ? [result[0]] : [])
        .filter(Boolean);
      
      console.log("Filtered game details:", gameDetails);
      
      setSearchResults(gameDetails);
      
      // Panggil onSearchComplete untuk mengubah tab ke hasil pencarian
      if (onSearchComplete) {
        onSearchComplete();
      }
    } catch (error) {
      console.error("Error in recommendation:", error);
      setError(error.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">AI Game Recommendations</h2>
      <textarea
        className="w-full bg-gray-900 text-white p-3 rounded-lg"
        placeholder="Describe your game preferences..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <button 
        onClick={handleGetRecommendations} 
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Get Recommendations"}
      </button>
    </div>
  );
};

export default RecommendationForm;