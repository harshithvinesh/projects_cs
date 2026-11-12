import express from 'express';
import { taskController } from '../controllers/taskController.js';
import { validateTaskBody } from '../middlewares/validateTask.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Protected with verifyToken middleware
router.get('/', verifyToken, taskController.getTasks);
router.get('/:id', verifyToken, taskController.getTask);

router.post('/', verifyToken, validateTaskBody, taskController.createTask);
router.put('/:id', verifyToken, validateTaskBody, taskController.updateTask);

router.delete('/:id', verifyToken, taskController.deleteTask);

export const taskRouter = router;
