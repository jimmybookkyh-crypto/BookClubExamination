import GetAllBooks from "../components/GetAllBooks";
import { useSearchParams } from "react-router";
import heroImage from "../images/hero-books.jpg";

Start.route = {
  path: "/",
  label: "Start",
  index: 1,
};

console.log("testar routes");

export default function Start() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("query") || "";
  return (
    <>
      {!search && (
        <section className="hero">
          <img src={heroImage} alt="Books" />
          <div className="hero-overlay">
            <h2>Welcome!</h2>
            <p>Discover, review and share your favorite books</p>
          </div>
        </section>
      )}
      <GetAllBooks search={search} />
    </>
  );
}
