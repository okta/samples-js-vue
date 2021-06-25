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
  <div id="home">
    <h1 class="ui header">Custom Login Page with Sign In Widget</h1>
    <div v-if="!authState || !authState.isAuthenticated">
      <p>If you‘re viewing this page then you have successfully started this Vue application.</p>
      <p>This example shows you how to use the
        <a href="https://github.com/okta/okta-oidc-js/tree/master/packages/okta-vue">Okta Vue Library</a>
        and the
        <a href="https://github.com/okta/okta-signin-widget">Okta Sign-In Widget</a>
        to add the
        <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
        to your application.
        This combination is useful when you want to leverage the features of the Sign-In Widget, and the authentication helper components from the okta-vue module.
      </p>
      <p>
        Once you have logged in you will be redirected through your authorization server (the issuer defined in config) to create a session for Single-Sign-On (SSO).
        After this you will be redirected back to the application with an ID token and access token. The tokens will be stored in local storage for future use.
      </p>
      <router-link
        id="login-button"
        class="ui primary button"
        role="button"
        to="/login"
      >
      Login
      </router-link>
    </div>

    <div v-if="authState && authState.isAuthenticated">
      <p>Welcome back, {{claims.name}}!</p>
      <p>
        You have successfully authenticated against your Okta org, and have been redirected back to this application.  You now have an ID token and access token in local storage.
        Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
      </p>
      <h3>Next Steps</h3>
      <p>
        Currently this application is a stand-alone front end application.
        At this point you can use the access token to authenticate yourself against resource servers that you control.
      </p>
      <p>
        This sample is designed to work with one of our resource server examples.
        To see access token authentication in action, please download one of these resource server examples:
      </p>
      <ul>
        <li
          v-for="(example, index) in resourceServerExamples"
          :key="index"
        >
          <a :href="example.url">{{example.label}}</a>
        </li>
      </ul>
      <p>Once you have downloaded and started the example resource server, you can visit the <a href="/messages">My Messages</a> page to see the authentication process in action.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      claims: '',
      resourceServerExamples: [
        {
          label: 'Node/Express Resource Server Example',
          url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server'
        },
        {
          label: 'Java/Spring MVC Resource Server Example',
          url: 'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server'
        }
      ]
    }
  },
  mounted () { this.setup() },
  methods: {
    async setup () {
      if (this.authState && this.authState.isAuthenticated) {
        this.claims = await this.$auth.getUser()
      }
    }
  }
}
</script>
