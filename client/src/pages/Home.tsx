import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GamePicture from "../../src/assets/images/machine-darcade (1).png";
import "./Home.css";

interface gameProps {
  id: number;
  name: string;
  image: string;
}

function Home() {
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
      <section className="home">
        {favGame != null && (
          <article className="jeux" id="fav">
            <img src={favGame.image} alt={favGame.name} />
            <h2>
              <Link to={`/Game/${favGame.id}`}>{favGame.name}</Link>
            </h2>
          </article>
        )}
        <article>
          <p>
            Que tu sois fan de classiques rétro ou à la recherche de nouveaux
            défis, notre plateforme est faite pour toi ! Notre mission ? Offrir
            aux joueurs une expérience fluide, immersive et pleine de défis, où
            chaque partie est une nouvelle aventure !
          </p>
        </article>
        <article>
          <h2>
            <Link to="/About">Plus sur nous</Link>
          </h2>
        </article>
        <article className="jeux" id="allGames">
          <img src={GamePicture} alt="" />
          <h2>
            <Link to="/Games">Venez voir plus de jeux</Link>
          </h2>
        </article>
      </section>
    </>
  );
}

export default Home;
