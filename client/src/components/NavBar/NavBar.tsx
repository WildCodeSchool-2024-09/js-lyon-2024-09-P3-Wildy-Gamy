import LogoConnexion from "../../../public/fantome.png";
import Menu from "../MenuBurger";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <Menu />
      <p id="appname">WILDY GAMY</p>
      <img id="connexionnav" src={LogoConnexion} alt="logo connexion nav" />
    </nav>
  );
}

export default NavBar;
