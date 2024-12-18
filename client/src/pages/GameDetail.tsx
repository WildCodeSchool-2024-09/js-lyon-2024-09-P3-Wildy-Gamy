import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
          <p>Jouez-y dès maintenant</p>
        )}
      </figure>
    )
  );
}

export default GameDetail;
