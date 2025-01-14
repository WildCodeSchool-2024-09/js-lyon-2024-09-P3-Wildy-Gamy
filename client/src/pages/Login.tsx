import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <form>
        <label htmlFor="email">email</label>
        <input type="text" id="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="text" id="password" />
      </form>
      <Link to="/Inscription">Inscrivez-vous</Link>
    </>
  );
}

export default Login;
