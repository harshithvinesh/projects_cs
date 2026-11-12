import { Task } from '../models/Task.js';

export const taskRepository = {
  // Find all tasks belonging strictly to a specific user
  async findByUser(userId) {
    return await Task.find({ userId });
  },
  
  // Find a specific task ensuring it belongs to the user
  async findByIdAndUser(id, userId) {
    return await Task.findOne({ _id: id, userId });
  },
  
  // Create a new task tied to the user object (title + userId)
  async create(taskData) {
    return await Task.create(taskData);
  },
  
  // Update a task ensuring ownership check
  async updateByUser(id, userId, updates) {
    return await Task.findOneAndUpdate(
      { _id: id, userId }, 
      updates, 
      { new: true, runValidators: true }
    );
  },
  
  // Delete a task ensuring ownership check
  async deleteByUser(id, userId) {
    return await Task.findOneAndDelete({ _id: id, userId });
  }
};
