import axios from 'axios';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;


export const searchGames = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=10`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search games');
    }
    
    const data = await response.json();
    console.log('API_KEY:', API_KEY);
    return data.results;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

export const getGameDetails = async (gameId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/games/${gameId}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get game details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting game details:', error);
    throw error;
  }
};

export const getPopularGames = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=12`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get popular games');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error getting popular games:', error);
    throw error;
  }
};

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
      params: {
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
};