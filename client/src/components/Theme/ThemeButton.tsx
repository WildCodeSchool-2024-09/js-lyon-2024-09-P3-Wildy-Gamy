import moonImage from "../../assets/images/moon.png";
import starImage from "../../assets/images/star.png";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeButton.css";

function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button type="button" onClick={() => handleThemeChange()}>
      {theme === "light" ? (
        <img className="themeImg" src={moonImage} alt="moon emoticone" />
      ) : (
        <img className="themeImg" src={starImage} alt="star emoticone" />
      )}
    </button>
  );
}

export default ThemeButton;
