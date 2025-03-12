import React, { useEffect } from 'react';
import GameCard from './GameCard';
import useGameStore from '../store/gameStore';
import { getPopularGames } from '../services/rawgService';

const GameList = ({ title, games }) => {
  const { isLoading, error } = useGameStore();

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
              <div className="w-full h-48 bg-gray-700"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="flex gap-1 mt-2">
                  <div className="h-4 bg-gray-700 rounded w-12"></div>
                  <div className="h-4 bg-gray-700 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="bg-red-800 text-white p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400">No games found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;