import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Hamburger size={28} toggled={open} toggle={setOpen} />
      {open === true && (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Games">Games</Link>
          </li>
          <li>
            <Link to="/Lots">Lots</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
