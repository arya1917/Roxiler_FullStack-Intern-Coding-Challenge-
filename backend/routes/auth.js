// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Register a new user
router.post('/signup', signup);

// Authenticate and issue JWT
router.post('/login', login);

module.exports = router;
