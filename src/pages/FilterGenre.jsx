import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import buildBooksUrl from "../utils/buildBooksUrl";


FilterGenre.route = {
  path: '/filter-genre'
}


const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;


export default function FilterGenre({ search }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
 
  const url = buildBooksUrl(search, page, PAGE_SIZE);


    //pagination
    useEffect(() => {
    setPage(1);
  }, [search]);


  useEffect(() => {
  }, [search, page]);


  const pageCount = books.pagination?.pageCount || 1;


  function changePage(add) {
    setPage(page + add);
    scrollTo(0, 0);
  }


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
          <button
              onClick={() => navigate(`/one-book/${book.documentId}`)}
            >
              Läs mer
            </button>
        </div>
        );
      })}
            {!search?.trim() && (
        <p>
          <button disabled={page <= 1} onClick={() => changePage(-1)}>
            Föregående sida
          </button>
          &nbsp;
          <b>
            Sida {page}/{pageCount}
          </b>
          &nbsp;
          <button disabled={page >= pageCount} onClick={() => changePage(1)}>
            Nästa sida
          </button>
        </p>
      )}
     
    </div>
  );
}
