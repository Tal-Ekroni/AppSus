// const { NavLink, withRouter } = ReactRouterDOM
import { SearchedPreview } from "./SearchedPreview.jsx"
export function ShowSearchBooks({ books ,onAddBook}) {
  return (
    <section className="show-search-books">
      <div className="books-container">
        {books.map((book)=> <SearchedPreview key={book.id} book={book} onAddBook={onAddBook}/>)}
      </div>
    </section>
  )
}

// export const AppHeader= withRouter(_AppHeader)




