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
      <h4>{data.name}</h4>
      <Link to={`/game/${data.id}`}>
        <img className="gameimg" src={data.image} alt={data.name} />
      </Link>
    </>
  );
}

export default GameList;
