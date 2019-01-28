import React from 'react';
import Book from './Book';
import EmptyState from './EmptySate'

const BooksShelf = ({ shelf, books, shelves, onSelectShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books && books.length
              ? books.map(book => (
                <Book
                  shelves={shelves}
                  {...book}
                  onSelectShelf={onSelectShelf}
                  key={book.id} />
                ))
              : <EmptyState title={'there are no books in that shelf'} key={shelf} />
          }
        </ol>
      </div>
    </div>
  )
}

export default BooksShelf;