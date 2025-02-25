import { NavLink } from 'react-router-dom';
import { useAuthorization } from '../../auth/useAuthorization';
import { useSearchParam } from '../../utils/useSearchParam';
import { SEARCH_PARAM_CODE_KEY } from '../../consts/auth';
import { ButtonLogout } from '../kit/ButtonLogout';
import { NavBar } from '../kit/NavBar';

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