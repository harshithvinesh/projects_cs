const express = require('express');
const {
  createExpense,
  getExpense,
  getExpenseSummary,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController.js');
const { protect } = require('../src/middleware/auth.js');
const router = express.Router();
router.use(protect);
router.route('/').post(createExpense).get(getExpense);
router.route('/summary').get(getExpenseSummary);
router.route('/:id').delete(deleteExpense).put(updateExpense);
module.exports = router;
