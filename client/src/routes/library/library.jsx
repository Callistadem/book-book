import React, { useState } from 'react';
import BookShelf from './components/BookShelf';
import ReadingTracker from './components/ReadingTracker';
import './library.css';

const LibraryPage = ({ user, onLogout }) => {
  const [books] = useState({
    inProgress: [
      { id: 1, title: 'The Midnight Library', author: 'Matt Haig', color: '#8B4513', spine: '#654321' },
      { id: 2, title: 'Atomic Habits', author: 'James Clear', color: '#2C5F4F', spine: '#1a3d2e' },
      { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', color: '#4A5568', spine: '#2D3748' },
    ],
    complete: [
      { id: 4, title: 'The House in the Cerulean Sea', author: 'TJ Klune', color: '#4A90A4', spine: '#2d5661' },
      { id: 5, title: 'Educated', author: 'Tara Westover', color: '#8B7355', spine: '#5d4d39' },
      { id: 6, title: 'Where the Crawdads Sing', author: 'Delia Owens', color: '#6B8E23', spine: '#4d6519' },
      { id: 7, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', color: '#CD5C5C', spine: '#8b3a3a' },
    ],
    wishlist: [
      { id: 8, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', color: '#9370DB', spine: '#6247aa' },
      { id: 9, title: 'Lessons in Chemistry', author: 'Bonnie Garmus', color: '#D2691E', spine: '#8b4513' },
    ]
  });

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