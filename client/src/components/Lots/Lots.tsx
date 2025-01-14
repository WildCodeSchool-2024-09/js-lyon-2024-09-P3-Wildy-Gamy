import { Link } from "react-router-dom";

interface LotsProps {
  data: {
    id: number;
    name: string;
    nb_points_needed: number;
    image: string;
  };
}

function Lots({ data }: LotsProps) {
  return (
    <>
      <h4>{data.name}</h4>
      <Link to={`/lots/${data.id}`}>
        <img className="lotimg" src={data.image} alt={data.name} />
        <p> prix: {data.nb_points_needed} points</p>
      </Link>
    </>
  );
}

export default Lots;
