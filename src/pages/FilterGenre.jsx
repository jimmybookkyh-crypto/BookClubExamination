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
        setBooks(data.data ?? []); 
        setLoading(false);
      });
  }

  function handleChange(e) {
    const selected = e.target.value;
    setGenre(selected);
    if (selected) fetchByGenre(selected);
    else setBooks([]);
  }

  return (
    <div>
      <h2>Filtrera efter genre</h2>
      <select value={genre} onChange={handleChange}>
        <option value="">-- Välj genre --</option>
        {genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      {loading && <p>Laddar...</p>}

        {/* resultat */}
      {books.map((book) => {
        const image = book?.image;
        const imageUrl = image?.formats?.small?.url || image?.url;
        const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

        return (
        <div key={book.id}>
            {fullImageUrl && (
              <img src={fullImageUrl} alt={book?.title} />
            )}
          <h3>{book.title}</h3>
          <p><b>Författare:</b> {book.author?.firstName} {book.author?.lastName}</p>
          <p><b>Utgivingsår:</b> {book.year}</p>
          <br />
        </div>
        );
      })}
    </div>
  );
}