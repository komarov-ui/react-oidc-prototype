import { NavLink } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { useSearchParam } from '../../utils/useSearchParam';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';

function LoginPage() {
  const code = useSearchParam('code')
  useToken(code)

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