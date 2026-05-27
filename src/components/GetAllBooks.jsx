import useFetch from "../utils/useFetch";
import buildBooksUrl from "../utils/buildBooksUrl";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;

export default function GetAllBooks({ search }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const url = buildBooksUrl(search, page, PAGE_SIZE);

  const [books, loading, update] = useFetch(url);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    update();
  }, [search, page]);

  if (loading) {
    return <p>Laddar böcker...</p>;
  }

  if (!loading && books.length === 0) {
    return <p>Tyvärr hittade vi inga böcker för din sökning. Försök igen 📚</p>;
  }

  const pageCount = books.pagination?.pageCount || 1;

  return (
    <>
      <section className="books">
        {books.map(
          ({ documentId, image, title, author, genre, description }) => {
            const imageUrl = image && (image.formats?.small?.url || image.url);
            const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

            return (
              <div key={documentId} className="book-card">
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
          },
        )}
      </section>
      {!search?.trim() && (
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}
    </>
  );
}
