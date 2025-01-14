import { useEffect, useState } from "react";
import Lots from "../components/Lots/Lots";
import "./LotsList.css";

interface lotProps {
  id: number;
  name: string;
  nb_lots: number;
  nb_points_needed: number;
  image: string;
}

function LotsList() {
  const [lots, setLots] = useState([] as [] | lotProps[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lots`)
      .then((response) => response.json())
      .then((data) => {
        setLots(data);
      });
  }, []);

  return (
    <>
      <div className="list">
        {lots.map((lot) => (
          <article key={lot.id}>
            <Lots data={lot} />
          </article>
        ))}
      </div>
    </>
  );
}

export default LotsList;
