import { bookService } from "../services/book.service.js"
import { ShowSearchBooks } from "./ShowSearchBooks.jsx"

export class AddBook extends React.Component {
    state = {
        bookName: '',
        booksForDisplay: [],

    }

    handleChange = ({ target }) => {
        const SearchKey = target.value
        this.setState({ bookName: SearchKey }, (() => { this.onSearchBook() }))

    }
    onSearchBook = () => {
        // ev.preventDefault()
        bookService.getBooksFromApi(this.state.bookName)
            .then(data => this.setState({ booksForDisplay: data.items }), console.log(this.state))

        // this.setState({ state: { ...this.state.booksForDisplay, [field]: value } }, () => {
        //     this.props.onSetFilter(this.state.filterBy)
        // });
    }
    onAddBook = (book) => {
        bookService.onSaveBook(book)
            .then(() => this.props.history.push(`/book`))
    }

    // this.setState({ ...this.state.booksForDisplay, [this.state.booksForDisplay]: data.items }),
    render() {
        const { bookName, booksForDisplay } = this.state
        return (
            <form className="add-book" onSubmit={this.onSearchBook}>
                <label htmlFor="searchBook">Search a book</label>
                <input type="search" name='searchBook' value={bookName} onChange={this.handleChange} />
                <ShowSearchBooks books={booksForDisplay} onAddBook={this.onAddBook}/>
            </form>

        )
    }
}