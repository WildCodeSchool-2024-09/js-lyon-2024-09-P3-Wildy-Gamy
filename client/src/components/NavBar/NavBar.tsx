import LogoConnexion from "../../../public/fantome.png";
import LogoMenu from "../../../public/manette.png";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <img id="menunav" src={LogoMenu} alt="logo menu nav" />
      <p id="appname">WILDY GAMY</p>
      <img id="connexionnav" src={LogoConnexion} alt="logo connexion nav" />
    </nav>
  );
}

export default NavBar;
