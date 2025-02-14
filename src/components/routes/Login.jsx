import { NavLink } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="page-container">
      <h1>Login Page</h1>
      <NavLink className="button" to="/">
        Home
      </NavLink>
    </div>
  );
}

export default LoginPage