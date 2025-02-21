import { NavLink } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { LOCAL_STORAGE_KEY_AUTH_IN_PROGRESS, LOCAL_STORAGE_KEY_USER_INFO } from '../../consts/auth';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';
import { useEffect } from 'react';

export default function LogoutPage() {
  const [, , clearUserInfo] = useLocalStorage(LOCAL_STORAGE_KEY_USER_INFO);
  const [, , clearIsAuthenticating] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_IN_PROGRESS)

  useEffect(() => {
    clearUserInfo();
    clearIsAuthenticating();
    // Do it only on mount of page
    // eslint-disable-next-line
  }, [])

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
