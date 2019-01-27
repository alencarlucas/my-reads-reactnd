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

const NO_QUERY_PARAMS_STRING = 'Type some text on input above to release a search';

const NO_RESULTS_FOUND_STRING = 'No results found'

class BooksApp extends React.Component {
  constructor() {
    super()

    this.state = {
      bookShelves: [],
      loaded: false,
      query: '',
      searching: false,
      foundBooks: [],
      emptySearchTitle: NO_QUERY_PARAMS_STRING
    }
  }

  async componentDidMount() {
    const results = await BooksAPI.getAll();
    // Create a list of books grouped by shelf.
    const bookShelves = SHELVES
      .filter(shelf => !shelf.visibleOnlyOnSearch)
      .map(shelf => {
        return {
          shelf: shelf.mask,
          books: results.filter(book => book.shelf === shelf.value) || []
        }
      })
    this.setState({ bookShelves, loaded: true });
  }

  async onSearch() {
    const { query } = this.state.query;
    const foundBooks = await BooksAPI.search(query)
    this.setState({
      foundBooks, 
      searching: false,
      emptySearchTitle: !foundBooks || foundBooks.error ? NO_RESULTS_FOUND_STRING :  ''
    })
  }

  async onTextChange(text) {
    const query = text ? { query: text } : ''
    await this.setState({
      query,
      searching: query && true,
      emptySearchTitle: !query ? NO_QUERY_PARAMS_STRING :  ''
    })
    // Realise a search when a value is passed to the search input
    query && await this.onSearch()
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            bookShelves={this.state.bookShelves}
            loaded={this.state.loaded}
            shelves={SHELVES}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            foundBooks={this.state.foundBooks}
            emptySearchTitle={this.state.emptySearchTitle}
            searching={this.state.searching}
            shelves={SHELVES}
            onCloseSearch={() => history.push('/')}
            onTextChange={this.onTextChange.bind(this)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
