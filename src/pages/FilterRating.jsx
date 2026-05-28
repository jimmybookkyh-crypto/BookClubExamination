import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import buildBooksUrl from "../utils/buildBooksUrl";


FilterRating.route = {
  path: "/filter-rating",
};


const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;


export default function FilterRating({search}) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [selectedStars, setSelectedStars] = useState(null);
  const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
   
    const url = buildBooksUrl(search, page, PAGE_SIZE);
 
      //pagination
      useEffect(() => {
      setPage(1);
    }, [search]);
 
    useEffect(() => {
    }, [search, page]);
 
    const pageCount = reviews.pagination?.pageCount || 1;
 
    function changePage(add) {
      setPage(page + add);
      scrollTo(0, 0);
    }


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
      <h2>Filtrera efter betyg</h2>
      <select
      className="filter-option"
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


      {reviews.map((review) => {
        const image = review.book?.image;
        const imageUrl = image?.formats?.small?.url || image?.url;
        const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;


        return (
          <div key={review.id} className="book">
            {fullImageUrl && (
              <img src={fullImageUrl} alt={review.book?.title} />
            )}
            <h3>{review.book?.title}</h3>
            <p>
              Författare: {review.book?.author?.firstName}{" "}
              {review.book?.author?.lastName}
            </p>
            <p>Recension: {review.content?.[0]?.children?.[0]?.text}</p>
            <p>Skriven av: {review.user?.username}</p>
            <button
              onClick={() => navigate(`/one-book/${review.book?.documentId}`)}
            >
              Läs mer
            </button>
          </div>
        );
      })}
      {!search?.trim() && (
        <p>
          <button disabled={page <= 1} onClick={() => changePage(-1)}>
            Föregående sida
          </button>
          &nbsp;
          <b>
            Sida {page}/{pageCount}
          </b>
          &nbsp;
          <button disabled={page >= pageCount} onClick={() => changePage(1)}>
            Nästa sida
          </button>
        </p>
      )}
     
    </div>
  );
}
