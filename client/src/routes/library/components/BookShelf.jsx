import React from 'react';
import { Plus } from 'lucide-react';
import BookSpine from './BookSpine';

const BookShelf = ({ title, books }) => {
  const handleBookClick = (book) => {
    console.log('Opening book:', book.title);
    // You can add navigation or modal logic here later
  };

  return (
    <div className="bookshelf-container">
      <div className="bookshelf-header">
        <h2 className="bookshelf-title">{title}</h2>
        <button className="bookshelf-add-button">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bookshelf-wrapper">
        {/* Shelf backing */}
        <div className="shelf-backing" />
        
        {/* Books container */}
        <div className="books-container">
          {books.map(book => (
            <BookSpine key={book.id} book={book} onBookClick={handleBookClick} />
          ))}
        </div>
        
        {/* Wooden shelf */}
        <div className="wooden-shelf">
          <div className="shelf-front" />
          <div className="shelf-shadow" />
        </div>
      </div>
    </div>
  );
};

export default BookShelf;