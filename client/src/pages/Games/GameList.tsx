import { useEffect, useState } from "react";
import GameList from "../../components/GameList";
import Input from "../../components/SearchInput/SearchInput";
import "./GamesList.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
      <Carousel>
        {games.length === 0
          ? [<p key="">Il n'y a pas de jeux pour l'instant</p>]
          : games.map((game) => (
              <article className="elemCar" key={game.id}>
                <GameList data={game} />
              </article>
            ))}
      </Carousel>
    </>
  );
}

export default GamesList;
