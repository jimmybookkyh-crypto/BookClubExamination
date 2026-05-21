import { useSearchParams } from "react-router";
import useFetch from "../utils/useFetch";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const url = `/api/books?filters[title][$containsi]=${query}&populate=*`;

  const [books, loading] = useFetch(url);

  return (
    <>
      <h1>Sökresultat</h1>

      {loading ? <p>Laddar...</p> : null}

      {books?.map((book) => (
        <p key={book.documentId}>{book.title}</p>
      ))}
    </>
  );
}

SearchResults.route = {
  path: "/search",
  label: null,
  index: 99,
};
