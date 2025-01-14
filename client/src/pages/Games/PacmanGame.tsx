import Pacman from "pacman-react";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import "./PacmanGame.css";
render(<Pacman />, document.getElementById("root"));

function PacmanGame() {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const score = timeSpent * 10;
  return (
    <div className="pacman">
      <Pacman />
      <h1 id="score"> Score :{score}</h1>
    </div>
  );
}

export default PacmanGame;
