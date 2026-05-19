import useFetch from "../utils/useFetch";

export default function BookCard() {
  const [books, loading] = useFetch("/api/books");

  if (loading) {
    return <p>Laddar böcker...</p>;
  }

  return (
    <section className="books">
      {books.map(({ documentId, image, title, author, genre, description }) => {
        const imageUrl = image && (image.formats?.thumbnail?.url || image.url);

        return (
          <div key={documentId} className="book">
            {imageUrl && <img src={imageUrl} alt={title} />}
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{genre}</p>
            <p>{description[0]?.children[0]?.text}</p>
          </div>
        );
      })}
    </section>
  );
}
