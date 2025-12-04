const { pool } = require('../database')

/**
 * Get all books for a user with full book details
 */
const getUserBooks = async (user_id) => {
  const query = `
    SELECT 
      ub.user_id,
      ub.book_id,
      ub.status,
      ub.created_at as added_at,
      b.title,
      b.author,
      b.cover_url,
      b.description,
      b.published_date,
      b.page_count
    FROM user_book ub
    JOIN books b ON ub.book_id = b.id
    WHERE ub.user_id = $1
    ORDER BY ub.created_at DESC
  `;
  
  const result = await pool.query(query, [user_id]);
  return result.rows;
}

/**
 * Add a book to user's library
 * book_id is the Google Books ID (stored in books.id)
 */
const addUserBook = async (user_id, book_id, status) => {
  try {
    const result = await pool.query(
      `INSERT INTO user_book (user_id, book_id, status) 
       VALUES ($1, $2, $3::book_status) 
       RETURNING *`,
      [user_id, book_id, status]
    );
    return result.rows[0];
  } catch (error) {
    // Handle duplicate entry (user already has this book)
    if (error.code === '23505') {
      throw new Error('Book already in your library');
    }
    throw error;
  }
}

/**
 * Update a user's book status
 */
const updateUserBook = async (user_id, book_id, status) => {
  const result = await pool.query(
    `UPDATE user_book
     SET status = $1::book_status, updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $2 AND book_id = $3 
     RETURNING *`,
    [status, user_id, book_id]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Book not found in user library');
  }
  
  return result.rows[0];
}

/**
 * Delete a book from user's library
 */
const deleteUserBook = async (user_id, book_id) => {
  const result = await pool.query(
    `DELETE FROM user_book 
     WHERE user_id = $1 AND book_id = $2
     RETURNING *`,
    [user_id, book_id]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Book not found in user library');
  }
  
  return result.rows[0];
}

/**
 * Check if user already has a book
 */
const userHasBook = async (user_id, book_id) => {
  const result = await pool.query(
    `SELECT * FROM user_book WHERE user_id = $1 AND book_id = $2`,
    [user_id, book_id]
  );
  return result.rows.length > 0;
}

module.exports = { 
  getUserBooks, 
  addUserBook, 
  updateUserBook, 
  deleteUserBook,
  userHasBook 
};