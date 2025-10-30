const express = require('express');
const router = express.Router();

const { getAllBooks, getBook, addBook } = require('../services/bookService');
// const authenticate = require('server/middleware/authenticate.js');

router.get('/book', async (req, res) => {
  const books = await getAllBooks();
  res.json(books);
});

router.get('/book/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await getBook(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

router.post('/book', async (req, res) => {
  const { title, author, cover } = req.body;
  try {
    const book = await addBook(title, author, cover);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

module.exports = router;