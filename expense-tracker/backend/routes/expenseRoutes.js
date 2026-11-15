const express = require('express');
const {
  createExpense,
  getExpense,
  deleteExpense,
} = require('../controllers/expenseController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

// All expense routes require authentication
router.use(protect);

router.route('/').post(createExpense).get(getExpense);
router.route('/:id').delete(deleteExpense);

module.exports = router;
