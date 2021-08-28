const { Link } = ReactRouterDOM

import { BookDesc } from '../cmps/BookDesc.jsx'
import { bookService } from '../services/book.service.js'
import { BookReviewsList } from '../cmps/BookReviewsList.jsx'

export class BookDetails extends React.Component {
    state = {
        book: null
    }

    componentDidMount() {
        this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getBookById(bookId)
            .then(book => {
                this.setState({ book })
            })
    }

    pageCount = () => {
        let val = this.state.book.pageCount
        if (val > 500) return 'Long Reading'
        if (val > 200) return 'Decent Reading'
        if (val < 100) return 'Light Reading'

    }

    publishDate = () => {
        let val = 2021 - this.state.book.publishedDate
        if (val > 10) return 'Veteran Book'
        if (val < 1) return 'New!'
    }

    bookPrice = () => {
        let val = this.state.book.listPrice.amount
        if (val > 150) return 'red'
        if (val < 20) return 'green'
    }
    onBack = () => {
        this.props.history.push('/book')
    }
    onNextBook = (diff) => {
        bookService.getNextBookById(this.state.book.id, diff)
            .then(bookId => {
                this.props.history.push(`/book/${bookId}`)
            })
    }
    onDeleteReview = (deleteReviewIdx) => {
        const {book} =this.state;
        let reviewId = book.reviews.findIndex((review)=>{
            return deleteReviewIdx === review.id
        })
        bookService.deleteReview(book,reviewId)
        .then(this.loadBook())
    }


    render() {
        const { book } = this.state
        if (!book) return <div>Loading ...</div>
        return (
            <section className="book-details">
                <h3>{book.title}</h3>
                <img className="book-img" src={book.thumbnail} />
                <h5>{this.publishDate()}</h5>
                {book.listPrice.isOnSale && <img className="sale-img" src="../css/assests/imgs/sale.png" />}
                <p className={this.bookPrice()}>price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
                <p>{book.authors.length > 1 ? 'Authors: ' : 'Author: '}{book.authors}</p>
                <p>{this.pageCount()}</p>
                <BookDesc bookTxt={book.description} />
                <button onClick={this.onBack}>Back</button>
                <button onClick={() => this.onNextBook(-1)}>Prev Book</button>
                <button onClick={() => this.onNextBook(1)}>Next Book</button>
                <Link to={`/book/review/${book.id}`}><button>Add Review</button> </Link>
                <Link to={`/book/${book.id}/reviews`}><button>See Reviews</button> </Link>
            </section>
        )
    }
}


