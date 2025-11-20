// Book routes: list and add books for students
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/books
// Returns books for the authenticated student
router.get('/', authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const books = await Book.find({ studentId }).sort({ returnDate: 1 }).lean();
    return res.json({ success: true, message: 'Books retrieved', data: books });
  } catch (err) {
    console.error('Get books error:', err);
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
});

// POST /api/books/add
// Add a new book entry. studentId in body or derived from token.
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const bodyStudentId = req.body.studentId;
    const studentId = bodyStudentId || req.user.studentId;
    const { title, returnDate, fine } = req.body;

    if (!title || !returnDate) {
      return res.status(400).json({ success: false, message: 'title and returnDate are required', data: null });
    }

    const book = new Book({
      studentId,
      title,
      returnDate: new Date(returnDate),
      fine: typeof fine === 'number' ? fine : 0
    });

    await book.save();
    return res.json({ success: true, message: 'Book added', data: book });
  } catch (err) {
    console.error('Add book error:', err);
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
});

// DELETE /api/books/:id
// Remove (return) a book for the authenticated student
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const bookId = req.params.id;
    const studentId = req.user.studentId;

    const book = await Book.findOne({ _id: bookId, studentId });
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found', data: null });
    }

    await Book.deleteOne({ _id: bookId });
    return res.json({ success: true, message: 'Book returned', data: { id: bookId } });
  } catch (err) {
    console.error('Delete book error:', err);
    return res.status(500).json({ success: false, message: 'Server error', data: null });
  }
});

module.exports = router;
