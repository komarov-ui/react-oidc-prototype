import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:7777',
  realm: 'apihub',
  clientId: 'apihub-oidc-client',
}

const keycloak = new Keycloak(keycloakConfig);

keycloak.init({ 
  onLoad: 'login-required',
  redirectUri: 'http://localhost:5173'
 });

export default keycloak;
