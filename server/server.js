// Main server entry point: sets up Express, connects to MongoDB, and seeds sample data
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('express').json;
const { PORT, MONGO_URI } = require('./config');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const User = require('./models/User');
const Book = require('./models/Book');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser());

// API routes
app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

// Basic health-check
app.get('/', (req, res) => res.json({ success: true, message: 'Library API is running', data: null }));

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Seed sample data if collections empty
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();

    if (userCount === 0) {
      console.log('No users found — creating sample user');
      const hashed = await bcrypt.hash('password123', 10);
      await User.create({ studentId: '12345', password: hashed, name: 'Test Student' });
    }

    if (bookCount === 0) {
      console.log('No books found — inserting sample books');
      const sampleBooks = [
        { studentId: '12345', title: 'Introduction to Algorithms', returnDate: new Date('2025-11-25'), fine: 0 },
        { studentId: '12345', title: 'Database Management Systems', returnDate: new Date('2025-11-29'), fine: 20 },
        { studentId: '12345', title: 'Operating System Concepts', returnDate: new Date('2025-11-30'), fine: 0 }
      ];
      await Book.insertMany(sampleBooks);
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
