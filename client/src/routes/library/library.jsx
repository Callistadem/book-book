import React, { useState } from 'react';
import BookShelf from './components/BookShelf';
import ReadingTracker from './components/ReadingTracker';
import './library.css';
import userServices from '../../services/user'

const LibraryPage = (user) => {
  const [books, setBooks] = useState({
    inProgress: [],
    complete: [],
    wishlist: []
  });
 
  window.onload = async () => {
    const newBooks = await userServices.getUserBook(user.id);
    
    if (newBooks) {
      // Loop through books to order them according to status - TO CHANGE

    }
  }
  

  return (
    <div className="library-container">
      <div className="library-content">
        <div className="library-header">
          <div className="library-header-info">
            <h1>My Library</h1>
            <p>Welcome back, {user?.name}</p>
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