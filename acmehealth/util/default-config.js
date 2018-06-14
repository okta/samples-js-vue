export default {
  oidc: {
    clientId: '{clientId}',
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    redirectUri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email'
  },
  resourceServer: {
    requestsUrl: 'http://localhost:8000/api/requests',
    scheduleUrl: 'http://localhost:8000/api/schedule'
  }
}
