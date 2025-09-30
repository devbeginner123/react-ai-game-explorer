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
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-[0_8px_30px_rgb(2,6,23,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_-15px_rgba(59,130,246,0.45)]">
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
        <h3 className="text-lg font-semibold text-white mb-1 tracking-tight">{game.name}</h3>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default GameCard;