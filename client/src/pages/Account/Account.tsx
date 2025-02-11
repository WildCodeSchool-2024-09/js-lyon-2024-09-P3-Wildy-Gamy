import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GameScore from "../../components/AccountForm/Account/AccountGamesScores";
import "./Account.css";

type User = {
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
  const token = auth?.token;
  const [scores, setScores] = useState<scoreProps[]>([] as [] | scoreProps[]);
  const [user, setUser] = useState<userProps | null>(null);
  const [lots, setLots] = useState<lotsProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/gamesScores`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setScores(data);
      });
  }, [token]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [token]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/lotsImage`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLots(data);
      });
  }, [token]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 204) {
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
            {lots.length !== 0 && (
              <article className="ensemble">
                <h4>Lots obtenu :</h4>
                <div className="lotObtenu">
                  {lots.length !== 0 &&
                    lots.map((lot) => (
                      <img
                        key={lot.user_id}
                        src={lot.lot_image}
                        alt="lot obtenu"
                      />
                    ))}
                </div>
              </article>
            )}
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
              handleDelete();
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
