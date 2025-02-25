import ky from 'ky';
import { keycloakAuth } from '../auth/redirects';
import { LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE, LOCAL_STORAGE_KEY_USER_INFO } from '../consts/auth';

export const kyFetch = ky.create({
  hooks: {
    beforeRequest: [
      (request) => {
        console.log("Intercepted request:", request);
      }
    ],
    afterResponse: [
      (request, options, response) => {
        console.log("Intercepted response:", response);
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem(LOCAL_STORAGE_KEY_USER_INFO);
          localStorage.setItem(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE, location.href);
          keycloakAuth();
        }
      }
    ]
  }
});
