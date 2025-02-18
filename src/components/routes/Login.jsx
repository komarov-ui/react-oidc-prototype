import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';
import { useLocalStorage } from 'react-use';
import { AUTH_KEY, AUTH_LOADING_KEY } from '../../consts/auth';

function useToken(code) {
  const [, setAuth] = useLocalStorage(AUTH_KEY);
  const [, setAuthLoading] = useLocalStorage(AUTH_LOADING_KEY)

  const codeUsed = useRef(false)

  useEffect(() => {
    if (codeUsed.current) {
      return;
    }
    codeUsed.current = true;

    // Request tokens
    fetch('http://localhost:4000/request-token?code=' + encodeURIComponent(code), {
      credentials: 'include', // Include cookies
    }).then(() => {
      setAuth(true);
      setAuthLoading(false);
      codeUsed.current = false;
    }).catch(error => console.error(error));
  }, [code, setAuth, setAuthLoading])
}

function LoginPage() {
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const data = useToken(code)

  useEffect(() => {
    if (data) {
      console.log('data', data);
    }
  }, [data]);

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