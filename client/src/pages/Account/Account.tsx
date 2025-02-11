import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GameScore from "../../components/AccountForm/Account/AccountGamesScores";
import "./Account.css";

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
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

interface scoreProps {
  id: number;
  game: string;
  score: number;
}

interface userProps {
  id: number;
  pseudo: string;
  points: number;
  email: string;
  is_admin: boolean;
  image: string;
}

interface lotsProps {
  lot_id: number;
  lot_image: string;
  user_id: number;
}

function Account() {
  const { auth, setAuth } = useOutletContext<AuthProps>();
  const navigate = useNavigate();
  const id = auth?.user.id;
  const [scores, setScores] = useState<scoreProps[]>([] as [] | scoreProps[]);
  const [user, setUser] = useState<userProps | null>(null);
  const [lots, setLots] = useState<lotsProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/gamesScores/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setScores(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lotsImage/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLots(data);
      });
  }, [id]);

  const handleDelete = async (id: number | undefined) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 204) {
        toast.info("Vous avez supprimé votre compte");
        navigate("/login");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setAuth(null);
    toast.info("Vous etes deconnecté");
    navigate("/login");
  };

  return (
    <>
      <section className="account">
        {auth != null && (
          <section className="accountInfo">
            <section>
              <div className="infoUser">
                <article className="ensemble">
                  <h4>pseudo :</h4>
                  <p>{auth.user.pseudo}</p>
                </article>
                <article className="ensemble">
                  <h4>email :</h4>
                  <p>{auth.user.email}</p>
                </article>
                <article className="ensemble">
                  <h4>image :</h4>
                  <img src={auth.user.image} alt="user profile" />
                </article>
              </div>
            </section>
            <section className="parentScore">
              {scores.map((score) => (
                <div className="accountScores" key={score.id}>
                  <article className="ensemble">
                    <GameScore data={score} />
                  </article>
                </div>
              ))}
              <article className="ensemble">
                <h4>points:</h4>
                <p>{user?.points}</p>
              </article>
            </section>
            <article className="ensemble">
              <h4>Lots obtenu :</h4>
              <div className="lotObtenu">
                {lots.map((lot) => (
                  <img key={lot.user_id} src={lot.lot_image} alt="lot obtenu" />
                ))}
              </div>
            </article>
          </section>
        )}
        <section className="buttonS">
          <Link className="button-24" to="/accountedit">
            Modifier les informations
          </Link>
          <button type="button" className="button-24" onClick={handleLogout}>
            Se déconnecter
          </button>
          <button
            type="button"
            className="button-24"
            onClick={() => {
              handleDelete(id);
              handleLogout();
            }}
          >
            Supprimer Compte
          </button>
        </section>
      </section>
    </>
  );
}

export default Account;
