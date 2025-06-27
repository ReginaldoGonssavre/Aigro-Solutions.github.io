const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// --- Placeholder API Endpoints ---

// 1. Quantum Data Ingestion (File Upload)
app.post('/api/upload', upload.single('data'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('File received:', req.file.originalname);
  // In a real application, process the file here (e.g., store, analyze, pass to quantum backend)
  res.json({ message: 'File uploaded successfully', filename: req.file.originalname, size: req.file.size });
});

// 2. Authentication Endpoints
// Placeholder for user registration
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  console.log(`Register attempt: ${username}`);
  // In a real app: hash password, save to DB, generate token
  res.json({ msg: `User ${username} registered (placeholder)` });
});

// Placeholder for user login
app.post('/api/login', (req, res) => {
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
app.get('/api/users/me', (req, res) => {
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

// 3. Quantum Job Execution
app.post('/api/ia', (req, res) => {
  const { module, prompt } = req.body;
  console.log(`Quantum job request: Module - ${module}, Prompt - ${prompt}`);
  // In a real application: interact with quantum backend/API
  res.json({ result: `Quantum job for '${prompt}' processed by '${module}' (placeholder)` });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
