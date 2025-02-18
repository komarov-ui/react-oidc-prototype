import { NavLink } from 'react-router-dom';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';

function HomePage() {
  return (
    <div className="page-container">
      <h1>Home Page</h1>
      <div>Welcome to OpenID Connect App!</div>
      <div>
        This is a simple app that demonstrates how to use OpenID Connect for authentication.
        <br />
        Current page is public and does not require authentication.
        <br />
        But you can try to access Protected Page:
      </div>
      <NavBar>
        <NavLink className="button" to="/protected-page">
          Protected Page
        </NavLink>
        <ButtonLogout />
      </NavBar>
    </div>
  );
}

export default HomePage