import routes from "../routes";
import { NavLink } from "react-router";
import SearchBar from "./SearchBar";

export default function NavBar({ user, setUser }) {
  function logout() {
    delete localStorage.user;
    setUser(null);
  }

  return (
    <nav>
      {routes
        .filter((x) => x.label)
        .map(({ path, label }) => (
          <NavLink to={path} key={path}>
            {label}
          </NavLink>
        ))}

      <SearchBar />

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
