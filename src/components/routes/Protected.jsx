import { NavLink } from 'react-router-dom';

function ProtectedPage() {
  return (
    <div className="page-container">
      <h1>Protected Page</h1>
      Some protected content
      <NavLink className="button" to="/">
        Home
      </NavLink>
    </div>
  );
}

export default ProtectedPage