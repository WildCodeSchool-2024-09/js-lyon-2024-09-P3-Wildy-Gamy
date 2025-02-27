import { useEffect, useState } from "react";
import GameList from "../../components/GameList";
import Input from "../../components/SearchInput/SearchInput";
import "./GamesList.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link, useOutletContext } from "react-router-dom";

interface gameProps {
  id: number;
  name: string;
  principle: string;
  in_room: number;
  is_playable: number;
  image: string;
}

type User = {
  pseudo: string;
  email: string;
  is_admin: boolean;
  image: string;
};

type Auth = {
  user: User;
  token: string;
};

interface AuthProps {
  auth: Auth | null;
}

function GamesList() {
  const auth = useOutletContext<AuthProps>();
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
      {auth.auth !== null && (
        <figure className="linkTo">
          <Link className="ensemble" id="toListFav" to="/favorites">
            Lien vers vos jeux favoris!
          </Link>
        </figure>
      )}
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        thumbWidth={120}
        showIndicators={false}
        showStatus={false}
      >
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
