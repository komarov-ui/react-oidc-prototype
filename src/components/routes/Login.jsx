import { NavLink } from 'react-router-dom';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';

function LoginPage() {
  return (
    <div className="page-container">
      <h1>Login Page</h1>
      <NavBar>
        <NavLink className="button" to="/">
          Home
        </NavLink>
        <ButtonLogout />
      </NavBar>
    </div>
  );
}

export default LoginPage