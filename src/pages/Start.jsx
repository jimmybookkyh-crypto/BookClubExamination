import BookCard from "../components/BookCard";

Start.route = {
  path: "/",
  label: "Start",
  index: 1,
};

console.log("testar routes");

export default function Start() {
  return (
    <>
      <h2>Welcome!</h2>
      <BookCard />
    </>
  );
}
