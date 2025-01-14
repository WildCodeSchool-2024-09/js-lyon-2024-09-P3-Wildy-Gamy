import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <>
      <section className="login_section">
        <form className="login">
          <label htmlFor="email">email</label>
          <input type="text" id="email" />
          <label htmlFor="password">Mot de passe</label>
          <input type="text" id="password" />
        </form>
        <Link to="/Inscription">Inscrivez-vous</Link>
      </section>
    </>
  );
}

export default Login;
