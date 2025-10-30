const express = require('express');
const router = express.Router();


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createUser, getAllUsers, getUser, deleteUser, getUserByEmail } = require('../services/userService');
const { getUserBooks, addUserBook, updateUserBook, deleteUserBook } = require('../services/userBookService');
// const authenticate = require('server/middleware/authenticate.js');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.get('/user', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});


router.get('/user/book', async (req, res) => {
  const books = await getUserBooks();
  res.json(books);
});

router.post('/user/book', async (req, res) => {
  const { user_id, book_id, status } = req.body;
  try {
    const book = await addUserBook(user_id, book_id, status);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to add book ${book_id} to user ${user_id}` });
  }
});

router.put('/user/book', async (req, res) => {
  const { user_id, book_id, status } = req.body;
  try {
    const book = await updateUserBook(user_id, book_id, status);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to update book ${book_id} for user ${user_id}` });
  }
});

router.delete('/user/book', async (req, res) => {
  const { user_id, book_id } = req.body;
  try {
    const book = await deleteUserBook(user_id, book_id);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to delete book ${book_id} for user ${user_id}` });
  }
});

module.exports = router;