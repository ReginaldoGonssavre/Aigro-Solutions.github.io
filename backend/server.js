require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Use port from .env or default to 3000

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Use routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
