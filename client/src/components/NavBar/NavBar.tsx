import LogoConnexion from "../../../public/fantome.png";
import { useTheme } from "../../context/ThemeContext";
import Menu from "../MenuBurger";
import ThemeButton from "../Theme/ThemeButton";
import "./NavBar.css";

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

interface AuthProps {
  auth: Auth | null;
}

function NavBar({ auth }: AuthProps) {
  const { theme } = useTheme();
  return (
    <nav id={`${theme}`}>
      <Menu auth={auth} />
      <ThemeButton />
      <p id="appname">WILDY GAMY</p>
      <ThemeButton />
      {auth === null ? (
        <img id="connexionnav" src={LogoConnexion} alt="logo connexion nav" />
      ) : (
        <img id="connexionnav" src={auth.user.image} alt="user profile" />
      )}
    </nav>
  );
}

export default NavBar;
