import { Link, useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Account.css";

type User = {
  id: number;
  pseudo: string;
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

function Account() {
  const { auth } = useOutletContext<AuthProps>();
  const navigate = useNavigate();
  const id = auth?.user.id;

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
        navigate("/login");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="account">
        {auth != null && (
          <section className="accountInfo">
            <article className="ensemble">
              <h4>Votre pseudo</h4>
              <p>{auth.user.pseudo}</p>
            </article>
            <article className="ensemble">
              <h4>Votre email</h4>
              <p>{auth.user.email}</p>
            </article>
            <article className="ensemble">
              <h4>Votre image</h4>
              <img src={auth.user.image} alt="user profile" />
            </article>
          </section>
        )}
        <Link className="submit-btn" to="/accountedit">
          Modifier les informations
        </Link>
        <button
          type="button"
          className="button-24"
          onClick={() => handleDelete(id)}
        >
          Supprimer Compte
        </button>
      </section>
    </>
  );
}

export default Account;
