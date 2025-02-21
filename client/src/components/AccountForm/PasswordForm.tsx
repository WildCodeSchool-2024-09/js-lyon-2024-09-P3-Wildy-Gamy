import { type ChangeEventHandler, useState } from "react";
import { useOutletContext } from "react-router-dom";

type User = {
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
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

type AccountData = {
  password: string;
  newPassword: string;
  email: string | undefined;
};

interface AccountFormProps {
  onSubmit: (category: AccountData) => void;
}

function PasswordForm({ onSubmit }: AccountFormProps) {
  const { auth } = useOutletContext<AuthProps>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setNewPassword(event.target.value);
  };

  // Gestionnaire de changement de la confirmation du mot de passe
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const password = formData.get("password") as string;
        const newPassword = formData.get("newPassword") as string;
        const email = auth?.user.email;

        onSubmit({ password, newPassword, email });
      }}
    >
      <div className="ensemble">
        <label htmlFor="password">Mot de passe actuel</label>
        <input type="password" name="password" />
      </div>
      <div className="ensemble">
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <input
          type="password"
          name="newPassword"
          onChange={handlePasswordChange}
        />
      </div>

      <div className="ensemble">
        {/* Champ pour la confirmation du mot de passe */}
        <label htmlFor="confirm-password">
          Confirmez votre nouveau mot de passe
        </label>{" "}
        <div>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirmez votre nouveau mot de passe"
            className="form-input"
          />{" "}
          {/* Indicateur de correspondance avec le mot de passe */}
          {newPassword === confirmPassword ? "✅" : "❌"}
        </div>
      </div>
      <button className="button-24" type="submit">
        Modifier le mot de passe
      </button>
    </form>
  );
}

export default PasswordForm;
