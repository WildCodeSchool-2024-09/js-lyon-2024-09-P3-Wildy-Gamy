import LogoConnexion from "../../../public/fantome.png";
import { useTheme } from "../../context/ThemeContext";
import Menu from "../MenuBurger";
import ThemeButton from "../Theme/ThemeButton";
import "./NavBar.css";

function NavBar() {
  const { theme } = useTheme();
  return (
    <nav className={`${theme}`}>
      <Menu />
      <p id="appname">WILDY GAMY</p>
      <ThemeButton />
      <img id="connexionnav" src={LogoConnexion} alt="logo connexion nav" />
    </nav>
  );
}

export default NavBar;
