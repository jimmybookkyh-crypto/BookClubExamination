import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Pagination from "../components/Pagination";

FilterYear.route = {
  path: "/filter-year",
};

const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;

export default function FilterYear() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // pagination
  const pageCount = Math.ceil(books.length / PAGE_SIZE) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const visibleBooks = books.slice(startIndex, startIndex + PAGE_SIZE);

  // Hämta alla år när sidan laddas
  useEffect(() => {
    fetch(`${STRAPI_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => {
        // Hämta ut alla years
        const allYears = data.data.map((book) => book.year);

        // Ta bort dubletter
        const uniqueYears = [...new Set(allYears)].sort((a, b) => a - b);

        setYears(uniqueYears);
      });
  }, []);

  // Hämta böcker baserat på year
  function fetchByYear(selectedYear) {
    setLoading(true);

    fetch(`${STRAPI_URL}/api/books/year/${selectedYear}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Books from Strapi:", data);

        setBooks(
          (data.data ?? []).sort((a, b) => a.title.localeCompare(b.title)),
        );
        setPage(1);
        setLoading(false);
      });
  }

  // När man väljer ett år
  function handleChange(e) {
    const selected = e.target.value;

    setYear(selected);
    setPage(1);

    if (selected) {
      fetchByYear(selected);
    } else {
      setBooks([]);
    }
  }

  return (
    <div>
      <h2>Filtrera efter år</h2>

      <select className="filter-option" value={year} onChange={handleChange}>
        <option value="">-- Välj år --</option>

        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* resultat */}
      {loading && <p>Laddar...</p>}

      <section className="books">
        {visibleBooks.map((book) => {
          const image = book.image;
          const imageUrl = image?.formats?.small?.url || image?.url;

          const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

          return (
            <div key={book.documentId} className="book-card">
              <p>Utgivningsår: {book.year}</p>

              {fullImageUrl && <img src={fullImageUrl} alt={book.title} />}

              <h3>{book.title}</h3>

              <p>
                Författare: {book.author?.firstName} {book.author?.lastName}
              </p>

              {/* <p>Recension: {review.content?.[0]?.children?.[0]?.text}</p>
              <p>Skriven av: {review.user?.username}</p>*/}

              <button onClick={() => navigate(`/one-book/${book.documentId}`)}>
                Läs mer
              </button>
            </div>
          );
        })}
      </section>

      {year && books.length > 0 && (
        <Pagination page={page} pageCount={pageCount} setPage={setPage} />
      )}
    </div>
  );
}
