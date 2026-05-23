import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function BookDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={() => setOpen(!open)}
      >
        Böcker ▾
      </button>

      {open && (
        <div className="dropdown-content">
          <NavLink to="/books">Alla böcker</NavLink>
          <NavLink to="/categories">Kategorier</NavLink>
          <NavLink to="/favorites">Favoriter</NavLink>
        </div>
      )}
    </div>
  );
}