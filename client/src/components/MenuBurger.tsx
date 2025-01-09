import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface gameProps {
  id: number;
  name: string;
}

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [listGames, setListGames] = useState<gameProps[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((res) => res.json())
      .then((data) => {
        setListGames(data);
      });
  }, []);
  return (
    <div>
      <Hamburger size={28} toggled={open} toggle={setOpen} />
      {open === true && (
        <ul>
          <li>
            <Link to="/Accueil">Accueil</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Games">Games</Link>
          </li>
          {listGames.map((game) => (
            <li key={game.id}>
              <Link to={`/Game/${game.id}`}>Page {game.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
