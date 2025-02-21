import { Link } from "react-router-dom";
import "./Lots.css";

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
      <h4 className="star-title">{data.name}</h4>
      <Link to={`/lot/${data.id}`}>
        <img className="lotimg" src={data.image} alt={data.name} />
        <p className="star-title"> prix: {data.nb_points_needed} points</p>
      </Link>
    </>
  );
}

export default Lots;
