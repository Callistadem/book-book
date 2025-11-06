const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createUser, getAllUsers, getUser, deleteUser, getUserByEmail } = require('../services/userService');
const { getUserBooks, addUserBook, updateUserBook, deleteUserBook } = require('../services/userBookService');
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


router.get('/user/book', authenticate, async (req, res) => {
  const books = await getUserBooks(req.user?.id);
  res.status(200).json(books);
});

router.get('/user/book/:id', authenticate, async (req, res) => {
  const books = await getUserBooks(req.user?.id);
  res.status(200).json(books);
});

router.post('/user/book/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log('request user:', req)
  try {
    const book = await addUserBook(req.user?.id, id, status);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to add book ${id} to user ${req.user?.id}` });
  }
});

router.put('/user/book/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const book = await updateUserBook(req.user?.id, id, status);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to update book ${id} for user ${req.user?.id}` });
  }
});

router.delete('/user/book/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const book = await deleteUserBook(req.user?.id, id);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to delete book ${id} for user ${req.user?.id}` });
  }
});

module.exports = router;