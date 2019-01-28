import React from 'react'

const ShelfSelector = ({ selectedShelf, shelves, book, onSelectShelf }) => {
  return (
    <select
      value={selectedShelf || 'none'}
      onChange={(e) => onSelectShelf(book, e.target.value)} >
        <option value="move" disabled>Move to...</option>
        {
          shelves.map(shelf => (
            <option value={shelf.value} key={shelf.value}>
              {shelf.mask}
            </option>
          ))
        }
    </select>
  )
}
export default ShelfSelector;