import React, { Component } from 'react';
import ShelfSelector from './ShelfSelector'

class Book extends Component {
  render() {
    const { title, authors, imageLinks, shelf, shelves, id, onSelectShelf} = this.props;
    const backgroundImage = imageLinks && `url(${imageLinks.smallThumbnail})`;

    return (
      <li key={id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ backgroundImage }}></div>
            <div className="book-shelf-changer">
              <ShelfSelector
                selectedShelf={shelf}
                shelves={shelves}
                book={{id}}
                onSelectShelf={onSelectShelf}
              />
            </div>
          </div>
          <div className="book-title">{title && title}</div>
          <div className="book-authors">{authors && authors.join(', ')}</div>
        </div>
      </li>
    )
  }
}

export default Book;