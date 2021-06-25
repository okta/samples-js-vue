/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

<template>
  <div class="login">
    <div id="okta-signin-container"></div>
  </div>
</template>

<script>
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'

import sampleConfig from '../config'

export default {
  name: 'Login',
  mounted: function () {
    this.$nextTick(function () {
      const { issuer, clientId, redirectUri, scopes, useInteractionCodeFlow } = sampleConfig.oidc
      this.widget = new OktaSignIn({
        /**
         * Note: when using the Sign-In Widget for an OIDC flow, it still
         * needs to be configured with the base URL for your Okta Org. Here
         * we derive it from the given issuer for convenience.
         */
        baseUrl: issuer.split('/oauth2')[0],
        clientId,
        redirectUri,
        // eslint-disable-next-line no-undef
        logo: require('@/assets/logo.png'),
        i18n: {
          en: {
            'primaryauth.title': 'Sign in to Vue & Company'
          }
        },
        authParams: {
          issuer,
          scopes,
        },
        useInteractionCodeFlow
      })

      const originalUri = this.$auth.getOriginalUri();
      if (!originalUri) {
        this.$auth.setOriginalUri('/');
      }
      
      this.widget.showSignInToGetTokens({
        el: '#okta-signin-container',
        scopes
      }).then(tokens => {
        this.$auth.handleLoginRedirect(tokens)
      }).catch(err => {
        throw err
      })

    })
  },
  unmounted () {
    // Remove the widget from the DOM on path change
    this.widget.remove()
  }
}
</script>
