import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Automatically attach JWT token to headers if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const updateUserProfile = (formData) => API.put('/auth/profile', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Expense endpoints
export const getExpenses = (params) => API.get('/expenses', { params });
export const getExpenseSummary = () => API.get('/expenses/summary');
export const createExpense = (expenseData) => API.post('/expenses', expenseData);
export const updateExpense = (id, expenseData) => API.put(`/expenses/${id}`, expenseData);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

export default API;
