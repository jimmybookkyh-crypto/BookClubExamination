import useFetch from "../utils/useFetch";
import buildBooksUrl from "../utils/buildBooksUrl";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import { useEffect, useState, useMemo } from "react";

const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;

export default function GetAllBooks({ search, shuffle = false }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const url = buildBooksUrl(search, page, PAGE_SIZE);

  const [books, loading, update] = useFetch(url);
  const bookList = books?.data ?? [];

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    update();
  }, [search, page]);

const displayedBooks = useMemo(() => {
  const list = Array.isArray(books) ? books : [];

  if (!shuffle) return list;

  return [...list].sort(() => Math.random() - 0.5);
}, [books, shuffle]);

  if (loading) {
    return <p>Laddar böcker...</p>;
  }

  if (!loading && books.length === 0) {
    return (
      <p>
        Tyvärr hittade vi inga böcker för din sökning. Försök igen 📚
      </p>
    );
  }

  const pageCount = books.pagination?.pageCount || 1;

  return (
    <>
      <section className="books">
        {displayedBooks.map(
          ({ documentId, image, title, author, genre }) => {
            const imageUrl =
              image && (image.formats?.small?.url || image.url);

            const fullImageUrl = imageUrl
              ? `${STRAPI_URL}${imageUrl}`
              : null;

            return (
              <div key={documentId} className="book-card">
                {fullImageUrl && (
                  <img src={fullImageUrl} alt={title} />
                )}

                <h2 className="title">{title}</h2>

                <p className="subtitle">
                  {author?.firstName} {author?.lastName}
                </p>

                <p className="tagname">
                  {genre?.name}
                </p>

                <button
                  onClick={() =>
                    navigate(`/one-book/${documentId}`)
                  }
                >
                  Läs mer
                </button>
              </div>
            );
          }
        )}
      </section>

      <Pagination
        page={page}
        pageCount={pageCount}
        setPage={setPage}
      />
    </>
  );
}