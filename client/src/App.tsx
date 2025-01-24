import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { useTheme } from "./context/ThemeContext";

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

function App() {
  const [auth, setAuth] = useState(null as Auth | null);
  const { theme } = useTheme();
  return (
    <>
      <div className={`${theme}`}>
        <NavBar auth={auth} />
        {auth && <p>Hello {auth.user.pseudo}</p>}
        <main>
          <Outlet context={{ auth, setAuth }} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
