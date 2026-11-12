import express from 'express';
import { register, login } from '../controllers/authController.js'; // <-- Added .js here!

export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
