import React, { useState } from 'react';
import './BookSearch.css';

const BookSearch = ({ onAddBook, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=20`
      );
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      const formattedBooks = (data.items || []).map(item => ({
        google_books_id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
        cover_url: item.volumeInfo.imageLinks?.thumbnail || null,
        description: item.volumeInfo.description || 'No description available',
        published_date: item.volumeInfo.publishedDate || null,
        page_count: item.volumeInfo.pageCount || null
      }));

      setSearchResults(formattedBooks);
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book, status) => {
    try {
      await onAddBook(book, status);
      // Optionally show success feedback
    } catch (err) {
      console.error('Failed to add book:', err);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="book-search-overlay" onClick={onClose}>
      <div className="book-search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="book-search-header">
          <h2>Search for Books</h2>
          <button className="book-search-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>

        <form onSubmit={searchBooks} className="book-search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="book-search-input"
            autoFocus
          />
          <button type="submit" disabled={loading} className="book-search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="book-search-error">{error}</div>}

        <div className="book-search-results">
          {searchResults.length === 0 && !loading && searchQuery && (
            <p className="book-search-empty">No books found. Try a different search.</p>
          )}

          {searchResults.map((book) => (
            <div key={book.google_books_id} className="book-search-result">
              {book.cover_url && (
                <img 
                  src={book.cover_url} 
                  alt={book.title}
                  className="book-search-cover"
                />
              )}
              <div className="book-search-info">
                <h3 className="book-search-title">{book.title}</h3>
                <p className="book-search-author">{book.author}</p>
                {book.published_date && (
                  <p className="book-search-date">{book.published_date.substring(0, 4)}</p>
                )}
              </div>
              <div className="book-search-actions">
                <button
                  onClick={() => handleAddBook(book, 'inProgress')}
                  className="book-search-action-btn reading"
                  title="Add to Currently Reading"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleAddBook(book, 'wishlist')}
                  className="book-search-action-btn wishlist"
                  title="Add to Wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleAddBook(book, 'complete')}
                  className="book-search-action-btn complete"
                  title="Add to Completed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;