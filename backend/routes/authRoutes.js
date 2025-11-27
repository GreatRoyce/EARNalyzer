const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 🔹 Register new user
router.post('/register', authController.register);

// 🔹 Verify user email via token
router.get('/verify/:token', authController.verifyEmail);

// 🔹 Login user
router.post('/login', authController.login);

// 🔹 Forgot password request
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
