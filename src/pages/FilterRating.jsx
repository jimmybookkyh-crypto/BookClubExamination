import { useState } from "react";
import { useNavigate } from "react-router";
import Pagination from "../components/Pagination";

FilterRating.route = {
  path: "/filter-rating",
};

const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;

export default function FilterRating() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [selectedStars, setSelectedStars] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const stars = [1, 2, 3, 4, 5];

  const pageCount = Math.ceil(reviews.length / PAGE_SIZE) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleReviews = reviews.slice(startIndex, startIndex + PAGE_SIZE);

  function fetchByRating(star) {
    setSelectedStars(star);
    setPage(1);
    setLoading(true);

    fetch(`${STRAPI_URL}/api/reviews/rating/${star}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data ?? []);
        setLoading(false);
      });
  }

  return (
    <div>
      <h2>Filtrera efter betyg</h2>

      <select
        className="filter-option"
        value={selectedStars}
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

      {loading && <p>Laddar...</p>}

      <section className="books">
        {visibleReviews.map((review) => {
          const image = review.book?.image;
          const imageUrl = image?.formats?.small?.url || image?.url;
          const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

          return (
            <div key={review.id} className="book-card">
              {fullImageUrl && (
                <img src={fullImageUrl} alt={review.book?.title} />
              )}

              <h2>{review.book?.title}</h2>

              <p className="subtitle">
                {review.book?.author?.firstName}{" "}
                {review.book?.author?.lastName}
              </p>

              <p className="desc">
                <b>Recension:</b> {review.content?.[0]?.children?.[0]?.text}
              </p>

              <p className="tagname">
                {review.user?.username}
              </p>

              <button
                onClick={() => navigate(`/one-book/${review.book?.documentId}`)}
              >
                Läs mer
              </button>
            </div>
          );
        })}
      </section>

      {selectedStars && reviews.length > 0 && (
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}
    </div>
  );
}
