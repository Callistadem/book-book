import React, { useState } from 'react';

const BookSpine = ({ book, onBookClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulledOut, setIsPulledOut] = useState(false);

  const handleClick = () => {
    setIsPulledOut(!isPulledOut);
    if (onBookClick) {
      onBookClick(book);
    }
  };

  return (
    <div 
      className={`book-spine ${isHovered ? 'hovered' : ''} ${isPulledOut ? 'pulled-out' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        backgroundColor: book.color,
        background: `linear-gradient(to right, ${book.spine} 0%, ${book.color} 8%, ${book.color} 92%, ${book.spine} 100%)`
      }}
    >
      <div className="book-spine-content">
        <div className="book-text">
          <p className="book-title">{book.title}</p>
          <p className="book-author">{book.author}</p>
        </div>
      </div>
      
      {/* Book edge that shows when pulled out */}
      <div className="book-edge" style={{backgroundColor: book.spine}} />
      
      {/* Decorative elements for realism */}
      <div className="book-top-edge" style={{backgroundColor: book.spine}} />
      <div className="book-bottom-edge" style={{backgroundColor: book.spine}} />
    </div>
  );
};

export default BookSpine;