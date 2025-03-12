import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import RecommendationForm from './components/RecommendationForm';
import FavoriteGames from './components/FavoriteGames';
import AuthModal from './components/AuthModal';
import MostFavoriteGames from './components/MostFavoritesGames';
import { useAuth } from './hooks/useAuth';
import useGameStore from './store/gameStore';
import { getPopularGames } from './services/rawgService';
import { Gamepad, Heart, LogOut, LogIn } from 'lucide-react';

function App() {
  const { 
    games, 
    searchResults, 
    setGames, 
    setLoading, 
    setError 
  } = useGameStore();

  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        setLoading(true);
        const popularGames = await getPopularGames();
        setGames(popularGames);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularGames();
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'popular':
        return <GameList title="Game Populer" games={games} />;
      case 'search':
        return searchResults.length > 0 
          ? <GameList title="Hasil Pencarian" games={searchResults} />
          : <GameList title="Game Populer" games={games} />;
      case 'favorite':
        return <FavoriteGames />;
      default:
        return <GameList title="Game Populer" games={games} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-black text-white">
      <Header>
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 w-full">
          {user ? (
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-white">{user.displayName || user.email}</span>
              </div>
              <button 
                onClick={() => setActiveTab('favorite')}
                className={`flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'favorite' 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <Heart size={20} />
                <span>Favorit</span>
              </button>
              <button 
                onClick={logout}
                className="flex items-center space-x-2 text-red-500 hover:text-red-400"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <LogIn size={20} />
              <span>Login</span>
            </button>
          )}
        </div>
      </Header>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
      
      {/* Section Rekomendasi Game dengan Background Image dan CTA */}
      <section 
        className="relative py-16 border-t border-b border-blue-700"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Temukan Game Sempurna untuk Kamu</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Ceritakan preferensi game kamu dan biarkan AI kami merekomendasikan game yang sesuai dengan seleramu. 
            Semakin detail deskripsimu, semakin akurat rekomendasinya!
          </p>
          <div className="max-w-2xl mx-auto bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-lg">
            <RecommendationForm onSearchComplete={() => setActiveTab('search')} />
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex mb-6 space-x-4">
          <button 
            onClick={() => setActiveTab('popular')}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              activeTab === 'popular' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Gamepad size={20} />
            <span>Game Populer</span>
          </button>
        </div>
        
        <MostFavoriteGames />
        <SearchBar onSearchComplete={() => setActiveTab('search')} />
        
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Game Recommendation AI &copy; {new Date().getFullYear()}</p>
          <p className="text-sm mt-2">Data disediakan oleh RAWG API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;