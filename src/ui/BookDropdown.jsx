import { NavLink } from "react-router";
import { useState } from "react";

export default function BookDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="dropdown-title">
        Böcker ▾
      </span>

      {open && (
        <div className="dropdown-menu">
          <NavLink to="/books">Alla böcker</NavLink>
          <NavLink to="/books/categories">Kategorier</NavLink>
          <NavLink to="/books/favorites">Favoriter</NavLink>
        </div>
      )}
    </div>
  );
}