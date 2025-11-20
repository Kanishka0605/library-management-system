// JWT authentication middleware
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Protect routes by validating the Authorization header (Bearer <token>)
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header', data: null });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    // Attach user info to request for downstream handlers
    req.user = { studentId: payload.studentId, name: payload.name };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token', data: null });
  }
}

module.exports = authMiddleware;
