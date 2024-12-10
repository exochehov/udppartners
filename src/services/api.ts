import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Games
export const getGames = async () => {
  const response = await api.get('/games');
  return response.data;
};

export const getGame = async (id: string) => {
  const response = await api.get(`/games/${id}`);
  return response.data;
};

export const getGamesByCategory = async (categoryId: string) => {
  const response = await api.get(`/games/category/${categoryId}`);
  return response.data;
};

export const getGameStatus = async (id: string) => {
  const response = await api.get(`/games/${id}/status`);
  return response.data;
};

export const updateGameStatus = async (id: string, status: string) => {
  const response = await api.patch(`/games/${id}/status`, { status });
  return response.data;
};

// Categories
export const getCategories = async () => {
  const response = await api.get('/games/categories');
  return response.data;
};

export const getCategory = async (id: string) => {
  const response = await api.get(`/games/categories/${id}`);
  return response.data;
};