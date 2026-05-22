import useFetch from "../utils/useFetch";
import { useNavigate, useParams } from "react-router";
import CreateReview from "../pages/CreateReview";

const STRAPI_URL = "http://localhost:5001";

export default function GetAllReviews() {
  const { documentId } = useParams();
  const [reviews, loading] = useFetch(`/api/reviews?filters[book][documentId][$eq]=${documentId}`);
  const navigate = useNavigate();


    if (loading) {
      return <p>Laddar recensioner...</p>;
    }

    return (
      <section className="reviews">

  {reviews.map(({ documentId, content, rating }) => (
    <article key={documentId}>
      <p>{content?.[0]?.children?.[0]?.text}</p>
      <p>{rating}</p>
    </article>
  ))}
          
        <button onClick={() => navigate("/create-review")}>
          Skriv din recension
        </button>

</section>
        );
  }

