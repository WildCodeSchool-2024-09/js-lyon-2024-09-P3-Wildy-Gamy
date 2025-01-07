import { useEffect, useState } from "react";
import Pacman from "pacman-react";
import { render } from "react-dom";
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
    <div>
      <Pacman />
      <h1> Score :{score}</h1>
    </div>
  );
}

export default PacmanGame;
