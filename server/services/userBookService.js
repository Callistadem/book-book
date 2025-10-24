const { pool } = require('../database')

const getBooks = async (user_id) => {
    const result = await pool.query('SELECT * FROM user_book WHERE user_id = $1', [user_id]);
    return result.rows;
}

const addBook = async (user_id, book_id, status) => {
    const result = await pool.query(
        `INSERT INTO user_book (user_id, book_id, status) VALUES ($1, $2, $3) RETURNING *`,
        [user_id, book_id, status]
    );
    return result.rows[0];
}

const updateBook = async (user_id, book_id, status) => {
    const result = await pool.query(
        `UPDATE user_book
        SET status = $1 
        WHERE user_id = $2 AND book_id = $3 
        RETURNING *`,
        [status, user_id, book_id]
    );
    return result.rows[0];
}

const deleteBook = async (user_id, book_id) => {
    const result = await pool.query(
        `DELETE FROM user_book 
        WHERE user_id = $1 AND book_id = $2
        RETURNING *`,
        [user_id, book_id]);
    return result.rows[0];
}

module.exports = { getBooks, addBook, updateBook, deleteBook };