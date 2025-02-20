import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'react-use';
import { API_GET_REQUEST_TOKEN } from '../consts/api';
import { LOCAL_STORAGE_KEY_USER_INFO, LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE, SEARCH_PARAM_CODE_KEY } from '../consts/auth';

export function useAuthorization(authorizationCode) {
  const [, setUserInfo] = useLocalStorage(LOCAL_STORAGE_KEY_USER_INFO);
  const [originPage, , clearAuthOriginPage] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE)

  const cachedAuthorizationCode = useRef(null)

  useEffect(() => {
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
      clearAuthOriginPage();
      if (originPage) {
        location.href = originPage
      }
    }).catch(error => console.error(error));
  }, [clearAuthOriginPage, authorizationCode, originPage, setUserInfo])
}
