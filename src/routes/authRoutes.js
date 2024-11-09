const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // JWT with the user ID as payload
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
