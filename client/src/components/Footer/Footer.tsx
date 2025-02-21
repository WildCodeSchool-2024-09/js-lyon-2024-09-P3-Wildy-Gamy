import pacman from "../../../public/pacman.png";
import champignon from "../../assets/images/champignon.png";
import { useTheme } from "../../context/ThemeContext";
import "./Footer.css";
export default function Footer() {
  const { theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <footer className="footer-claire">
          <img src={champignon} alt="" />
          <p className="accent-color">
            42 Chemin de Traverse, Villeurbanne <br />
            contact.wildygamy@gmail.com <br /> Fait par des wilders
          </p>
          <img src={champignon} alt="" />
        </footer>
      ) : (
        <footer className="footer-sombre">
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
          <p>
            42 Chemin de Traverse, Villeurbanne <br />
            contact.wildygamy@gmail.com <br />
            Fait par des wilders
          </p>
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
        </footer>
      )}
    </>
  );
}
