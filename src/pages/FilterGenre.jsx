import { useState, useEffect } from "react";

FilterGenre.route = {
  path: '/filter-genre'
}

const STRAPI_URL = "http://localhost:5001";

export default function FilterGenre() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  // Hämta alla genres vid sidladdning
  useEffect(() => {
    fetch(`${STRAPI_URL}/api/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data.data));
  }, []);

  function fetchByGenre(selectedGenre) {
    setLoading(true);
    fetch(`${STRAPI_URL}/api/books/genre/${selectedGenre}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Bok-svar från Strapi:", data);
        setGenres(data.data ?? []); 
        setLoading(false);
      });
  }

  function handleChange(e) {
    const selected = e.target.value;
    setGenre(selected);
    if (selected) fetchByGenre(selected);
  }

  return (
    <div>
      <select value={genre} onChange={handleChange}>
        <option value="">-- Välj genre --</option>
        {genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      {loading && <p>Laddar...</p>}

      {genres.map((book) => (
        <div key={book.id}>
          <p>{book.title}</p>
          <p>Genre: {book.genre?.name}</p>
          <p>Författare: {book.author?.name}</p>
        </div>
      ))}
    </div>
  );
}