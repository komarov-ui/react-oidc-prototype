const KEYCLOAK_URL = 'http://localhost:7777';
const KEYCLOAK_REALM = 'apihub';
const KEYCLOAK_CLIENT_ID = 'apihub-oidc-client';
const REDIRECT_URI = encodeURIComponent('http://localhost:5173/login');

export function redirectToKeycloak() {
  window.location.href =
    `${KEYCLOAK_URL}/` +
    `realms/${KEYCLOAK_REALM}/` +
    `protocol/openid-connect/auth?` +
    `client_id=${KEYCLOAK_CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `scope=openid profile email`;
}
