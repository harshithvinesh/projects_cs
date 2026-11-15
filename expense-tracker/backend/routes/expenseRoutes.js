const express = require('express');
const {
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

// All expense routes require authentication
router.use(protect);

router.route('/').post(createExpense).get(getExpense);
router.route('/:id').delete(deleteExpense);
router.route('/:id').delete(deleteExpense).put(updateExpense);


module.exports = router;
