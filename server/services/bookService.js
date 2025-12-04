const { pool } = require('../database')

/**
 * Get all books
 */
const getAllBooks = async () => {
  const query = 'SELECT * FROM books ORDER BY title';
  const result = await pool.query(query);
  return result.rows;
};

const getBook = async (id) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0] || null;
}

/**
 * Create a new book in the database
 * Uses google_books_id as primary key to prevent duplicates
 */
const addBook = async (bookData) => {
  const query = `
    INSERT INTO books (id, title, author, cover_url, description, published_date, page_count)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO NOTHING
    RETURNING *
  `;
  const values = [
    bookData.id,
    bookData.title,
    bookData.author,
    bookData.cover_url,
    bookData.description,
    bookData.published_date,
    bookData.page_count
  ];
  
  try {
    const result = await pool.query(query, values);
    // If conflict occurred, fetch the existing book
    if (result.rows.length === 0) {
      return await getBook(bookData.id);
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};


module.exports = { getAllBooks, getBook, addBook };