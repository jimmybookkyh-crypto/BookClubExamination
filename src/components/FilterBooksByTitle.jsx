import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function FilterBooksByTitle() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch("http://localhost:1337/api/books")

      .then((res) => res.json())

      .then((data) => {

        //console.log(data.data);

        setBooks(data.data);

      });

  }, []);

  // filtrera böcker
  const filteredBooks = books.filter((book) => {

    return book.attributes.title
      .toLowerCase()
      .includes(search.toLowerCase());

  });

  // sortera alfabetiskt
  const sortedBooks = [...filteredBooks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // gruppera alfabetiskt
  const groupedBooks = sortedBooks.reduce((groups, book) => {

    const firstLetter = book.attributes.title[0].toUpperCase();

    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }

    groups[firstLetter].push(book);

    return groups;

  }, {});

  return (

    <div>

      <input
        type="text"
        placeholder="Sök boktitel..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchbar"
      />
      <pre>
  {JSON.stringify(books, null, 2)}
</pre>

      <br />
      <br />

      {Object.entries(groupedBooks).map(([letter, books]) => (

        <div key={letter}>

          <h2>{letter}</h2>

          {books.map((book) => (

            <div key={book.id}>

              <NavLink to={`/books/${book.documentId}`}>
                {book.attributes.title}
              </NavLink>

            </div>

          ))}

        </div>

      ))}

    </div>

  );
}