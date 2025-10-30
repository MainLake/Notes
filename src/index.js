const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); // Import path module
const taskRoutes = require('./routes/task.routes');

const app = express();

// Settings
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Use morgan only in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes - Prioritize these
app.use('/api/tasks', taskRoutes);

// Production Frontend Serving Logic
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build directory
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  // Development-only welcome message
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Tasks API [Development Mode]' });
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});