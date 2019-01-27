import React, { Component } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Loader from 'react-loader';
import Book from './Book'
import EmptyState from './EmptySate'


class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.onHandleText = AwesomeDebouncePromise(this.props.onTextChange, 500);
  }

  render() {
    const { foundBooks, emptySearchTitle, shelves, searching, onCloseSearch } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={onCloseSearch}>
              Close
          </button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.onHandleText(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Loader loaded={!searching}>
            <ol className="books-grid">
              {
                foundBooks && foundBooks.length
                  ? foundBooks.map(book => <Book shelves={shelves} {...book} key={book.id} />)
                  : <EmptyState title={emptySearchTitle} />
              }
            </ol>
          </Loader>
        </div>
      </div>
    )
  }
}

export default SearchBooks;