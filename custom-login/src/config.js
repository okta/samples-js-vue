const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK, USE_INTERACTION_CODE } = process.env

let USE_INTERACTION_CODE_FLOW = false;
if (USE_INTERACTION_CODE === 'true') {
  USE_INTERACTION_CODE_FLOW = true;
}

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: 'http://localhost:8080/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    useInteractionCodeFlow: USE_INTERACTION_CODE_FLOW,
    testing: {
      disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages'
  }
}
