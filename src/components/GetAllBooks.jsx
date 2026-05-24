import useFetch from "../utils/useFetch";
import { useNavigate } from "react-router";

const STRAPI_URL = "http://localhost:5001";

export default function GetAllBooks() {
  const [books, loading] = useFetch("/api/books?populate=*");
  const navigate = useNavigate();

  if (loading) {
    return <p>Laddar böcker...</p>;
  }

  return (
    <section className="books">
      {books.map(({ documentId, image, title, author, genre, description }) => {
        const imageUrl = image && (image.formats?.small?.url || image.url);

        const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

        return (
          <div key={documentId} className="book">
            {fullImageUrl && <img src={fullImageUrl} alt={title} />}
            <h3>{title}</h3>
            <p>
              {" "}
              <h4>Författare: </h4>
              {author?.firstName} {author?.lastName}
            </p>
            <p>
              <h4>Kategori: </h4>
              {genre?.name}
            </p>
            <p>
              <h4>Kort beskrivning: </h4>
              {description?.[0]?.children?.[0]?.text}
            </p>
            <br />
            <button onClick={() => navigate(`/one-book/${documentId}`)}>
              Läs mer
            </button>
          </div>
        );
      })}
    </section>
  );
}
