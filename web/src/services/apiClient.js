import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

// Attach interceptors to centralize headers/auth when login implemented.
apiClient.interceptors.request.use((config) => {
  // TODO: Attach auth token when auth module is built.
  return config;
});

export default apiClient;
