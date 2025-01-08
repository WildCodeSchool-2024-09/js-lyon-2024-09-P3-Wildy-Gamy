import LogoConnexion from "../../../public/fantome.png";
import LogoMenu from "../../../public/manette.png";
import { useTheme } from "../../context/ThemeContext";
import ThemeButton from "../Theme/ThemeButton";
import "./NavBar.css";

function NavBar() {
  const { theme } = useTheme();
  return (
    <nav className={`${theme}`}>
      <img id="menunav" src={LogoMenu} alt="logo menu nav" />
      <p id="appname">WILDY GAMY</p>
      <ThemeButton />
      <img id="connexionnav" src={LogoConnexion} alt="logo connexion nav" />
    </nav>
  );
}

export default NavBar;
