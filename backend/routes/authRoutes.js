const express = require('express');
const router = express.Router();

// Placeholder for user registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log(`Register attempt: ${username}`);
  // In a real app: hash password, save to DB, generate token
  res.json({ msg: `User ${username} registered (placeholder)` });
});

// Placeholder for user login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username}`);
  // In a real app: verify credentials, generate JWT
  if (username === 'test' && password === 'password') {
    res.json({ access_token: 'mock_jwt_token', msg: 'Login successful (placeholder)' });
  } else {
    res.status(401).json({ msg: 'Invalid credentials (placeholder)' });
  }
});

// Placeholder for fetching user data (requires token)
router.get('/users/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Authorization token required.');
  }
  const token = authHeader.split(' ')[1];
  // In a real app: validate token, fetch user from DB
  if (token === 'mock_jwt_token') {
    res.json({ username: 'testuser', email: 'test@example.com', roles: ['user'] });
  } else {
    res.status(403).send('Invalid token.');
  }
});

module.exports = router;
