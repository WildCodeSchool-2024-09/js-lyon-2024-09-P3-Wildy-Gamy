import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GamePicture from "../../src/assets/images/jeu.png";
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
            asperiores ullam doloribus ducimus dolore itaque rerum eius ipsum
            est porro explicabo assumenda esse possimus incidunt pariatur quas,
            consequuntur optio ut.
          </p>
        </article>
        <article>
          <h2>
            <Link to="/About">Learn more about us</Link>
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
