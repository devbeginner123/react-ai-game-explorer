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
  const [resultSource, setResultSource] = useState('search'); 

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

  // Handler untuk search bar
  const handleSearchComplete = () => {
    setResultSource('search');
    setActiveTab('search');
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handler untuk recommendation
  const handleRecommendationComplete = () => {
    setResultSource('recommendation');
    setActiveTab('search');
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'popular':
        return <GameList title="Game Populer" games={games} />;
      case 'search':
        if (searchResults.length > 0) {
          const title = resultSource === 'recommendation' 
            ? "Hasil Rekomendasi"
            : "Hasil Pencarian";
          return <GameList title={title} games={searchResults} />;
        } else {
          return <GameList title="Game Populer" games={games} />;
        }
      case 'favorite':
        return <FavoriteGames />;
      default:
        return <GameList title="Game Populer" games={games} />;
    }
  };

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(59,130,246,0.25),transparent),radial-gradient(800px_400px_at_90%_-10%,rgba(99,102,241,0.25),transparent),#0b1020]">
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
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -top-16 right-0 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">Temukan Game Sempurna</span>
              <span className="block text-white/90">dengan bantuan AI</span>
            </h2>
            <p className="text-lg md:text-xl mt-4 text-white/70">Ceritakan preferensi kamu, biarkan AI kami rekomendasikan judul terbaik untukmu.</p>
          </div>
          <div className="mt-8 md:mt-10 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-6 shadow-[0_10px_40px_-10px_rgba(30,64,175,0.4)]">
              <RecommendationForm onSearchComplete={handleRecommendationComplete} />
            </div>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex mb-6 gap-3">
          <button 
            onClick={() => setActiveTab('popular')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border ${
              activeTab === 'popular' 
                ? 'border-blue-500/40 bg-blue-600 text-white shadow hover:bg-blue-500' 
                : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            <Gamepad size={20} />
            <span>Game Populer</span>
          </button>
        </div>
        
        <MostFavoriteGames />
        <SearchBar onSearchComplete={handleSearchComplete} />
        
        <div id="results-section" className="mt-8">
          {renderContent()}
        </div>
      </main>
      
      <footer className="bg-white/5 backdrop-blur border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>Game Recommendation AI © {new Date().getFullYear()}</p>
          <p className="text-sm mt-2">Data disediakan oleh RAWG API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;