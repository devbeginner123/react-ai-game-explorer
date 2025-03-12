import { create } from 'zustand';

const useGameStore = create((set) => ({
  games: [],
  searchResults: [],
  recommendations: [],
  isLoading: false,
  error: null,

  // Fungsi untuk set games dari RAWG API
  setGames: (games) => set({ games }),

  // Fungsi untuk set hasil pencarian
  setSearchResults: (results) => set({ searchResults: results }),

  // Fungsi untuk set rekomendasi dari ChatGPT
  setRecommendations: (recommendations) => set({ recommendations }),

  // Fungsi untuk mengatur loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Fungsi untuk mengatur error
  setError: (error) => set({ error }),

  // Fungsi untuk reset hasil pencarian
  resetSearchResults: () => set({ searchResults: [] }),

  // Fungsi untuk reset rekomendasi
  resetRecommendations: () => set({ recommendations: [] }),
}));

export default useGameStore;