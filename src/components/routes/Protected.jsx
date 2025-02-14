import { NavLink } from 'react-router-dom';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';

function ProtectedPage() {
  return (
    <div className="page-container">
      <h1>Protected Page</h1>
      Some protected content
      <NavBar>
        <NavLink className="button" to="/">
          Home
        </NavLink>
        <ButtonLogout />
      </NavBar>
    </div>
  );
}

export default ProtectedPage