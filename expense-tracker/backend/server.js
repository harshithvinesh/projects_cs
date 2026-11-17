const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const expenseRoutes=require('./routes/expenseRoutes.js')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin:'*',
  credentials:true
}));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses',expenseRoutes)


// Basic Test Route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Expense Tracker API with Prisma is running!' });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
