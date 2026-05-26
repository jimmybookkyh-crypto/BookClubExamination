import FilterYear from "../components/FilterYear";

export default function FilterYearPage() {

  return (
    <div>

      <h1>
        Filtrera efter utgivningsår
      </h1>

      <FilterYear />

    </div>
  );
}

FilterYearPage.route = {
  path: "/filter-year",
  index: 5,
};