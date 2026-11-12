import 'dotenv/config'
import { authRouter } from './routes/authRoutes.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { taskRouter } from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;


// 1. Core Middleware & Static Frontend Serving

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/auth',authRouter) // <--- THIS SERVES YOUR HTML PAGE AUTOMATICALLY

// 2. Custom Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} request received for: ${req.url}`);
  next();
});

// 3. Mount Modular Task Routes
app.use('/api/tasks', taskRouter);

// 4. Single Unified Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error caught by centralized handler:', err.message);
  const statusCode = err.message.includes('not found') ? 404 : 400;
  res.status(statusCode).json({ success: false, error: err.message || 'Internal Server Error' });
});

// 5. Connect to MongoDB & Start Server
mongoose.connect('mongodb://127.0.0.1:27017/express-mini-project')
  .then(() => {
    console.log('📦 Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
