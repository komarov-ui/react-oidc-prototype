import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { API_GET_REQUEST_TOKEN } from '../consts/api';
import { AUTH_KEY, AUTH_LOADING_KEY, AUTH_ORIGIN_PAGE } from '../consts/auth';

export function useToken(authCode) {
  const [, setAuth] = useLocalStorage(AUTH_KEY);
  const [, , clearAuthLoading] = useLocalStorage(AUTH_LOADING_KEY)
  const [originPage, , clearOriginPage] = useLocalStorage(AUTH_ORIGIN_PAGE)

  const isAuthorizationCodeUsed = useRef(null)

  useEffect(() => {
    const savedAuthCode = isAuthorizationCodeUsed.current
    if (savedAuthCode && savedAuthCode === authCode) {
      return;
    }
    isAuthorizationCodeUsed.current = authCode;

    // Request access token and refresh token
    fetch(`${API_GET_REQUEST_TOKEN}?code=` + encodeURIComponent(authCode), {
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
  }, [clearAuthLoading, clearOriginPage, authCode, originPage, setAuth])
}
