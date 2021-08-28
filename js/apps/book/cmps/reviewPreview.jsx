
export function ReviewPreview({ review ,onDeleteReview}) {

    return (
        <section className="preview-review">

            <h5>Name: {review.name}</h5>
            <p>Rating: {review.rating}</p>
            <p>Desc: {review.txt}</p>
            <p>{review.readAt}</p>
            <button onClick={()=>{onDeleteReview(review.id)}} >X</button>
        </section>
    )
}


