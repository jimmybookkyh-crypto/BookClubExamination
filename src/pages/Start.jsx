import GetAllBooks from "../components/GetAllBooks";
import { useSearchParams } from "react-router";

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
      <h2>Welcome!</h2>
      <GetAllBooks search={search} />
    </>
  );
}
