import axios from 'axios';
import { Article } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Ajoute le token aux requêtes protégées
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getArticles = async (): Promise<Article[]> => {
  const response = await api.get('/articles/');
  return response.data;
};

export const login = async (username: string, password: string): Promise<string> => {
  const response = await api.post('/auth/token', new URLSearchParams({
    username,
    password,
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return response.data.access_token;
};

export const register = async (username: string, password: string): Promise<void> => {
  await api.post('/auth/register', { username, password });
};