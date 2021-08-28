export function SearchedPreview({ book,onAddBook }) {

    return (
        <div className="search-list-container">
            <h1> {book.volumeInfo.title}</h1>
            <button onClick={()=>onAddBook(book)}>+</button>
        </div>
    )

}