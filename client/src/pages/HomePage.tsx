import Jeu from "../assets/images/Jeu-Du-Moment.png";
import Allgames from "../assets/images/Tout-Nos-Jeux.png";
import "./HomePage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <div>
        <main>
          <Link to="/jeu-du-moment">
            <img id="PacMan" src={Jeu} alt="jeu du moment" />
          </Link>
          <Link to="/tout-nos-jeux">
            <img id="Jeux" src={Allgames} alt="tout nos jeux" />
          </Link>
        </main>
      </div>
    </>
  );
};

export default Homepage;
