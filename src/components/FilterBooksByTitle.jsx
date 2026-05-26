import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function FilterBooksByTitle() {

  const [books, setBooks] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

  useEffect(() => {

    fetch("http://localhost:5001/api/books")

      .then((res) => res.json())

      .then((data) => {

        setBooks(data.data);

      });

  }, []);

  // filtrera efter bokstav
  const filteredBooks = books.filter((book) => {

    if (!selectedLetter) return true;

    return book.title
      .toUpperCase()
      .startsWith(selectedLetter);

  });

  return (

    <div>

      {/* alfabet */}
      <div className="alphabet-list">

        {alphabet.map((letter) => (

          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </button>

        ))}

      </div>

      <br />

      {/* böcker */}
      {filteredBooks.map((book) => (

        <div key={book.id}>

          <NavLink to={`/books/${book.documentId}`}>
            {book.title}
          </NavLink>

        </div>

      ))}

    </div>

  );
}