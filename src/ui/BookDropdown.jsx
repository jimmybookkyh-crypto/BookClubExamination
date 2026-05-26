import { NavLink } from "react-router";
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

          {user ? (

            <NavLink to="/create-book">
              Lägg till bok
            </NavLink>

          ) : (

            <NavLink to="/login">
              Logga in
            </NavLink>

          )}

          <NavLink to="/filter-genre">
            Filtrera efter genre
          </NavLink>

          <NavLink to="/filter-rating">
            Filtrera efter recension
          </NavLink>

          <NavLink to="/filter-year">
            Filtrera efter utgivningsår
          </NavLink>

        </div>

      )}

    </div>

  );
}