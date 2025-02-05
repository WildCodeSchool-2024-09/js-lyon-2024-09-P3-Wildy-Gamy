import { useEffect, useState } from "react";
import GameList from "../../components/GameList";
import "./GamesList.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useOutletContext } from "react-router-dom";

type User = {
  id: number;
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
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

interface gameProps {
  id: number;
  name: string;
  principle: string;
  in_room: number;
  is_playable: number;
  image: string;
}

function FavoritesList() {
  const { auth } = useOutletContext<AuthProps>();
  const [games, setGames] = useState([] as [] | gameProps[]);

  const id = new URLSearchParams({
    id_user: `${auth?.user.id}`,
  }).toString();
  if (auth != null && auth.user.id !== null) {
    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/allfavorites?${id}`)
        .then((response) => response.json())
        .then((data) => {
          setGames(data);
        });
    }, [id]);
  }

  return (
    <>
      {auth === null ? (
        <p>Connectez-vous pour pouvoir faire une liste de vos jeux favoris</p>
      ) : games.length === 0 ? (
        <p key="">Pas encore de jeux dans vos favoris</p>
      ) : (
        <Carousel>
          {games.map((game) => (
            <article className="elemCar" key={game.id}>
              <GameList data={game} />
            </article>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default FavoritesList;
