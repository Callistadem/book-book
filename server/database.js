const { Pool } = require('pg');

// Connect to database
const pool = new Pool({
  user: 'myuser',
  password: 'password',
  host: 'localhost',
  port: 5432, 
  database: 'bookbook_db'
});

// Initialize the database tables
const initDatabase = async () => {

  try {

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,

        password_hash VARCHAR(255),
        google_id VARCHAR(255) UNIQUE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);

    // Books table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        author VARCHAR(50),
        cover_img TEXT
      );
    `)

    // Creating ENUM type for book status
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE book_status AS ENUM ('complete', 'in_progress', 'wishlist');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // User Book table (many to many)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_book (
        user_id INT REFERENCES users(id),
        book_id INT REFERENCES books(id),
        status book_status DEFAULT 'wishlist',
        PRIMARY KEY(user_id, book_id)
      );
    `)

    // User reading habits table 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reading_habits (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        status BOOLEAN DEFAULT FALSE,
        date DATE DEFAULT CURRENT_DATE 
      );
    `)
    console.log("All database tables created");
  } 
  catch (err) {
    console.log("Error initializing database tables", err);
  }
};

module.exports = { pool, initDatabase };