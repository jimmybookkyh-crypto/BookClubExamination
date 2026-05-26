import { useState, useEffect } from "react";

FilterYear.route = {
  path: "/filter-year",
};

const STRAPI_URL = "http://localhost:5001";

export default function FilterYear() {
  const [books, setBooks] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  // Hämta alla år när sidan laddas
  useEffect(() => {
    fetch(`${STRAPI_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => {
        // Hämta ut alla years
        const allYears = data.data.map((book) => book.year);

        // Ta bort dubletter
        const uniqueYears = [...new Set(allYears)];

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

        setBooks(data.data ?? []);
        setLoading(false);
      });
  }

  // När man väljer ett år
  function handleChange(e) {
    const selected = e.target.value;

    setYear(selected);

    if (selected) {
      fetchByYear(selected);
    }
  }

  return (
    <div>
      <h2>Filtrera efter år</h2>

      <select value={year} onChange={handleChange}>
        <option value="">-- Välj år --</option>

        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {loading && <p>Laddar...</p>}

      {books.map((book) => (
        <div key={book.id}>
          <p>{book.title}</p>
          <p>Genre: {book.genre?.name}</p>
          <p>
            Författare: {book.author?.firstName}{" "}
            {book.author?.lastName}
          </p>
          <p>Utgivningsår: {book.year}</p>
        </div>
      ))}
    </div>
  );
}