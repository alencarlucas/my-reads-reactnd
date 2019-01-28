import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader';
import BookShelf from './BookShelf'

class ListBooks extends Component {

  render() {
    const { loaded, bookShelves, shelves, onSelectShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Loader loaded={loaded}>
          <div className="list-books-content">
            <div>
              {
                bookShelves && bookShelves.map(({ shelf, books }) => (
                  <BookShelf
                    shelf={shelf}
                    books={books}
                    shelves={shelves}
                    onSelectShelf={onSelectShelf}
                    key={shelf} />
                ))
              }
            </div>
          </div>
        </Loader>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks