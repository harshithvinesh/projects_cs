import { taskRepository } from '../repositories/taskRepository.js';

export const taskService = {
  async getAllTasks() {
    return await taskRepository.findAll();
  },
  
  async getTaskById(id) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  },
  
  async createNewTask(title) {
    if (!title || title.trim() === '') {
      throw new Error('Task title cannot be empty');
    }
    return await taskRepository.create(title.trim());
  },
  
  async updateTask(id, updates) {
    const updated = await taskRepository.update(id, updates);
    if (!updated) {
      throw new Error(`Task with ID ${id} not found for update`);
    }
    return updated;
  },
  
  async removeTask(id) {
    const deleted = await taskRepository.delete(id);
    if (!deleted) {
      throw new Error(`Task with ID ${id} not found for deletion`);
    }
    return deleted;
  }
};
