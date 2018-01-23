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
        <router-link
          to="/login"
          class="item"
          v-if="!authenticated"
        >
        Login
        </router-link>
        <router-link
          to="/messages"
          class="item"
          id="messages-button"
          v-if="authenticated"
        >
          <i
            aria-hidden="true"
            class="mail outline icon"
          >
          </i>
          Messages
        </router-link>
        <router-link
          to="/profile"
          class="item"
          id="profile-button"
          v-if="authenticated"
        >
        Profile
        </router-link>
        <a
          id="logout-button"
          class="item"
          v-if="authenticated"
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return { authenticated: false }
  },
  created () { this.isAuthenticated() },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()
      // Navigate back to home
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
