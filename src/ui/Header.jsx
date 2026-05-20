import Navbar from "./Navbar";

export default function Header({ user, setUser }) {
  return (
    <header>
      <h1>Librum Legere Bookclub</h1>

      <Navbar user={user} setUser={setUser} />
    </header>
  );
}
