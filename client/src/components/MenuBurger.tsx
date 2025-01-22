import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
  id: number;
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
          {auth !== null && (
            <li>
              <Link to="/account">Account</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
