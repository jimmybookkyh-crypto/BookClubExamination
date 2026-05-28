import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Pagination from "../components/Pagination";

FilterGenre.route = {
  path: "/filter-genre",
};

const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;

export default function FilterGenre() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(books.length / PAGE_SIZE) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleBooks = books.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/genres`)
      .then((res) => res.json())
      .then((data) =>
        setGenres(data.data.sort((a, b) => a.name.localeCompare(b.name))),
      );
  }, []);

  function fetchByGenre(selectedGenre) {
    setLoading(true);

    fetch(`${STRAPI_URL}/api/books/genre/${selectedGenre}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(
          (data.data ?? []).sort((a, b) => a.title.localeCompare(b.title)),
        );
        setPage(1);
        setLoading(false);
      });
  }

  function handleChange(e) {
    const selected = e.target.value;
    setGenre(selected);
    setPage(1);

    if (selected) fetchByGenre(selected);
    else setBooks([]);
  }

  return (
    <div>
      <h2>Filtrera efter genre</h2>

      <select className="filter-option" value={genre} onChange={handleChange}>
        <option value="">-- Välj genre --</option>
        {genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      {loading && <p>Laddar...</p>}

      <section className="books">
        {visibleBooks.map((book) => {
          const image = book?.image;
          const imageUrl = image?.formats?.small?.url || image?.url;
          const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

          return (
            <div key={book.documentId} className="book-card">
              {fullImageUrl && <img src={fullImageUrl} alt={book?.title} />}

              <h3>{book.title}</h3>

              <p>
                <b>Författare:</b> {book.author?.firstName}{" "}
                {book.author?.lastName}
              </p>

              <p>
                <b>Utgivningsår:</b> {book.year}
              </p>

              <button onClick={() => navigate(`/one-book/${book.documentId}`)}>
                Läs mer
              </button>
            </div>
          );
        })}
      </section>

      {genre && books.length > 0 && (
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}
    </div>
  );
}
