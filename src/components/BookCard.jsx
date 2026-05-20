import useFetch from "../utils/useFetch";

const STRAPI_URL = "http://localhost:5001";

export default function BookCard() {
  const [books, loading] = useFetch("/api/books?populate=*");

  console.log(JSON.stringify(books, null, 2));

  if (loading) {
    return <p>Laddar böcker...</p>;
  }

  return (
    <section className="books">
      {books.map(({ documentId, image, title, author, genre, description }) => {
        const imageUrl = image && (image.formats?.small?.url || image.url);

        const fullImageUrl = imageUrl ? `${STRAPI_URL}${imageUrl}` : null;

        return (
          <div key={documentId} className="book">
            {fullImageUrl && <img src={fullImageUrl} alt={title} />}
            <h3>{title}</h3>
            <p>
              {author?.firstName} {author?.lastName}
            </p>
            <p>{genre?.name}</p>
            <p>{description[0]?.children[0]?.text}</p>
          </div>
        );
      })}
    </section>
  );
}
