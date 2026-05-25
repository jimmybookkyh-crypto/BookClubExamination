import FilterGenre from "../components/FilterGenre";

export default function FilterGenrePage() {

  return (
    <div>

      <h1>
        Filtrera efter genre
      </h1>

      <FilterGenre />

    </div>
  );
}

FilterGenrePage.route = {
  path: "/filter-genre",
  index: 3,
};