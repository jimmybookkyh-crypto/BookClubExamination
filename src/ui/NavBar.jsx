import routes from "../routes";
import { NavLink, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import SearchBar from "./SearchBar";
import BookDropdown from "./BookDropdown";

export default function NavBar({ user, setUser }) {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const showSearchBar =
    location.pathname === "/" || location.pathname.startsWith("/one-book/");

  function logout() {
    delete localStorage.user;
    setUser(null);
  }

  /* när söket skickas */
  function handleSearchSubmit(event) {
    event.preventDefault();

    /* om sökrutan är tom - gör inget */
    if (!search.trim()) return;

    /* skicka användaren till search-sidan */
    navigate(`/?query=${search}`);
  }

  return (
    <nav>
      {routes
        .filter((x) => x.label)
        .map(({ path, label }) => (
          <NavLink to={path} key={path} onClick={() => setSearch("")}>
            {label}
          </NavLink>
        ))}
      <BookDropdown user={user} />

      {showSearchBar && (
        <form onSubmit={handleSearchSubmit}>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      )}

      <div className="auth">
        {user ? (
          <>
            Inloggad som{" "}
            <NavLink to="/profile">
              <b>{user.user.username}</b>
            </NavLink>
            &nbsp;&nbsp;
            <button onClick={logout}>Logga ut</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Logga in</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/register">Skapa konto</NavLink>{" "}
          </>
        )}
      </div>
    </nav>
  );
}
