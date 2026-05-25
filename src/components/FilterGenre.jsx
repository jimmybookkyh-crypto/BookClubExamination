import { useEffect, useState } from "react";

export default function FilterGenre() {

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

  // filtrera genre
  const filteredBooks = books.filter((book) => {

    if (!selectedLetter) return false;

    return book.attributes.genre
      ?.toUpperCase()
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

      {/* resultat */}
      {filteredBooks.map((book) => (

        <div key={book.id}>

          <h3>
            {book.attributes.genre}
          </h3>

          <p>
            {book.attributes.title}
          </p>

        </div>

      ))}

    </div>

  );
}