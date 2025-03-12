import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useFavoriteGames } from '../hooks/useFavoriteGames';
import AuthModal from './AuthModal';

const GameCard = ({ game }) => {
  const { user } = useAuth();
  const { addFavoriteGame, removeFavoriteGame, isFavorite } = useFavoriteGames();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      if (isFavorite(game.id)) {
        await removeFavoriteGame(game.id);
      } else {
        await addFavoriteGame(game);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Tombol Favorit */}
      {user && (
        <button 
          onClick={handleFavoriteToggle}
          className={`absolute top-2 right-2 z-10 ${
            isFavorite(game.id) 
              ? 'text-red-500' 
              : 'text-white hover:text-red-300'
          }`}
        >
          <Heart 
            fill={isFavorite(game.id) ? 'currentColor' : 'none'}
            strokeWidth={2}
            size={24}
          />
        </button>
      )}

      <img 
        src={game.background_image || '/placeholder-game.jpg'} 
        alt={game.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
        
        {/* Sisa kode sebelumnya tetap sama */}
      </div>

      {/* Modal Autentikasi */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default GameCard;