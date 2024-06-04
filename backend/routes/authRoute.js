const express = require('express');
const { login, getDashboardData } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.get('/dashboard', authMiddleware, getDashboardData);

module.exports = router;
