import useFetch from "../utils/useFetch";
import { useParams } from "react-router";
import GetAllReviews from "../components/GetAllReviews";
import CreateReview from "../components/CreateReview";

GetOneBook.route = {
  path: "/one-book/:documentId",
  index: 8,
};

const STRAPI_URL = "http://localhost:5001";

export default function GetOneBook({ user, setUser }) {
  const { documentId } = useParams();

  const [book, loading] = useFetch(`/api/books/${documentId}?populate=*`);

  if (loading) {
    return <p>Laddar bok...</p>;
  }

  const { image, title, author, genre, description } = book || {};

  const fullImageUrl = image?.url ? `${STRAPI_URL}${image.url}` : null;

  return (
    <>
      <section className="book">
        {fullImageUrl && <img src={fullImageUrl} alt={title} />}
        <h3>{title}</h3>
        <p>
          Författare: {author?.firstName} {author?.lastName}
        </p>
        <br />
        <p>
          {" "}
          Kategori:
          {genre?.name}
        </p>
        <br />
        <p>
          Kort beskrvning om boken:
          {description?.[0]?.children?.[0]?.text}
        </p>
      </section>
      <br />
      <h2>Resencioner</h2>
      <GetAllReviews />
      <br />
      <CreateReview />
    </>
  );
}
