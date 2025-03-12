import React, { useState, useEffect } from 'react';
import { fetchGameDetails } from '../services/rawgService';
import { useFavoriteGames } from '../hooks/useFavoriteGames';
import { useAuth } from '../hooks/useAuth';

const MostFavoriteGames = () => {
  const { user } = useAuth();
  const { mostFavoriteGames } = useFavoriteGames();
  const [popularGamesDetails, setPopularGamesDetails] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set current date in format like "Apr 25 - May 1, 2025"
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    
    const formatDate = (date) => {
      const options = { month: 'short', day: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    
    const formattedDate = `${formatDate(now)} - ${formatDate(nextWeek)}, ${nextWeek.getFullYear()}`;
    setCurrentDate(formattedDate);
    
    const fetchPopularGamesDetails = async () => {
      if (mostFavoriteGames.length === 0) return;

      try {
        const detailedGames = await Promise.all(
          mostFavoriteGames.slice(0, 10).map(async (game) => {
            const details = await fetchGameDetails(game.id);
            return {
              ...details,
              favoriteCount: game.count
            };
          })
        );

        setPopularGamesDetails(detailedGames);
      } catch (error) {
        console.error('Error fetching popular games details:', error);
      }
    };

    fetchPopularGamesDetails();
  }, [mostFavoriteGames]);

  if (!user || popularGamesDetails.length === 0) return null;

  // Calculate rows based on the number of games (5 per row)
  const firstRowGames = popularGamesDetails.slice(0, 5);
  const secondRowGames = popularGamesDetails.slice(5, 10);
  
  const renderGameItem = (game, index) => {
    const position = index + 1;
    
    return (
      <div key={game.id} className="col-span-1 relative pl-12">
        {/* Position number with outline */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 text-9xl font-bold text-black opacity-70 z-10"
          style={{
            textShadow: 
              "-1px -1px 0 rgba(255,255,255,0.3), " + 
              "1px -1px 0 rgba(255,255,255,0.3), " + 
              "-1px 1px 0 rgba(255,255,255,0.3), " + 
              "1px 1px 0 rgba(255,255,255,0.3), " +
              "0 0 8px rgba(0,0,0,0.5)"
          }}
        >
          {position}
        </div>
        
        {/* Game card - shifted to the right */}
        <div className="relative z-0 bg-black rounded-md overflow-hidden shadow-lg">
          <img 
            src={game.background_image || '/placeholder-game.jpg'} 
            alt={game.name} 
            className="w-full aspect-[3/4] object-cover" 
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-3">
            <h3 className="text-white font-bold text-center uppercase">{game.name}</h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-8 px-4  text-white">
      <div className="mx-auto max-w-6xl">
        {/* Netflix Top 10 Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-gray-700 font-bold text-4xl mr-4">GAME<span className="text-blue-600">GPT</span></div>
          <div className="text-red-900 text-4xl font-bold">TOP {popularGamesDetails.length}</div>
        </div>
        
        {/* Games Grid - First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {firstRowGames.map((game, index) => renderGameItem(game, index))}
        </div>
        
        {/* Games Grid - Second Row (only if there are more than 5 games) */}
        {secondRowGames.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            {secondRowGames.map((game, index) => renderGameItem(game, index + 5))}
          </div>
        )}
        
        {/* Bottom label */}
        <div className="text-center text-2xl font-bold">
          <span className="mr-2">GAMES</span>
          <span className="text-gray-400">{currentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MostFavoriteGames;