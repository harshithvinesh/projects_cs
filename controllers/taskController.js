import { taskService } from '../services/taskService.js';

export const taskController = {
  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json({ success: true, count: tasks.length, data: tasks });
    } catch (err) {
      next(err);
    }
  },

  async getTask(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.json({ success: true, data: task });
    } catch (err) {
      next(err);
    }
  },

  async createTask(req, res, next) {
    try {
      const { title } = req.body;
      const newTask = await taskService.createNewTask(title);
      res.status(201).json({ success: true, data: newTask });
    } catch (err) {
      next(err);
    }
  },

  async updateTask(req, res, next) {
    try {
      const updated = await taskService.updateTask(req.params.id, req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const deleted = await taskService.removeTask(req.params.id);
      res.json({ success: true, message: `Task ${deleted._id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  }
};
