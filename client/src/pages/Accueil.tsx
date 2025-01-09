import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListeJeu from "../../src/assets/images/jeu.png";
import "./Accueil.css";

interface gameProps {
  id: number;
  name: string;
  image: string;
}

function Accueil() {
  const [favGame, setFavGame] = useState<gameProps | null>(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/games/1`)
      .then((res) => res.json())
      .then((data) => {
        setFavGame(data);
      });
  }, []);
  return (
    <>
      <section className="accueil">
        {favGame != null && (
          <article>
            <img src={favGame.image} alt={favGame.name} />
            <h2>
              <Link to={`/Game/${favGame.id}`}>{favGame.name}</Link>
            </h2>
          </article>
        )}
        <article>
          <h2>
            <Link to="/About">Learn more about us</Link>
          </h2>
        </article>
        <article>
          <img src={ListeJeu} alt="" />
          <h2>
            <Link to="/Games">Venez voir plus de jeux</Link>
          </h2>
        </article>
      </section>
    </>
  );
}

export default Accueil;
