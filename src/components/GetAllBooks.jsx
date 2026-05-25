import useFetch from "../utils/useFetch";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const STRAPI_URL = "http://localhost:5001";

export default function GetAllBooks({ search }) {
  const url = search?.trim()
    ? `/api/books/search/${search}`
    : "/api/books?populate=*";

  console.log("SEARCH:", search);
  console.log("URL:", url);

  const [books, loading, update] = useFetch(url);
  const navigate = useNavigate();

  useEffect(() => {
    update();
  }, [search]);

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
            <div>
              <h4>Författare: </h4>
              {author?.firstName} {author?.lastName}
            </div>
            <div>
              <h4>Kategori: </h4>
              {genre?.name}
            </div>
            <div>
              <h4>Kort beskrivning: </h4>
              {description?.[0]?.children?.[0]?.text}
            </div>
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
