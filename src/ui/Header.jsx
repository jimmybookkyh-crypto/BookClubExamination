import routes from "../routes";
import { NavLink } from "react-router";

export default function Header({ user, setuser }) {
  
  function logout() {
    delete localStorage.user;
    setuser(null);
  }

  return (
    <header>
      <h1>Librum Legere Bookclub</h1>
      <nav>
        {routes
          .filter((x) => x.label)
          .map(({ path, label }) => (
            <NavLink to={path} key={path}>
              {label}
            </NavLink>
          ))}
      </nav>
      <div className="auth">
        {user ? <>
          Inloggad som <NavLink to="/profile"><b>{user.user.username}</b></NavLink>
          &nbsp;&nbsp;
          <button onClick={logout}>Logga ut</button>
        </>
          : <>
          <NavLink to="/login">Logga in</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/register">Skapa konto</NavLink>          </>
          
        }
      </div>
    </header>
  );
}
