import { Task } from '../models/Task.js';

export const taskRepository = {
  async findAll() {
    return await Task.find();
  },
  
  async findById(id) {
    return await Task.findById(id);
  },
  
  async create(title) {
    return await Task.create({ title });
  },
  
  async update(id, updates) {
    return await Task.findByIdAndUpdate(id, updates, { new: true });
  },
  
  async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
};
