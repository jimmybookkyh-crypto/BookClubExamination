import { useEffect, useState } from "react";

export default function FilterYear() {

  const [books, setBooks] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");

  const years = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
  ];

  useEffect(() => {

    fetch("http://localhost:5001/api/books")

      .then((res) => res.json())

      .then((data) => {

        setBooks(data.data);

      });

  }, []);

  const filteredBooks = books.filter((book) => {

    if (!selectedLetter) return false;

    return String(book.attributes.year)
      .startsWith(selectedLetter);

  });

  return (

    <div>

      <div className="alphabet-list">

        {years.map((year) => (

          <button
            key={year}
            onClick={() => setSelectedLetter(year)}
          >
            {year}
          </button>

        ))}

      </div>

      {filteredBooks.map((book) => (

        <div key={book.id}>

          <h3>
            {book.attributes.year}
          </h3>

          <p>
            {book.attributes.title}
          </p>

        </div>

      ))}

    </div>

  );
}