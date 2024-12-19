import { useEffect, useState } from "react";
import GameList from "../components/GameList";
import Input from "../components/Input";
import "./GamesList.css";

interface gameProps {
  id: number;
  name: string;
  principle: string;
  in_room: number;
  is_playable: number;
  image: string;
}

function GamesList() {
  const [games, setGames] = useState([] as [] | gameProps[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <>
      <Input setGames={setGames} games={games} />
      <div className="list">
        {games.length === 0 ? (
          <p>Il n'y a pas de jeux pour l'instant</p>
        ) : (
          games.map((game) => (
            <article key={game.id}>
              <GameList data={game} />
            </article>
          ))
        )}
      </div>
    </>
  );
}

export default GamesList;
