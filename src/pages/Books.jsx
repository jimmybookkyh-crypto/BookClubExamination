import GetAllBooks from "../components/GetAllBooks";

export default function Books() {
  return (
    <div>
      <h1>Böcker</h1>
      <GetAllBooks />
    </div>
  );
}

export const route = {
  path: "/books",
  label: "Böcker",
  index: 2
};