import { KeycloakConfig } from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'https://miro.5x5code.com:8445/auth',
  realm: 'miro',
  clientId: 'angular',
};

export const environment = {
  production: true,
  keycloakConfig
};
