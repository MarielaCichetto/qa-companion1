import apiClient from './apiClient';

export const fetchBugs = async () => {
  const { data } = await apiClient.get('/bugs');
  return data;
};

export const createBug = async (payload) => {
  const { data } = await apiClient.post('/bugs', payload);
  return data;
};

export const updateBug = async (id, payload) => {
  const { data } = await apiClient.put(`/bugs/${id}`, payload);
  return data;
};

export const deleteBug = async (id) => {
  await apiClient.delete(`/bugs/${id}`);
};
