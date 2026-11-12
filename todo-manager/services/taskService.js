import { taskRepository } from '../repositories/taskRepository.js';

export const taskService = {
  // Fetch tasks belonging strictly to this user
  async getTasksByUser(userId) {
    return await taskRepository.findByUser(userId);
  },
  
  async getTaskById(id, userId) {
    const task = await taskRepository.findByIdAndUser(id, userId);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  },
  
  async createNewTask(title, userId) {
    if (!title || title.trim() === '') {
      throw new Error('Task title cannot be empty');
    }
    // Pass both the title and the user's ID to the repository
    return await taskRepository.create({ title: title.trim(), userId });
  },
  
  async updateTask(id, userId, updates) {
    const updated = await taskRepository.updateByUser(id, userId, updates);
    if (!updated) {
      throw new Error(`Task with ID ${id} not found for update`);
    }
    return updated;
  },
  
  async removeTask(id, userId) {
    const deleted = await taskRepository.deleteByUser(id, userId);
    if (!deleted) {
      throw new Error(`Task with ID ${id} not found for deletion`);
    }
    return deleted;
  }
};
