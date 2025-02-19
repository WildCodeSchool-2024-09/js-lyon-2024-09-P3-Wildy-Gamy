import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./GameDetail.css";
import emptyHeart from "../../assets/images/empty-heart.png";
import fleche from "../../assets/images/fleche.png";
import fullHeart from "../../assets/images/full-heart.png";

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

function GameDetail() {
  const { auth } = useOutletContext<AuthProps>();
  const { theme } = useTheme();
  const token = auth?.token;
  const { id } = useParams();
  const [game, setGame] = useState(null as null | gameProps);
  const [fav, setFav] = useState(0 as number);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
      });
  }, [id]);

  const params = new URLSearchParams({
    id_game: `${id}`,
  }).toString();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/favorite?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFav(data.is_fav);
      });
  }, [params, token]);

  const HandleClick = () => {
    let newFav = false;
    if (fav === 0) {
      setFav(1);
      newFav = true;
    } else {
      setFav(0);
      newFav = false;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/favorite`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        is_fav: newFav,
        id_game: id,
      }),
    });
  };

  return (
    game && (
      <div className={`${theme}`}>
        <Link to="/games" className="return">
          <img src={fleche} alt="Retourner voir plus de jeux" />
        </Link>
        <figure className="detail">
          <h2>{game.name}</h2>
          <figure className="ensemble">
            <h3>Explication du jeu</h3>
            <p>{game.principle}</p>
          </figure>

          {auth !== null &&
            (fav === 1 ? (
              <section className="ensemble">
                <p>Un de vos jeux favoris!</p>
                <button type="button" onClick={HandleClick}>
                  <img src={fullHeart} alt="full heart" />
                </button>
              </section>
            ) : (
              <section className="ensemble">
                <p>Ce jeu ne fait pas parti de vos favoris.</p>
                <button type="button" onClick={HandleClick}>
                  <img src={emptyHeart} alt="empty heart" />
                </button>
              </section>
            ))}
          {game.is_playable === 0 ? (
            <p>Bientôt jouable en salle</p>
          ) : (
            <Link to={`/${game.name}`} className="button-24">
              Jouer
            </Link>
          )}
          <img className="gameimg" src={game.image} alt={game.name} />

          {game.in_room === 0 ? (
            <p>Bientôt dans vos salles</p>
          ) : (
            <p>Déjà dans vos salles</p>
          )}
        </figure>
      </div>
    )
  );
}

export default GameDetail;
