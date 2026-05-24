import FilterBooksByTitle from "../components/FilterBooksByTitle";

export default function FilterByTitle() {

  return (
    <div>

      <h1>
        Filtrera efter titel
      </h1>

      <FilterBooksByTitle />

    </div>
  );
}

FilterByTitle.route = {
  path: "/filter-by-title",
  index: 3,
};