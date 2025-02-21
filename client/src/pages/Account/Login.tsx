import { useRef } from "react";

import type { FormEventHandler } from "react";

import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

function Login() {
  // Références pour les champs email et mot de passe
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            password:
              /* rendering process ensures the ref is defined before the form is submitted */
              (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        toast.info("vous etes bien connecté");
        const user = await response.json();

        setAuth(user);

        navigate("/");
      } else {
        // Log des détails de la réponse en cas d'échec
        toast.error("mot de passe ou mail invalide !");
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };
  return (
    <section className="form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login">
        <div>
          {/* Champ pour l'email */}
          <label htmlFor="email">Email</label>{" "}
          <input
            ref={emailRef}
            type="email"
            id="email"
            className="form-input"
          />
        </div>
        <div>
          {/* Champ pour le mot de passe */}
          <label htmlFor="password">Password</label>{" "}
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="form-input"
          />
        </div>
        {/* Bouton de soumission du formulaire */}
        <button className="submit-btn" type="submit">
          Connexion
        </button>
      </form>
      <p>Si vous n'êtes pas encore inscrit</p>
      <Link className="linkLogin" to="/signup">
        Inscrivez-vous!
      </Link>
    </section>
  );
}

export default Login;
