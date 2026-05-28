import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import buildBooksUrl from "../utils/buildBooksUrl";


FilterYear.route = {
  path: "/filter-year",
};


const STRAPI_URL = "http://localhost:5001";
const PAGE_SIZE = 16;


export default function FilterYear({search}) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState("");
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


        setBooks(data.data ?? []).sort((a, b) => a.year - b.year);
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


      <select className="filer-option" value={year} onChange={handleChange}>
        <option value="">-- Välj år --</option>


        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>


            {/* resultat */}
      {loading && <p>Laddar...</p>}


      {books.map((book) => {
        const image = book.image;
        const imageUrl =
          image?.formats?.small?.url || image?.url;


        const fullImageUrl = imageUrl
          ? `${STRAPI_URL}${imageUrl}`
          : null;


        return (
          <div key={book.id} className="book">
            <p>Utgivningsår: {book.year}</p>


            {fullImageUrl && (
              <img
                src={fullImageUrl}
                alt={book.title}
              />
            )}
            <h3>{book.title}</h3>
            <p>
              Författare:
              {book.author?.firstName}{" "}
              {book.author?.lastName}
            </p>
            {/* <p>Recension: {review.content?.[0]?.children?.[0]?.text}</p>
            <p>Skriven av: {review.user?.username}</p>*/}
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
