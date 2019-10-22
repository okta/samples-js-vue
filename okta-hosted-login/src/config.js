const { CLIENT_ID, ISSUER, PORT } = process.env

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:' + PORT + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: false
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages'
  }
}
