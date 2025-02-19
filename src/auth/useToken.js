import { useLocalStorage } from 'react-use';
import { useEffect, useRef } from 'react';
import { AUTH_KEY, AUTH_LOADING_KEY } from '../consts/auth';
import { API_GET_REQUEST_TOKEN } from '../consts/api';

export function useToken(code) {
  const [, setAuth] = useLocalStorage(AUTH_KEY);
  const [, setAuthLoading] = useLocalStorage(AUTH_LOADING_KEY)

  const codeUsed = useRef(false)

  useEffect(() => {
    if (codeUsed.current) {
      return;
    }
    codeUsed.current = true;

    // Request access token and refresh token
    fetch(`${API_GET_REQUEST_TOKEN}?code=` + encodeURIComponent(code), {
      // Include cookies
      credentials: 'include',
    }).then(() => {
      setAuth(true);
      setAuthLoading(false);
      codeUsed.current = false;
      window.location.href = '/'
    }).catch(error => console.error(error));
  }, [code, setAuth, setAuthLoading])
}
