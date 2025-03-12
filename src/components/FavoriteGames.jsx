import React from 'react';
import GameCard from './GameCard';
import { useFavoriteGames } from '../hooks/useFavoriteGames';
import { useAuth } from '../hooks/useAuth';

const FavoriteGames = () => {
  const { favoriteGames, loading } = useFavoriteGames();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center text-gray-400 py-8">
        Login untuk melihat game favorit Anda
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">
        Memuat game favorit...
      </div>
    );
  }

  if (favoriteGames.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Anda belum memiliki game favorit
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Game Favorit Saya</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteGames;