import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { API_GET_REQUEST_TOKEN } from '../consts/api';
import { LOCAL_STORAGE_KEY_AUTH_IN_PROGRESS, LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE, LOCAL_STORAGE_KEY_USER_INFO, SEARCH_PARAM_CODE_KEY } from '../consts/auth';

export function useAuthorization(authorizationCode) {
  const [userInfo, setUserInfo] = useLocalStorage(LOCAL_STORAGE_KEY_USER_INFO);
  const [, , clearIsAuthenticating] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_IN_PROGRESS);
  const [originPage, , clearAuthOriginPage] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE)

  const cachedAuthorizationCode = useRef(null)

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
      console.log('User Info: ', userInfo)
      setUserInfo(userInfo);
      clearIsAuthenticating();
      clearAuthOriginPage();
      if (originPage) {
        location.href = originPage
      }
    }).catch(error => console.error(error));
  }, [clearAuthOriginPage, authorizationCode, originPage, setUserInfo, clearIsAuthenticating])

  return { userInfo }
}
