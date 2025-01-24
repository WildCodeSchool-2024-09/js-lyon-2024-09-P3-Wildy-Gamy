import { useOutletContext } from "react-router-dom";
import "./Account.css";
import { useNavigate } from "react-router-dom";

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
  const myDataObject = { userId: auth?.user.id };

  const handleDelete = async () => {
    console.info(auth?.user.id);
    console.info(myDataObject);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myDataObject),
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
        <button className="button-24" type="button" onClick={handleDelete}>
          Supprimer compte
        </button>
      </section>
    </>
  );
}

export default Account;
