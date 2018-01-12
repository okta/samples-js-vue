<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import * as OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import '@okta/okta-signin-widget/dist/css/okta-theme.css'

import sampleConfig from '../.samples.config'

export default {
  name: 'Login',
  mounted: function () {
    this.widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: sampleConfig.oidc.issuer.split('/oauth2')[0],
      clientId: sampleConfig.oidc.client_id,
      redirectUri: sampleConfig.oidc.redirect_uri,
      logo: require('@/assets/logo.png'),
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Vue & Company'
        }
      },
      authParams: {
        responseType: ['id_token', 'token'],
        issuer: sampleConfig.oidc.issuer,
        display: 'page',
        scopes: sampleConfig.oidc.scope.split(' ')
      }
    })

    this.widget.renderEl(
      { el: '#okta-signin-container' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err
      }
    )
  }
}
</script>
