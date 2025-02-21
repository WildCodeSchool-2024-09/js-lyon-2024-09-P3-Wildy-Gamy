import { useRef, useState } from "react";
import "./SignupForm.css";

import type { ChangeEventHandler, FormEventHandler } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm: React.FC = () => {
  const [error] = useState<string>("");

  const pseudoRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // États pour le mot de passe et la confirmation du mot de passe
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hook pour la navigation
  const navigate = useNavigate();

  // Gestionnaire de changement du mot de passe
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  // Gestionnaire de changement de la confirmation du mot de passe
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pseudo: (pseudoRef.current as HTMLInputElement).value,
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            password,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 201) {
        toast.info("Votre compte a bien été créé !");
        navigate("/login");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };

  return (
    <section className="form-container">
      <h2>Inscription</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Pseudo">Pseudo</label>
          <input
            type="text"
            id="Pseudo"
            name="Pseudo"
            required
            placeholder="Pseudo"
            className="form-input"
            ref={pseudoRef}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            className="form-input"
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            required
            placeholder="Mot de passe"
            className="form-input"
          />
          {password.length >= 8 ? "✅" : "❌"}{" "}
          {`length: ${password.length} >= 8`}
        </div>
        <div>
          {/* Champ pour la confirmation du mot de passe */}
          <label htmlFor="confirm-password">Confirmez votre mot de passe</label>{" "}
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirmez votre mot de passe"
            className="form-input"
          />{" "}
          {/* Indicateur de correspondance avec le mot de passe */}
          {password === confirmPassword ? "✅" : "❌"}
        </div>

        <div>
          <button type="submit" className="submit-btn">
            Inscription
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
