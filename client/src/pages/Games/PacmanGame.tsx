import Pacman from "pacman-react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import "./PacmanGame.css";
render(<Pacman />, document.getElementById("root"));

function PacmanGame() {
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
  const score = timeSpent * 10;
  return (
    <div className="pacman">
      <Pacman />
      <h1 id="score"> Score :{score}</h1>
    </div>
  );
}

export default PacmanGame;
