const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect } = require('../src/middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route (Accessible via GET /api/auth/me with a valid token)
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'You have accessed a protected route!',
    user: req.user, // Contains userId and email extracted from the token
  });
});

module.exports = router;
