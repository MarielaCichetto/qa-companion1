import apiClient from './apiClient';

export const authService = {
  async register(payload) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },
  async login(payload) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  },
  async loginWithGoogle(payload) {
    const response = await apiClient.post('/auth/google', payload);
    return response.data;
  },
  async updateLanguage(userId, language) {
    const response = await apiClient.patch(`/auth/${userId}/language`, { language });
    return response.data;
  }
};
