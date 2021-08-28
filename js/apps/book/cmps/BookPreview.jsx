const { Link, } = ReactRouterDOM

export function BookPreview({ book }) {

    switch (book.listPrice.currencyCode) {
        case 'USD':
            book.listPrice.currencyCode = '$'
            break;
        case 'EUR':
            book.listPrice.currencyCode = '€'
            break;
        case 'ILS':
            book.listPrice.currencyCode = '₪'
            break;

    }

    return (
        <article className="book-preview" >
            <h3>{book.title}</h3>
            <Link to={`/book/${book.id}`}>
                <img src={book.thumbnail} />
            </Link>
            <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <p>{book.authors}</p>
            <Link to={`/book/${book.id}`}> Details
            </Link>

        </article>
    )

}