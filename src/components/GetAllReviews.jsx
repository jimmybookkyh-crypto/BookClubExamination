import useFetch from "../utils/useFetch";
import { useNavigate, useParams } from "react-router";
import CreateReview from "./CreateReview";

const STRAPI_URL = "http://localhost:5001";

export default function GetAllReviews() {
  const { documentId } = useParams();
  const [reviews, loading] = useFetch(
    `/api/reviews?populate[0]=user&filters[book][documentId][$eq]=${documentId}`
  );
  const navigate = useNavigate();

  if (loading) {
    return <p>Laddar recensioner...</p>;
  }
  if (!reviews?.length) {
    return <p>Det finns inga recensioner ännu.</p>;
  }

  return (
    <section className="reviews">
      {reviews.map(({ documentId, user, content, rating }) => (
        <article key={documentId}>
          <p>Skriven av: {user?.data?.username} </p>
          <p>Recension: {content?.[0]?.children?.[0]?.text}</p>
          <p>
            Betyg:
            {rating}
          </p>{" "}
          <br />
        </article>
      ))}
    </section>
  );
}
