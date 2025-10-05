import apiClient from './apiClient';

export const taskService = {
  async fetchTasks() {
    const response = await apiClient.get('/tasks');
    return response.data.tasks;
  },
  async createTask(payload) {
    const response = await apiClient.post('/tasks', payload);
    return response.data.task;
  },
  async updateTask(taskId, payload) {
    const response = await apiClient.patch(`/tasks/${taskId}`, payload);
    return response.data.task;
  },
  async deleteTask(taskId) {
    await apiClient.delete(`/tasks/${taskId}`);
  },
  async reorderTasks(updates) {
    const response = await apiClient.put('/tasks/reorder', { updates });
    return response.data.tasks;
  }
};
