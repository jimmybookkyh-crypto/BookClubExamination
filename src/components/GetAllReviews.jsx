import useFetch from "../utils/useFetch";
import { useNavigate, useParams } from "react-router";
import GetOneBook from "./GetOneBook";

const STRAPI_URL = "http://localhost:5001";

export default function GetAllReviews() {
  const { documentId } = useParams();
  const [reviews, loading] = useFetch("/api/reviews");
  const navigate = useNavigate();

  async function sendForm(event) {
    event.preventDefault();

    const currentBook = books.find((book) => book.documentId === documentId);

    const response = await fetch("/api/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          content: formData.content,
          rating: formData.rating,

          book: documentId,
        },
      }),
    });

    if (loading) {
      return <p>Laddar resentioner...</p>;
    }

    return (
      <section className="reviews">
        return (
        <GetOneBook />
        <p>{content} </p>
        <p>{rating}</p>
        <button onClick={() => navigate(`/create-review/${documentId}`)}>
          Resentioner
        </button>
        );
      </section>
    );
  }
}
