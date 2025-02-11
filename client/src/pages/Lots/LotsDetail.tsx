import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import "./LotsDetail.css";

interface lotProps {
  id: number;
  name: string;
  nb_lots: number;
  nb_points_needed: number;
  image: string;
}
interface userProps {
  id: number;
  pseudo: string;
  points: number;
  email: string;
  is_admin: boolean;
  image: string;
}

type User = {
  id: number;
  pseudo: string;
  points: number;
  email: string;
  is_admin: boolean;
  image: string;
};

type Auth = {
  user: User;
  token: string;
};

interface AuthProps {
  auth: Auth | null;
}

function LotDetail() {
  const { auth } = useOutletContext<AuthProps>();
  const { id } = useParams();
  const navigate = useNavigate();
  const id_user = auth?.user.id;
  const [lot, setLot] = useState(null as null | lotProps);
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lots/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLot(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id_user}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [id_user]);

  const handleBuy = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exchangesLot/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_lot: id,
            id_user: id_user,
          }),
        },
      );

      if (response.status === 201) {
        navigate("/games");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPoints = async () => {
    try {
      if (user == null || lot == null) {
        console.error("user or lot is null");
      } else if (user.points < lot.nb_points_needed) {
        toast.error("Vous n'avez pas assez de points");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usersBuyPoints/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_lot: id,
            id_user: id_user,
          }),
        },
      );

      if (response.status === 201) {
        navigate("/games");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditNbLot = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lotsNbPoints/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_lot: id,
            id_user: id_user,
          }),
        },
      );

      if (response.status === 201) {
        navigate("/games");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    lot && (
      <div className="lotDetail">
        <section className="home">
          <article>
            <h2>{lot.name}</h2>
            <img src={lot.image} alt={lot.name} />
            <h3>
              Nombres de {lot.name} existants : {lot.nb_lots}
            </h3>
            <p>Prix : {lot.nb_points_needed} pts</p>
            <h4>Total des points :</h4>
            <p>{user?.points}</p>
          </article>
        </section>
        <button
          className="button-74"
          type="button"
          onClick={() => {
            handleBuy();
            handleEditPoints();
            handleEditNbLot();
          }}
        >
          Acheter
        </button>
      </div>
    )
  );
}

export default LotDetail;
