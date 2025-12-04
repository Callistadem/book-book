const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createUser, getUser, getUserByEmail } = require('../services/userService');
const { getUserBooks, addUserBook, updateUserBook, deleteUserBook } = require('../services/userBookService');
const {getBook, addBook } = require('../services/bookService');
const authenticate = require('../middleware/authenticate.js');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});


// TO DO: Add error message for registering w an email that already exists 
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    // creates token since user automatically signs in upon register
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.get('/user', authenticate, async (req, res) => {
  try {
    const user = await getUser(req.user?.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


// Get user's books (joins with books table to get full details)
router.get('/user/book', authenticate, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const books = await getUserBooks(userId);
    
    if (!books) {
      return res.status(404).json({ message: 'No books found' });
    }
    
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching user books:', error);
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
});


router.get('/user/book/:id', authenticate, async (req, res) => {
  const books = await getUserBooks(req.user?.id);
  res.status(200).json(books);
});


// Add book from search (Google Books API)
// This creates the book if it doesn't exist, then adds to user's library
router.post('/user/book', authenticate, async (req, res) => {
  const { book, status } = req.body;
  
  try {
    // Check if book exists, if not create it
    let bookRecord = await getBook(book.google_books_id);
    
    if (!bookRecord) {
      bookRecord = await addBook({
        id: book.google_books_id,
        title: book.title,
        author: book.author,
        cover_url: book.cover_url,
        description: book.description,
        published_date: book.published_date,
        page_count: book.page_count
      });
    }
    
    // Add to user's library using google_books_id
    const userBook = await addUserBook(req.user.id, book.google_books_id, status);
    
    res.status(201).json(userBook);
  } catch (err) {
    console.error('Error adding book from search:', err);
    // Check if it's a duplicate entry error
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Book already in your library' });
    }
    res.status(500).json({ error: 'Failed to add book to library' });
  }
});

// Update user book status
router.put('/user/book/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  try {
    const book = await updateUserBook(req.user?.id, id, status);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to update book ${id}` });
  }
});

// Delete user book
router.delete('/user/book/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  
  try {
    const book = await deleteUserBook(req.user?.id, id);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to delete book ${id}` });
  }
});

module.exports = router;