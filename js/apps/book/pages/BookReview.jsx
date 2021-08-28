import { books } from "../assets/json/books.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

export class BookReview extends React.Component {

    state = {
        review: {
            name: 'Books Reader',
            rating: 1,
            txt: '',
            readAt: new Date().toLocaleDateString('fr-CA'),
            id: utilService.makeId()
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        let field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        if (field === 'rating') value = +value
        this.setState(prevState => ({ review: { ...prevState.review, [field]: value } }), () => {
            console.log(this.state);
        })

    }
    onSaveReview = (ev) => {
        ev.preventDefault()
        bookService.saveReview(this.props.match.params.bookId, this.state.review)
            .then(() => this.props.history.push(`/book/${this.props.match.params.bookId}`))
    }

    render() {
        const { name, rating, txt, readAt } = this.state.review
        return (
            <form className="book-review" onSubmit={this.onSaveReview}>
                <label htmlFor="ReaderName">Full Name</label>
                <input ref={this.inputRef} type="text" name="name" id="ReaderName" value={name} onChange={this.handleChange} />

                <label htmlFor="rating">Rate</label>
                <select name="rating" value={rating} onChange={this.handleChange} type='number'>

                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <label htmlFor="ReadAt">Read At</label>
                <input type="date" name="readAt" value={readAt} onChange={this.handleChange} />
                <textarea name="txt" id="" cols="40" rows="7" value={txt} placeholder="Write review..." onChange={this.handleChange}> </textarea>
                <button>Send Review</button>
            </form>

        )
    }
}