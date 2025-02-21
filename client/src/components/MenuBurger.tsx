import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
  pseudo: string;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

interface AuthProps {
  auth: Auth | null;
}

export default function Menu({ auth }: AuthProps) {
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
            <Link to="/About">A propos</Link>
          </li>
          <li>
            <Link to="/Games">Jeux</Link>
          </li>
          <li>
            <Link to="/Lots">Lots</Link>
          </li>
          {auth === null && (
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          )}
          {auth !== null && (
            <li>
              <Link to="/account">Compte</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
