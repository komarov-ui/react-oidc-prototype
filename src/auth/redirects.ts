import { kyFetch } from "../api/interceptor";
import { LOCAL_STORAGE_KEY_ID_TOKEN } from "../consts/auth";

const KEYCLOAK_URL = 'https://localhost:8443';
const KEYCLOAK_REALM = 'oidc-app';
const KEYCLOAK_CLIENT_ID = 'test-oidc-client';
const POST_LOGOUT_REDIRECT_URI = encodeURIComponent('https://localhost:5173')

export function keycloakAuth(): void {
  kyFetch('https://localhost:4000/auth', {
    credentials: 'include',
  })
    .then(res => res.json())
    .then((res: any) => {
      location.href = res.redirectTo;
    })
}

export function keycloakLogout(): void {
  const idToken = localStorage.getItem(LOCAL_STORAGE_KEY_ID_TOKEN);
  localStorage.clear();
  location.href =
    `${KEYCLOAK_URL}/` +
    `realms/${KEYCLOAK_REALM}/` +
    `protocol/openid-connect/logout?` +
    `client_id=${KEYCLOAK_CLIENT_ID}&` +
    `id_token_hint=${idToken}&` +
    `post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`;
}
