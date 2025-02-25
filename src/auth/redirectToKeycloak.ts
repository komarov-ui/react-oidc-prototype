import { LOCAL_STORAGE_KEY_USER_INFO } from "../consts/auth";

const KEYCLOAK_URL = 'http://localhost:7777';
const KEYCLOAK_REALM = 'apihub';
const KEYCLOAK_CLIENT_ID = 'apihub-oidc-client';
const REDIRECT_URI = encodeURIComponent('http://localhost:5173/login');
const POST_LOGOUT_REDIRECT_URI = encodeURIComponent('http://localhost:5173')

export function redirectToKeycloak(): void {
  location.href =
    `${KEYCLOAK_URL}/` +
    `realms/${KEYCLOAK_REALM}/` +
    `protocol/openid-connect/auth?` +
    `client_id=${KEYCLOAK_CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `scope=openid profile email`;
}

export function logout(): void {
  const idToken = localStorage.getItem(LOCAL_STORAGE_KEY_USER_INFO);
  localStorage.clear();
  location.href =
    `${KEYCLOAK_URL}/` +
    `realms/${KEYCLOAK_REALM}/` +
    `protocol/openid-connect/logout?` +
    `client_id=${KEYCLOAK_CLIENT_ID}&` +
    `id_token_hint=${idToken}&` +
    `post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`;
}
