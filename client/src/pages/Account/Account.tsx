import { useOutletContext } from "react-router-dom";
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
      </section>
    </>
  );
}

export default Account;
