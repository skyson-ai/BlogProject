import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001', // URL de ton API FastAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter le token aux requêtes si disponible
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;