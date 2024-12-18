import { Link } from "react-router-dom";

interface GameListProps {
  data: {
    id: number;
    name: string;
    principle: string;
    in_room: number;
    is_playable: number;
    image: string;
  };
}

function GameList({ data }: GameListProps) {
  return (
    <>
      <h2>{data.name}</h2>
      <Link to={`/game/${data.id}`}>
        <img className="gameimg" src={data.image} alt={data.name} />
      </Link>
    </>
  );
}

export default GameList;
