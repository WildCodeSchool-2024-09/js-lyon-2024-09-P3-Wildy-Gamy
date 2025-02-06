import Pacman from "pacman-react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./PacmanGame.css";
import fleche from "../../assets/images/fleche.png";
render(<Pacman />, document.getElementById("root"));

type User = {
  id: number;
  id_user: number;
  pseudo: string;
  email: string;
  is_admin: boolean;
  image: string;
  newScore: number;
};

type Auth = {
  user: User;
  token: string;
};

interface AuthProps {
  auth: Auth | null;
}

interface userProps {
  id: number;
  pseudo: string;
  points: number;
  email: string;
  is_admin: boolean;
  image: string;
}

function PacmanGame() {
  const { auth } = useOutletContext<AuthProps>();
  const id_user = auth?.user.id;
  const id_game = 1;
  const navigate = useNavigate();
  const [timeSpent, setTimeSpent] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id_user}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [id_user]);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      const gameOverElement = document.querySelector(".game-over");

      if (gameOverElement) {
        setIsGameOver(true);
      } else {
        setTimeSpent((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameOver]);
  const newScore = timeSpent * 10;

  const handleScore = async () => {
    try {
      if (user == null) {
        console.error("user is null");
      } else if (user.points - newScore > newScore) {
        alert("Votre score est inferieur a vos points!!");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/scores/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: id_user,
            newScore: newScore,
            id_game: id_game,
          }),
        },
      );

      if (response.status === 204) {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePoints = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usersPoints/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id_user,
          }),
        },
      );

      if (response.status === 201) {
        navigate("/games");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pacman-div">
      <section className="pacman-information">
        <Link to="/games" className="return">
          <img src={fleche} alt="Retourner voir plus de jeux" />
        </Link>
        <button
          className="button-74"
          type="button"
          onClick={() => {
            handlePoints();
            handleScore();
          }}
        >
          Update Points
        </button>
      </section>

      <Pacman />
      <h1 id="score"> Score :{newScore}</h1>
    </div>
  );
}

export default PacmanGame;
