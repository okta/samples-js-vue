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
  <div id="app">
    <div class="ui inverted top fixed menu">
      <div class="ui container">
        <router-link
          to="/"
          class="header item"
        >
          <img
            class="ui mini image"
            src="./assets/logo.png"
          >
          &nbsp;
          Okta-Vue Sample Project
        </router-link>
        <a
          class="item"
          v-if="authState && !authState.isAuthenticated"
          v-on:click="login()"
        >
        Login
        </a>
        <router-link
          to="/messages"
          class="item"
          id="messages-button"
          v-if="authState && authState.isAuthenticated"
        >
          <i
            aria-hidden="true"
            class="mail outline icon">
          </i>
          Messages
        </router-link>
        <router-link
          to="/profile"
          class="item"
          id="profile-button"
          v-if="authState && authState.isAuthenticated"
        >
        Profile
        </router-link>
        <a
          id="logout-button"
          class="item"
          v-if="authState && authState.isAuthenticated"
          v-on:click="logout()"
        >
        Logout
        </a>
      </div>
    </div>
    <div
      class="ui text container"
      style="margin-top: 7em;"
    >
      <router-view/>
    </div>
    <AuthRequiredModal ref="authRequiredModal" />
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@okta/okta-vue';
import AuthRequiredModal from './components/AuthRequiredModal.vue';
export default {
  name: 'app',
  components: {
    AuthRequiredModal,
  },
  setup() {
    const oktaAuth = useAuth();
    const authState = inject('okta.authState');
    const route = useRoute();
    const router = useRouter();
    const authRequiredModal = ref(null);
    const onAuthRequired = () => {
      if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
        // App initialization stage
        oktaAuth.signInWithRedirect();
      } else {
        // Ask the user to trigger the login process during token autoRenew process
        authRequiredModal.value.showModal(oktaAuth);
      }
    };
    const login = () => {
      oktaAuth.signInWithRedirect({ originalUri: '/' })
    };
    const logout = async () => {
      const publicPath = router.currentRoute.value.href.replace(new RegExp(route.fullPath + '$'), '');
      await oktaAuth.signOut({ postLogoutRedirectUri: `${window.location.origin}${publicPath}` })
    };

    return {
      login,
      logout,
      onAuthRequired,
      authRequiredModal,
      //authState, // enable for okta-vue 5.7+
    };
  }
}
</script>
