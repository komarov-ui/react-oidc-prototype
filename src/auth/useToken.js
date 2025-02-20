import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { API_GET_REQUEST_TOKEN } from '../consts/api';
import { AUTH_KEY, AUTH_LOADING_KEY, AUTH_ORIGIN_PAGE } from '../consts/auth';

export function useToken(code) {
  const [, setAuth] = useLocalStorage(AUTH_KEY);
  const [, , clearAuthLoading] = useLocalStorage(AUTH_LOADING_KEY)
  const [originPage, , clearOriginPage] = useLocalStorage(AUTH_ORIGIN_PAGE)

  const isAuthorizationCodeUsed = useRef(false)

  useEffect(() => {
    if (isAuthorizationCodeUsed.current) {
      return;
    }
    isAuthorizationCodeUsed.current = true;

    // Request access token and refresh token
    fetch(`${API_GET_REQUEST_TOKEN}?code=` + encodeURIComponent(code), {
      credentials: 'include', // Include cookies
    }).then(response => {
      return response.json();
    }).then((data) => {
      console.log('Auth Result: ', data)
      setAuth(JSON.stringify(data));
      clearAuthLoading();
      clearOriginPage();
      // isAuthorizationCodeUsed.current = false;
      if (originPage) {
        location.href = originPage
      }
    }).catch(error => console.error(error));
  }, [clearAuthLoading, clearOriginPage, code, originPage, setAuth])
}
