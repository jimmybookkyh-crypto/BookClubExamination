import useFetch from "../utils/useFetch";
import { useParams } from "react-router";
import { useState } from "react";
import GetAllReviews from "../components/GetAllReviews";
import CreateReview from "../components/CreateReview";

GetOneBook.route = {
  path: "/one-book/:documentId",
  index: 8,
};

const STRAPI_URL = "http://localhost:5001";

export default function GetOneBook({ user, setUser }) {
  const { documentId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);

  const [book, loading] = useFetch(`/api/books/${documentId}?populate=*`);

  if (loading) {
    return <p>Laddar bok...</p>;
  }

  const { image, title, author, genre, description } = book || {};

  const fullImageUrl = image?.formats?.small?.url
    ? `${STRAPI_URL}${image.formats.small.url}`
    : image?.url
      ? `${STRAPI_URL}${image.url}`
      : null;

  return (
    <>
      <section className="book">
        {fullImageUrl && (
          <img src={fullImageUrl} alt={title} className="image" />
        )}
        <h2 className="title">{title}</h2>
        <p className="subtitle">
          {author?.firstName} {author?.lastName}
        </p>
        <p className="tagname"> {genre?.name}</p>
        <p>{book.year}</p>
        <p className="desc">
          <b>Beskrivning:</b> <br /> {description?.[0]?.children?.[0]?.text}
        </p>
        <article className="review-section">
          <h2>Recensioner</h2>
          <GetAllReviews key={refreshKey} />

          <CreateReview
            user={user}
            setUser={setUser}
            onReviewCreated={() => setRefreshKey((k) => k + 1)}
          />
        </article>
      </section>
    </>
  );
}
