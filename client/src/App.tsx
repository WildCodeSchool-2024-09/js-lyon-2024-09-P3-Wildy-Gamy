import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { useTheme } from "./context/ThemeContext";

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

function App() {
  const [auth, setAuth] = useState(null as Auth | null);
  const { theme } = useTheme();
  return (
    <>
      <div className={`${theme}`}>
        <NavBar auth={auth} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <main>
          <Outlet context={{ auth, setAuth }} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
