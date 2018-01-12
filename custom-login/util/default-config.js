export default {
  oidc: {
    client_id: '{clientId}',
    issuer: 'https://{yourOktaDomain}.com/oauth2/default',
    redirect_uri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email'
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages'
  }
}
