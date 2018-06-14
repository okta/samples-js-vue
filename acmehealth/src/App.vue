<template>
  <div id="app">
    <div class="AppHeader">
      <div class="Wrap">
        <h1 class="AppLogo">
          <a href="./">AcmeHealth</a>
        </h1>
        <nav class="AppHeader-nav" v-if="this.authenticated">
          <ul>
            <li>
              <router-link
                to="/schedule"
                class="item"
                id="schedule"
              >
              Schedule
              </router-link>
            </li>
            <li>
              <router-link
                to="/requests"
                class="item"
                id="schedule"
              >
              Requests
              <span>2</span>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="UserMenu" v-if="this.authenticated && user">
          <div class="UserMenu-avatar">
            <img src="../static/images/grumpycat.png">
          </div>
          {{user}}
          <router-link
            to="/login"
            id="logout-button"
            class="UserMenu-name"
            v-on:click.native="logout()"
          >
          </router-link>
          <i
            aria-hidden="true"
            class="UserMenu-toggle"
          >
          </i>
        </div>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { decode } from './util'

export default {
  name: 'app',
  data: function () {
    return {
      authenticated: false,
      user: {}
    }
  },
  created () {
    this.isAuthenticated()
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
      if (this.authenticated) {
        const accessToken = await this.$auth.getAccessToken()
        const decoded = decode(accessToken)
        this.user = decoded.sub
      }
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()
    }
  }
}
</script>
