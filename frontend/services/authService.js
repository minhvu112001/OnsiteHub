// services/authService.js
import apiClient from './apiClient';

export const login = (email, password) => {
  return apiClient.post('/auth/login', { email, password });
};

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const logout = () => {
  localStorage.removeItem('token');
  return Promise.resolve();
};
