import FilterRating from "../components/FilterRating";

export default function FilterRatingPage() {

  return (
    <div>

      <h1>
        Filtrera efter recension
      </h1>

      <FilterRating />

    </div>
  );
}

FilterRatingPage.route = {
  path: "/filter-rating",
  index: 4,
};