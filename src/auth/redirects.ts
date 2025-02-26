import { LOCAL_STORAGE_KEY_USER_INFO } from "../consts/auth";

const KEYCLOAK_URL = 'https://localhost:8443';
const KEYCLOAK_REALM = 'oidc-app';
const KEYCLOAK_CLIENT_ID = 'test-oidc-client';
const REDIRECT_URI = encodeURIComponent('https://localhost:5173/login');
const POST_LOGOUT_REDIRECT_URI = encodeURIComponent('https://localhost:5173')

export function keycloakAuth(): void {
  location.href =
    `${KEYCLOAK_URL}/` +
    `realms/${KEYCLOAK_REALM}/` +
    `protocol/openid-connect/auth?` +
    `client_id=${KEYCLOAK_CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `scope=openid profile email`;
}

export function keycloakLogout(): void {
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
