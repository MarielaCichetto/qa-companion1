import apiClient from './apiClient';

export const fetchTestCases = async () => {
  const { data } = await apiClient.get('/test-cases');
  return data;
};

export const createTestCase = async (payload) => {
  const { data } = await apiClient.post('/test-cases', payload);
  return data;
};

export const updateTestCase = async (id, payload) => {
  const { data } = await apiClient.put(`/test-cases/${id}`, payload);
  return data;
};

export const deleteTestCase = async (id) => {
  await apiClient.delete(`/test-cases/${id}`);
};
