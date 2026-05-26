import { useState } from "react";
import { useNavigate } from "react-router";

FilterRating.route = {
  path: "/filter-rating",
};

const STRAPI_URL = "http://localhost:5001";

export default function FilterRating() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [selectedStars, setSelectedStars] = useState(null);
  const [loading, setLoading] = useState(false);

  const stars = [1, 2, 3, 4, 5];

  function fetchByRating(star) {
    setSelectedStars(star);
    setLoading(true);

    fetch(`${STRAPI_URL}/api/reviews/rating/${star}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        setLoading(false);
      });
  }

  return (
    <div>
      <select
        value={selectedStars ?? ""}
        onChange={(e) => fetchByRating(e.target.value)}
      >
        <option value="" disabled>
          Välj betyg
        </option>
        {stars.map((star) => (
          <option key={star} value={star}>
            {star} ⭐
          </option>
        ))}
      </select>

      {/* resultat */}
      {loading && <p>Laddar...</p>}

      {reviews.map((review) => (
        <div key={review.id}>
          <p>Betyg: {review.rating}</p>
          <p>Bok: {review.book?.title}</p>
          <p>
            Författare: {review.book?.author?.firstName}
            {review.book?.author?.lastName}
          </p>
          <p>Recension: {review.content?.[0]?.children?.[0]?.text}</p>
          <p>Användare: {review.user?.username}</p>
          <button
            onClick={() => navigate(`/one-book/${review.book?.documentId}`)}
          >
            Läs mer
          </button>
          <br />
        </div>
      ))}
    </div>
  );
}
