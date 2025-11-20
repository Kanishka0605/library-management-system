// Book model: stores which student borrowed a book and its return date + fine
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  studentId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  returnDate: { type: Date, required: true },
  fine: { type: Number, default: 0 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
