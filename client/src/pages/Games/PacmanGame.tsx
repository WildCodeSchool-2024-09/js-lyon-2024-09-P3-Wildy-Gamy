import Pacman from "pacman-react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./PacmanGame.css";
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

function PacmanGame() {
  const { auth } = useOutletContext<AuthProps>();
  const id_user = auth?.user.id;
  const id_game = 1;
  const navigate = useNavigate();
  const [timeSpent, setTimeSpent] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

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
        navigate("/Games");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pacman">
      <button className="button-74" type="button" onClick={handleScore}>
        Enregistrer Score
      </button>
      <Pacman />
      <h1 id="score"> Score :{newScore}</h1>
    </div>
  );
}

export default PacmanGame;
