import { ReviewPreview } from "./reviewPreview.jsx";

export function BookReviewsList ({reviews,onDeleteReview}) {

    
        return (
            <section className="book-reviews-list">
                {reviews.map(review => <ReviewPreview onDeleteReview={onDeleteReview} key={review.id} review={review} />)}
            </section>
        )
    }

