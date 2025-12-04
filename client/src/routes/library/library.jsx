import React, { useState, useEffect } from 'react';
import BookShelf from './components/BookShelf';
import ReadingTracker from './components/ReadingTracker';
import './library.css';
import userServices from '../../services/user'

const LibraryPage = ({user, onLogout}) => {
  const [books, setBooks] = useState({
    inProgress: [],
    complete: [],
    wishlist: []
  });
 
  useEffect(() => {
    const fetchBooks = async () => {
      console.log('user is:', user);
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

    fetchBooks();
  }, [user?.id]);
  

  return (
    <div className="library-container">
      <div className="library-content">
        <div className="library-header">
          <div className="library-header-info">
            <h1>My Library</h1>
            <p>Welcome back, {user?.username}</p>
          </div>
          <button onClick={onLogout} className="library-signout-button">
            Sign Out
          </button>
        </div>

        <div className="library-shelves">
          <BookShelf title="Currently Reading" books={books.inProgress} />
          <BookShelf title="Completed" books={books.complete} />
          <BookShelf title="Wishlist" books={books.wishlist} />
        </div>

        <ReadingTracker />
      </div>
    </div>
  );
};

export default LibraryPage;