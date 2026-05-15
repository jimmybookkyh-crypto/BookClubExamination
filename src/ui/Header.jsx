import routes from "../routes";
import { NavLink } from "react-router";

export default function Header() {
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
    </header>
  );
}
