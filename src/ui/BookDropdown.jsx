import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function BookDropdown({ user }) {

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

          <NavLink to="/books">
            Alla böcker
          </NavLink>

          <NavLink to="/filter-by-title">
            Filtrera efter titel
          </NavLink>

          {user ? (

            <NavLink to="/create-book">
              Skapa bok
            </NavLink>

          ) : (

            <NavLink to="/login">
              Logga in
            </NavLink>

          )}

        </div>

      )}

    </div>
  );
}