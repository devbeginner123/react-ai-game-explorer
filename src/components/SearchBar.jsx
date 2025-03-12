import React, { useState } from 'react';
import useGameStore from '../store/gameStore';
import { searchGames } from '../services/rawgService';

// Tambahkan parameter props (atau destructuring untuk onSearchComplete)
const SearchBar = ({ onSearchComplete }) => {
  const [query, setQuery] = useState('');
  const { setSearchResults, setLoading, setError } = useGameStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const results = await searchGames(query);
      setSearchResults(results);
      
      // Panggil onSearchComplete jika ada
      if (onSearchComplete) {
        onSearchComplete();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari game..."
          className="flex-grow p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Cari
        </button>
      </form>
    </div>
  );
};

export default SearchBar;