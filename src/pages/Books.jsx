import GetAllBooks from "../components/GetAllBooks";

export default function Books() {
  return (
    <div>
      <h1>Böcker</h1>
      <GetAllBooks />
    </div>
  );
}

Books.route = {
  path: "/books",
  index: 2,
};