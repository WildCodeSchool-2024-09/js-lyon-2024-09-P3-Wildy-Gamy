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
          <p>Adresse et fait par des wilders</p>
          <img src={champignon} alt="" />
        </footer>
      ) : (
        <footer className="footer-sombre">
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
          <p>Adresse et fait par les Wilders</p>
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
          <img src={pacman} alt="" />
        </footer>
      )}
    </>
  );
}
