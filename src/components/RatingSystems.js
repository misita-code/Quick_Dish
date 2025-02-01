import React, { useState } from 'react';

const ReviewsAndRatings = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  // Handle submitting a new review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.trim() && rating > 0) {
      const review = {
        id: Date.now(),
        text: newReview,
        rating: rating,
        date: new Date().toLocaleDateString(),
      };
      setReviews([...reviews, review]);
      setNewReview('');
      setRating(0);
      // Here you can also send the review to your backend API
      console.log('Review submitted:', review);
    }
  };

  return (
    <div className="reviews-ratings">
      <h3>Reviews & Ratings</h3>

      {/* Display existing reviews */}
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <p>{review.text}</p>
              <div className="rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <small>{review.date}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Add a new review */}
      <form onSubmit={handleSubmitReview} className="add-review">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <div className="rating-input">
          <label>Rating:</label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewsAndRatings;