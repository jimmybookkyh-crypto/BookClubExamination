import useFetch from "../utils/useFetch";
import { useParams } from "react-router";

const STRAPI_URL = "http://localhost:5001";

export default function GetOneBook() {
  const { documentId } = useParams();

  const [book, loading] = useFetch(`/api/books/${documentId}?populate=*`);


  if (loading) {
    return <p>Laddar bok...</p>;
  }

  const { image, title, author, genre, description } = book || {};

    const fullImageUrl = image?.url ? `${STRAPI_URL}${image.url}` : null;

      return (
      <section className="book">
            {fullImageUrl && (<img src={fullImageUrl} alt={title} />)}
            <h3>{title}</h3>
            <p>
              {author?.firstName} {author?.lastName}
            </p>
            <p>{genre?.name}</p>
          <p>{description?.[0]?.children?.[0]?.text}</p>
    </section>
  );
}