import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface lotProps {
  id: number;
  name: string;
  nb_lots: number;
  nb_points_needed: number;
  image: string;
}

function LotDetail() {
  const { id } = useParams();
  const [lot, setLot] = useState(null as null | lotProps);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lots/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLot(data);
      });
  }, [id]);

  return (
    lot && (
      <div className="lotDetail">
        <h2>{lot.name}</h2>
        <img src={lot.image} alt={lot.name} />
        <h3>
          Nombres de {lot.name} existants : {lot.nb_lots}
        </h3>
        <p>Prix : {lot.nb_points_needed} pts</p>
      </div>
    )
  );
}

export default LotDetail;
