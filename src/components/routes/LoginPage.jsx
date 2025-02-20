import { NavLink } from 'react-router-dom';
import { useAuthorization } from '../../auth/useToken';
import { useSearchParam } from '../../utils/useSearchParam';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';
import { SEARCH_PARAM_CODE_KEY } from '../../consts/auth';

function LoginPage() {
  const authorizationCode = useSearchParam(SEARCH_PARAM_CODE_KEY)
  useAuthorization(authorizationCode)

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