import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <div className={`${theme}`}>
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
