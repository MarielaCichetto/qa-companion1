import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

// Attach interceptors to centralize headers/auth when login implemented.
apiClient.interceptors.request.use((config) => {
  try {
    const persistedAuth = localStorage.getItem('qa-companion-auth');
    if (persistedAuth) {
      const { state } = JSON.parse(persistedAuth);
      const token = state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.warn('Unable to read auth token', error);
  }
  try {
    const persistedI18n = localStorage.getItem('qa-companion-i18n');
    if (persistedI18n) {
      const { state } = JSON.parse(persistedI18n);
      if (state?.language) {
        config.headers['Accept-Language'] = state.language;
      }
    }
  } catch (error) {
    console.warn('Unable to attach language header', error);
  }
  return config;
});

export default apiClient;
