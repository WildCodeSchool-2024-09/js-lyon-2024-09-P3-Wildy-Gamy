import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./GameDetail.css";

interface gameProps {
  id: number;
  name: string;
  principle: string;
  in_room: number;
  is_playable: number;
  image: string;
}

function GameDetail() {
  const { theme } = useTheme();
  const { id } = useParams();
  const [game, setGame] = useState(null as null | gameProps);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  }, [id]);
  return (
    game && (
      <div className={`${theme}`}>
        <figure className="detail">
          <h2>{game.name}</h2>
          <figure className="ensemble">
            <h3>Explication du jeu</h3>
            <p>{game.principle}</p>
          </figure>
          <img className="gameimg" src={game.image} alt={game.name} />
          {game.in_room === 0 ? (
            <p>Bientôt dans vos salles</p>
          ) : (
            <p>Déjà dans vos salles</p>
          )}
          {game.is_playable === 0 ? (
            <p>Bientôt jouable en salle</p>
          ) : (
            <Link to={`/${game.name}`} className="playButton">
              Jouer
            </Link>
          )}
        </figure>
      </div>
    )
  );
}

export default GameDetail;
