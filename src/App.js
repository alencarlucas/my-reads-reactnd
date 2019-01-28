import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './Components/SearchBooks'
import ListBooks from './Components/ListBooks'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'

const SHELVES = [
  { value: 'currentlyReading', mask: 'Currently Reading' },
  { value: 'wantToRead', mask: 'Want to Read' },
  { value: 'read', mask: 'Read' },
  { value: 'none', mask: 'None', visibleOnlyOnSearch: true }
];

const NO_QUERY_PARAMS_STRING = 'Type some text on input above to perform a search';

const NO_RESULTS_FOUND_STRING = 'No results found'

class BooksApp extends React.Component {
  constructor() {
    super()

    this.state = {
      // Main page params
      books: [],
      bookShelves: [],
      loaded: false,
      // Search page params
      query: '',
      searching: false,
      foundBooks: [],
      emptySearchTitle: NO_QUERY_PARAMS_STRING
    }
  }

  // iterate over all books to set the correct shelf, it's necessary because
  // 'shelf' property isn't present on the return from search method in BooksAPI
  setShelf(foundBooks) {
    const { books } = this.state;
    return foundBooks.map(book => {
      let shelvedBook = books.filter(shelvedBook => shelvedBook.id === book.id);
      return shelvedBook.length ? shelvedBook.pop() : { ...book, shelf: 'none' };
    })
  }

  async setBooks(books) {
    // Create a list of books grouped by shelf.
    const bookShelves = SHELVES
      .filter(shelf => !shelf.visibleOnlyOnSearch)
      .map(shelf => {
        return {
          shelf: shelf.mask,
          books: books.filter(book => book.shelf === shelf.value) || []
        }
      })
    this.setState({ books, bookShelves, loaded: true });
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    await this.setBooks(books);
  }

  async onSearch() {
    const { query } = this.state;
    // Carry out a books search and set state based on the results retrieved
    let foundBooks = await BooksAPI.search(query);
    // Set the correct shelf to each book returned from API
    foundBooks = this.setShelf(foundBooks)
    this.setState({
      foundBooks, 
      searching: false,
      emptySearchTitle: !foundBooks || foundBooks.error ? NO_RESULTS_FOUND_STRING :  ''
    })
  }

  async onTextChange(text) {
    const query = text ? text : ''
    await this.setState({
      query,
      searching: query && true,
      emptySearchTitle: !query ? NO_QUERY_PARAMS_STRING :  ''
    })
    // Call onSearch function when a value is passed to the search input
    query && await this.onSearch()
  }

  async onSelectShelf(book, shelf) {
    await this.setState({ loaded: false, searching: true })
    await BooksAPI.update(book, shelf)
    const updatedBooks = await BooksAPI.getAll();
    // Update books at main page and search again to update results, this calls
    this.setBooks(updatedBooks);
    this.onTextChange(this.state.query);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            bookShelves={this.state.bookShelves}
            loaded={this.state.loaded}
            shelves={SHELVES}
            onSelectShelf={this.onSelectShelf.bind(this)}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            foundBooks={this.state.foundBooks}
            emptySearchTitle={this.state.emptySearchTitle}
            searching={this.state.searching}
            query={this.state.query}
            shelves={SHELVES}
            onCloseSearch={() => history.push('/')}
            onTextChange={this.onTextChange.bind(this)}
            onSelectShelf={this.onSelectShelf.bind(this)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
