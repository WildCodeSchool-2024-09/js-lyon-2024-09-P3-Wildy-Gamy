import { Link } from "react-router-dom";

interface GameListProps {
  data: {
    id: number;
    name: string;
    image: string;
  };
}

export default function GameList({ data }: GameListProps) {
  return (
    <>
      <div>
        <h1>{data.name}</h1>
        <img src={data.image} alt="" />
        <Link to={`/api/games/${data.id}`}>
          <button type="button">Details</button>
        </Link>
      </div>
    </>
  );
}
