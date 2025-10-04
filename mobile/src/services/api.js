const API_URL = 'http://localhost:4000/api';

export const fetchTestCases = async () => {
  const response = await fetch(`${API_URL}/test-cases`);
  return response.json();
};

export const fetchBugs = async () => {
  const response = await fetch(`${API_URL}/bugs`);
  return response.json();
};

// Futuro: manejar autenticación, checklists y exportaciones
