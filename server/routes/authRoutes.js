// Authentication routes: login and logout
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

// POST /api/register
// Create a new user with hashed password
router.post('/register', async (req, res) => {
  try {
    const { studentId, password, name } = req.body;
    if (!studentId || !password) {
      return res.status(400).json({ success: false, message: 'studentId and password are required', data: null });
    }

    const existing = await User.findOne({ studentId });
    if (existing) {
      return res.status(409).json({ success: false, message: 'studentId already exists', data: null });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ studentId, password: hashed, name: name || '' });

    return res.json({ success: true, message: 'Registration successful', data: { studentId: user.studentId, name: user.name } });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
});

// POST /api/login
// Validate studentId and password, return JWT on success
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    if (!studentId || !password) {
      return res.status(400).json({ success: false, message: 'studentId and password are required', data: null });
    }

    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
    }

    // Sign JWT
    const token = jwt.sign({ studentId: user.studentId, name: user.name }, JWT_SECRET, { expiresIn: '8h' });

    return res.json({ success: true, message: 'Login successful', data: { token } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
});

// POST /api/logout
// For stateless JWT, logout is handled on frontend by removing token.
router.post('/logout', async (req, res) => {
  try {
    // No server-side token invalidation here; client should discard token.
    return res.json({ success: true, message: 'Logout successful', data: null });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
});

module.exports = router;
