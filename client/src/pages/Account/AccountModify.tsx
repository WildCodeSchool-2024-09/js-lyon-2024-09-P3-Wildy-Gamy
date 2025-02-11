import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import AccountForm from "../../components/AccountForm/AccountForm";
import PasswordForm from "../../components/AccountForm/PasswordForm";

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

type Error = {
  field: string;
  message: string;
};

function AccountEdit() {
  const navigate = useNavigate();
  const { auth, setAuth } = useOutletContext<AuthProps>();
  const token = auth?.token;
  const [error, setError] = useState(null as null | Error[]);

  return (
    <>
      <section className="accountInfo">
        {auth === null ? (
          <h2>GAME OVER</h2>
        ) : (
          <AccountForm
            defaultValue={auth.user}
            onSubmit={(AccountData) => {
              fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(AccountData),
              })
                .then(async (response) => response.json())
                .then((data) => {
                  try {
                    // Vérifier si des erreurs sont présentes dans les données
                    if (data.status) {
                      setError(data.status); // Gérer l'erreur renvoyée par le serveur
                      return;
                    }

                    setAuth({ ...auth, user: data }); // Sinon, mettre à jour l'état avec les données de l'utilisateur
                    navigate("/account");
                  } catch (error) {
                    console.error(
                      "Erreur lors de la lecture de la réponse JSON :",
                      error,
                    );
                  }
                });
            }}
          >
            Modifier
          </AccountForm>
        )}
        {error != null && (
          <p>
            {error[0].field}
            {error[0].message}
          </p>
        )}
      </section>
      <section className="accountInfo">
        {auth && (
          <PasswordForm
            onSubmit={(PasswordData) => {
              fetch(`${import.meta.env.VITE_API_URL}/api/users_password`, {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(PasswordData),
              })
                .then(async (response) => response.json())
                .then((data) => {
                  try {
                    // Vérifier si des erreurs sont présentes dans les données
                    if (data.status) {
                      setError(data.status); // Gérer l'erreur renvoyée par le serveur
                      return;
                    }
                    navigate("/account");
                  } catch (error) {
                    console.error(
                      "Erreur lors de la lecture de la réponse JSON :",
                      error,
                    );
                  }
                });
            }}
          />
        )}
      </section>
    </>
  );
}

export default AccountEdit;
