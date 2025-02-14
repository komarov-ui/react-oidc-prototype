import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:7777',
  realm: 'apihub',
  clientId: 'apihub-oidc-client',
  redirectUri: 'http://localhost:5173',
}

const keycloak = new Keycloak(keycloakConfig);

keycloak.init({ onLoad: 'login-required' });

export default keycloak;
