# Library Management System

A modern library management system with user authentication, book borrowing, and tracking features.

## Features

- 🔐 User authentication with JWT
- 📚 Book management (add, return, track)
- 🔍 Search and sort functionality
- ⏰ Overdue notifications
- 📊 Progress tracking
- 🎨 Modern earth-tone design with glassmorphism

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

**Frontend:**
- HTML5
- CSS3 (Glassmorphism design)
- Vanilla JavaScript

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Configure MongoDB:
   - Update the MongoDB connection string in `server/config.js`

4. Start the server:
```bash
npm start
```

5. Open `login.html` in your browser

## Default Test Credentials

- Student ID: `12345`
- Password: `password123`

## API Endpoints

- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/books` - Get user's books
- `POST /api/books/add` - Add a new book
- `DELETE /api/books/:id` - Return a book

## Sample Data

The server automatically seeds sample data on first run:
- Test user (12345/password123)
- 3 sample books with different return dates

## License

MIT
