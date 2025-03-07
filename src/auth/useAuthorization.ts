import { useEffect, useRef } from 'react';
import { API_GET_REQUEST_TOKEN } from '../consts/api';
import { LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE, LOCAL_STORAGE_KEY_USER_INFO, SEARCH_PARAM_CODE_KEY } from '../consts/auth';

export function useAuthorization(authorizationCode?: string) {
  const cachedAuthorizationCode = useRef<string | null>(null)

  useEffect(() => {
    // exit when we just required user info
    if (!authorizationCode) {
      return;
    }
    // exit when we have already used authorization code
    if (
      cachedAuthorizationCode.current &&
      cachedAuthorizationCode.current === authorizationCode
    ) {
      return;
    }
    cachedAuthorizationCode.current = authorizationCode;

    // Request access token and refresh token
    fetch(`${API_GET_REQUEST_TOKEN}?${SEARCH_PARAM_CODE_KEY}=` + encodeURIComponent(authorizationCode), {
      credentials: 'include', // Include cookies
    }).then(response => {
      return response.json();
    }).then(userInfo => {
      localStorage.setItem(LOCAL_STORAGE_KEY_USER_INFO, userInfo.idToken)
      const originPage = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE)
      localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE);
      if (originPage) {
        location.href = originPage
      }
    }).catch(error => console.error(error));
  }, [authorizationCode])

  return { userInfo: localStorage.getItem(LOCAL_STORAGE_KEY_USER_INFO) }
}
