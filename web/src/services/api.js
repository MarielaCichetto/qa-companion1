import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const fetchTestCases = () => client.get('/test-cases');
export const fetchBugs = () => client.get('/bugs');
export const createBug = (payload) => client.post('/bugs', payload);
export const createTestCase = (payload) => client.post('/test-cases', payload);

// Futuro: añadir endpoints para checklists, reportes, autenticación

export default client;
