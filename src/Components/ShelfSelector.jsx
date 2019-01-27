import React from 'react'

const ShelfSelector = ({ selectedShelf, shelves }) => {
  return (
    <select value={selectedShelf || 'none'}>
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