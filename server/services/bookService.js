const { pool } = require('../database')

const getAllBooks = async () => {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
}

const getBook = async (id) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
}

const addBook = async (title, author) => {
    const result = await pool.query(
        `INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *`,
        [title, author]
    );
    return result.rows[0];
}

module.exports = { getAllBooks, getBook, addBook };