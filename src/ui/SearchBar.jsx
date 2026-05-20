export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="searchbar"
      type="text"
      placeholder="Sök böcker..."
      value={value}
      onChange={onChange}
    />
  );
}
