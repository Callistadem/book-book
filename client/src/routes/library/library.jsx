import React, { useState, useEffect } from 'react';
import BookShelf from './components/BookShelf';
import ReadingTracker from './components/ReadingTracker';
import BookSearch from './components/BookSearch';
import './library.css';
import userServices from '../../services/user'

const LibraryPage = ({user, onLogout}) => {
  const [books, setBooks] = useState({
    inProgress: [],
    complete: [],
    wishlist: []
  });
  const [showSearch, setShowSearch] = useState(false);

  const fetchBooks = async () => {
    if (user?.id) {
      try {
        const newBooks = await userServices.getUserBook();
        if (newBooks) {
          const categorized = {
            inProgress: newBooks.filter(book => book.status === 'inProgress'),
            complete: newBooks.filter(book => book.status === 'complete'),
            wishlist: newBooks.filter(book => book.status === 'wishlist')
          };
          setBooks(categorized);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user?.id]);

  const handleAddBook = async (book, status) => {
    try {
      console.log('Adding book:', book, 'with status:', status);
      // Use addUserBook which handles creating the book AND adding to user library
      await userServices.addUserBook(book, status);
      // Refresh the books list
      await fetchBooks();
      // Close the search modal
      setShowSearch(false);
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. It may already be in your library.');
    }
  };

  return (
    <div className="library-container">
      <div className="library-content">
        <div className="library-header">
          <div className="library-header-info">
            <h1>My Library</h1>
            <p>Welcome back, {user?.username}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => setShowSearch(true)} 
              className="library-search-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="white">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
              </svg>
              Search Books
            </button>
            <button onClick={onLogout} className="library-signout-button">
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="library-shelves">
          <BookShelf title="Currently Reading" books={books.inProgress} />
          <BookShelf title="Completed" books={books.complete} />
          <BookShelf title="Wishlist" books={books.wishlist} />
        </div>
        
        <ReadingTracker />
      </div>

      {showSearch && (
        <BookSearch 
          onAddBook={handleAddBook}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
};

export default LibraryPage;