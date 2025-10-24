const { pool } = require('../database');
const bcrypt = require('bcrypt');

// Create new user with hashed password
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users 
    (username, email, password_hash) VALUES ($1, $2, $3) 
    RETURNING *`,
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};

const getUser = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`,[id]);
  return result.rows[0];
};

// TO DO: Update a user

const deleteUser = async (id) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`,[id]);
  return result.rows[0];
};